const helper = require('../helper');
const globals = require('../globals');
const User = require('../models/user');
const Relation = require('../models/relation');
const Record = require('../models/record');

// Helper functions
function checkIfNurse(userType) {
  return (userType == globals.userType.nurse);
}

function checkIfDoctor(userType) {
  return (userType == globals.userType.doctor);
}

function checkIfPatient(userType) {
  return (userType == globals.userType.patient);
}

function checkIfRelative(userType) {
  return (userType == globals.userType.relative);
}

const Middlewares = {

  fetchOtherUser(req, res, next) {
    let userId = req.params.userId || req.body.userId;
    User.findOne({ _id: userId, isActive: true })
      .then((user) => {
        if (!user) {
          return helper.authError(res);
        }
        req.otherUser = user;
        return next();
      })
      .catch((err) => {
        console.log(err.message);
        return helper.internalError(res);
      })
  },

  addUser(req, res, next) {
    let userType = req.decoded.userType;
    let otherType = req.body.userType;

    if (checkIfDoctor(userType) && checkIfPatient(otherType)) {
      return next();
    }

    if (checkIfPatient(userType) && checkIfRelative(otherType)) {
      return next();
    }

    return helper.authError(res);
  },

  getUsers(req, res, next) {
    let userType = req.decoded.userType;
    let otherType = req.params.userType;

    if (checkIfDoctor(userType)) {
      if (checkIfRelative(otherType)) {
        return helper.authError(res);
      }
      return next();
    }

    if (checkIfPatient(userType)) {
      if (checkIfNurse(otherType) || checkIfPatient(otherType)) {
        return helper.authError(res);
      }
      return next();
    }

    return helper.authError(res);
  },

  deleteUser(req, res, next) {
    let userType = req.decoded.userType;
    let otherType = req.otherUser.userType;

    if (checkIfDoctor(userType) && !checkIfPatient(otherType)) {
      return helper.authError(res, globals.error.unexpected);
    }

    if (checkIfPatient(userType) && !checkIfRelative(otherType)) {
      return helper.authError(res, globals.error.unexpected);
    }

    return next();
  },

  addRelation(req, res, next) {
    let userType = req.decoded.userType;
    let otherType = req.otherUser.userType;

    if (checkIfPatient(userType)
    && (checkIfRelative(otherType) || checkIfDoctor(otherType))) {
      return next();
    }

    console.log("[-] Add relation type authorization error!");
    return helper.authError(res);
  },

  addRelationForOthers(req, res, next) {
    if (!checkIfPatient(req.otherUser.userType)) {
      return helper.authError(res, globals.error.authLevel);
    }

    Relation.findOne({
      higherPrioUser: req.decoded.userId,
      lowerPrioUser: req.body.userId
    })
    .then((relation) => {
      if (!relation) {
        return helper.authError(res, globals.error.authLevel);
      }
      User.findOne({ _id: req.body.fromId, userType: globals.userType.nurse})
        .then((user) => {
          if (!user) {
            return helper.authError(res);
          }
          req.body.fromUserType = user.userType;
          return next();
        })
        .catch((err) => {
          console.log(err.message);
          return helper.internalError(res);
        })
    })
    .catch((err) => {
      console.log(err.message);
      return helper.internalError(res);
    })
  },

  getRelations(req, res, next) {
    let userType = req.decoded.userType;
    let otherType = req.params.userType;

    if (checkIfDoctor(userType) && checkIfPatient(otherType)) {
      return next();
    }

    if (checkIfNurse(userType) && checkIfPatient(otherType)) {
      return next();
    }

    if (checkIfPatient(userType) && checkIfDoctor(otherType)) {
      return next();
    }

    if (checkIfPatient(userType) && checkIfRelative(otherType)) {
      return next();
    }
    return helper.authError(res);
  },

  getRelationsOther(req, res, next) {
    let userType = req.decoded.userType;
    let otherType = req.otherUser.userType;

    if (checkIfDoctor(userType) && checkIfPatient(otherType)) {
      return next();
    }

    return helper.authError(res);
  },

  deleteRelation(req, res, next) {
    let userType = req.decoded.userType;
    let otherType = req.otherUser.userType;

    if (checkIfPatient(userType) && checkIfDoctor(otherType)) {
      return next();
    }

    if (checkIfPatient(userType) && checkIfRelative(otherType)) {
      return next();
    }

    return helper.authError(res);
  },

  deleteRelationOther(req, res, next) {
    let userType = req.otherUser.userType;

    if (!checkIfDoctor(req.decoded.userType) || !checkIfPatient(userType)) {
      return helper.authError(res);
    }

    User.findOne({ _id: req.params.fromId, userType: globals.userType.nurse })
      .then((user) => {
        if (!user) {
          console.log('User not found');
          return helper.authError(res);
        }
        if (!checkIfNurse(user.userType)) {
          console.log('Not nurse');
          return helper.authError(res);
        }
        req.params.fromType = user.userType;
        return next();
      })
      .catch((err) => {
        console.log(err.message);
        return helper.internalError(res);
      })
  },

  addRecord(req, res, next) {
    let userType = req.decoded.userType;
    let otherType = req.otherUser.userType;

    if (checkIfDoctor(userType) || checkIfNurse(userType)) {
      if (checkIfPatient(otherType)) {
        Relation.findOne({ higherPrioUser: req.decoded.userId, lowerPrioUser: req.otherUser._id})
          .then((rel) => {
            if (!rel) {
              return helper.authError(res);
            }
            return next();
          })
          .catch((err) => {
            console.log(err.message);
            return helper.internalError(res);
          })
      }
    }

    else {
      return helper.authError(res);
    }
  },

  getRecords(req, res, next) {
    let userType = req.decoded.userType;
    let otherType = req.otherUser.userType;

    if (checkIfPatient(otherType) && (req.decoded.userId == req.params.userId)) {
      return next();
    }

    if (!checkIfPatient(otherType)) {
      return helper.authError(res);
    }

    if (!checkIfDoctor(userType) && !checkIfNurse(otherType)) {
      return helper.authError(res);
    }

    Relation.findOne({ higherPrioUser: req.decoded.userId, lowerPrioUser: req.otherUser._id})
      .then((rel) => {
        console.log(rel);
        if (!rel) {
          return helper.authError(res);
        }
        return next();
      })
      .catch((err) => {
        console.log(err.message);
        return helper.internalError(res);
      })

  },

  changePassword(req, res, next) {
    if (!req.body.oldPassword || !req.body.newPassword) {
      return helper.authError(res);
    }
    return next();
  },

  sendRecord(req, res, next) {
    if (!checkIfDoctor(req.otherUser.userType)) {
      return helper.authError(res);
    }

    Record.findOne({ _id: req.params.recordId })
      .then((record) => {
        if (!record) {
          return helper.authError(res);
        }

        Relation.findOne({
          higherUserType: globals.userType.doctor,
          higherPrioUser: req.decoded.userId,
          lowerPrioUser: record.patientId
        })
        .then((relation) => {
          if (!relation) {
            return helper.authError(res);
          }
          return next();
        })
        .catch((err) => {
          console.log(err.message);
          return helper.internalError(res);
        })
      })
      .catch((err) => {
        console.log(err.message);
        return helper.internalError(res);
      })
  },

  getNotifications(req, res, next) {
    if (checkIfDoctor(req.decoded.userType)) {
      return next();
    }
    return helper.authError(res);
  },

}

module.exports = Middlewares;
