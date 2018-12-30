const User = require('../models/user');
const Relation = require('../models/relation');
const globals = require('../globals');
const helper = require('../helper');
const crypto = require('crypto');
const Record = require('../models/record');
const Notification = require('../models/notification');
const LoginLog = require('../models/loginLog');

const privateAttributes = [
  '-password',
  '-salt',
  '-__v',
  '-pwTry',
  '-isActive',
  '-updatedDate'
]

const HospitalController = {

  getUsers(req, res) {
    User.find({ userType: req.params.userType, isActive: true }, privateAttributes)
      .then((users) => {
        return res.send(users);
      })
      .catch((err) => {
        console.log(err.message);
        return helper.internalError(res);
      })
  },
  // relationlari da silinecek
  deleteUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        user.isActive = false;
        user.removedDate = Date.now();
        user.save()
          .then(() => {
            if (user.userType == globals.userType.patient) {
              Relation.find({
                higherPrioUser: user._id,
                lowerPrioType: globals.userType.relative
              })
              .then((relations) => {
                for (let relation of relations) {
                  User.remove({ _id: relation.lowerPrioUser });
                }
                Relation.remove({ higherPrioUser: user._id });
                Relation.remove({ lowerPrioUser: user._id });
                return res.send({ 'status': 1 });
              })
              .catch((err) => {
                return helper.internalError(res, globals.error.unexpected);
              });
            }
            else {
              Relation.remove({ higherPrioUser: user._id });
              Relation.remove({ lowerPrioUser: user._id });
              return res.send({ 'status': 1 });
            }
          })
          .catch((err) => {
            return helper.internalError(res);
          })
      })
      .catch((err) => {
        console.log(err.message);
        return helper.internalError(res);
      })
  },

  addRelation(req, res) {
    let query = {};

    if (req.decoded.userType < req.otherUser.userType) {
      query.higherPrioUser = req.decoded.userId;
      query.lowerPrioUser = req.otherUser._id;
      query.higherUserType = req.decoded.userType;
      query.lowerUserType = req.otherUser.userType;
    } else {
      query.higherPrioUser = req.otherUser._id;
      query.lowerPrioUser = req.decoded.userId;
      query.higherUserType = req.otherUser.userType;
      query.lowerUserType = req.decoded.userType;
    }

    Relation.findOne(query)
      .then((rel) => {
        if (rel) {
          console.log("[-] - Relation already exists");
          return helper.authError(res, globals.error.relationExists);
        }
        let relation = Relation();
        relation.higherPrioUser = query.higherPrioUser;
        relation.lowerPrioUser = query.lowerPrioUser;
        relation.lowerUserType = query.lowerUserType;
        relation.higherUserType = query.higherUserType;

        relation.save()
        .then(() => {
          return res.json({ 'status': 1 });
        })
        .catch((err) => {
          console.log(err.message);
          return helper.internalError(res, globals.error.unexpected);
        })
      })
      .catch((err) => {
        console.log(err.message);
        return helper.internalError(res, globals.error.unexpected);
      })
  },

  addRelationForOthers(req, res) {
    Relation.findOne({
      higherPrioUser: req.body.fromId,
      lowerPrioUser: req.body.userId
    })
    .then((rel) => {
      if (rel) {
        console.log("[ - ] relation already exists");
        return helper.authError(res, globals.error.relationExists);
      }
      let relation = Relation()
      relation.higherPrioUser = req.body.fromId;
      relation.lowerPrioUser = req.otherUser._id;
      relation.lowerUserType = req.otherUser.userType;
      relation.higherUserType = req.body.fromUserType;
      relation.save()
        .then(() => {
          return res.send({ 'status': 1 });
        })
        .catch((err) => {
          console.log(err.message);
          return helper.internalError(res, globals.error.unexpected);
        })
    })
    .catch((err) => {
      console.log(err.message);
      return helper.internalError(res, globals.error.unexpected);
    })
  },

  getRelations(req, res) {
    let higherBody = {
      higherPrioUser: "",
      lowerUserType: 0
    };
    let lowerBody = {
      lowerPrioUser: "",
      higherUserType: 0
    };

    let body;
    let userType = req.decoded.userType;
    let otherType = req.params.userType;

    if (userType < otherType) {
      higherBody.higherPrioUser = req.decoded.userId;
      higherBody.lowerUserType = otherType;
      body = higherBody;
    } else {
      lowerBody.lowerPrioUser = req.decoded.userId;
      lowerBody.higherUserType = otherType;
      body = lowerBody;
    }

    Relation.find(body)
      .then((relations) => {

        let promises = [];
        for (let relation of relations) {
            if (userType < otherType) {
              promises.push(User.findOne({ _id: relation.lowerPrioUser, isActive: true }, privateAttributes));
            } else {
              promises.push(User.findOne({ _id: relation.higherPrioUser, isActive: true }, privateAttributes));
            }
        }
        Promise.all(promises)
          .then((values) => {
            let returnValues = [];
            for (let value of values) {
              if (value) {
                returnValues.push(value);
              }
            }
              return res.send(returnValues)
          })
          .catch((err) => {
              return helper.internalError(res);
          })
      })
  },

  getRelationsOther(req, res) {
    let userType = globals.userType.nurse;

    Relation.find({ higherUserType: userType, lowerPrioUser: req.otherUser._id})
      .then((relations) => {

        let promises = [];
        for (let relation of relations) {
            promises.push(User.findOne({ _id: relation.higherPrioUser, isActive: true }, privateAttributes));
        }
        Promise.all(promises)
          .then((values) => {
            let returnValues = [];
            for (let value of values) {
              if (value) {
                returnValues.push(value);
              }
            }
              return res.send(returnValues)
          })
          .catch((err) => {
              return helper.internalError(res);
          })
      })
  },

  deleteRelation(req, res) {
    let userType = req.decoded.userType;
    let otherType = req.otherUser.userType;

    if (otherType == globals.userType.relative) {
      User.remove({ _id: req.otherUser._id });
    }

    let query = {}

    if (userType < otherType) {
      query.higherPrioUser = req.decoded.userId;
      query.lowerPrioUser = req.otherUser._id;
    } else {
      query.higherPrioUser = req.otherUser._id;
      query.lowerPrioUser = req.decoded.userId;
    }
    Relation.remove(query)
      .then(() => {
        return res.send({ 'status': 1 });
      })
      .catch((err) => {
        console.log(err.message);
        return helper.internalError(res);
      })
  },

  deleteRelationOther(req, res) {

    Relation.remove({
      higherPrioUser: req.params.fromId,
      lowerPrioUser: req.params.userId,
    })
    .then(() => {
      return res.send({ 'status': 1 });
    })
    .catch((err) => {
      console.log(err.message);
      return helper.internalError(res);
    })
  },

  addRecord(req, res) {
    let record = Record();

    record.patientId = req.otherUser._id;
    record.diagnostic = req.body.diagnostic;
    record.createdBy = req.decoded.userId;

    record.save()
      .then(() => {
        return res.send({ 'status': 1 });
      })
      .catch((err) => {
        console.log(err.message);
        return helper.internalError(res);
      })
  },

  sendRecord(req, res) {
    let notification = Notification();

    notification.sendBy = req.decoded.userId;
    notification.recordId = req.params.recordId;
    notification.to = req.otherUser._id;

    notification.save()
      .then(() => {
        return res.send({ 'status': 1 });
      })
      .catch((err) => {
        console.log(err.message);
        return helper.internalError(res);
      })
  },

  getNotifications(req, res) {
    Notification.find({ to: req.decoded.userId })
    .then((notifs) => {
      return res.send(notifs);
    })
    .catch((err) => {
      return helper.internalError(res);
    })
  },

  getNotification(req, res) {
    Notification.findOne({ _id: req.params.notifId })
    .then((notif) => {
      if (!notif) {
        return helper.authError(res);
      }
      Record.findOne({ _id: notif.recordId })
      .then((record) => {
        if (!record) {
          return helper.authError(res);
        }
        User.findOne({ _id: record.patientId })
        .then((patient) => {
          if (!patient) {
            return helper.authError(res);
          }
          Relation.findOne({
            higherPrioUser: req.decoded.userId,
            lowerPrioUser: patient._id
          })
          .then((relation) => {
            if (!relation) {
              return helper.authError(res);
            }
            let recordData = {
              'createdDate': record.createdDate,
              'patient': patient.name + " " + patient.surname,
              'diagnostic': record.diagnostic
            }
            let returnData = {
              'record': recordData,
              'sendBy': notif.sendBy,
              'date': notif.createdDate
            }
            return res.send(returnData);
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
  /////
  /////


  getRecords(req, res) {
    Record.find({ patientId: req.params.userId })
      .then((records) => {
        return res.send(records);
      })
      .catch((err) => {
        console.log(err.message);
        helper.internalError(res);
      })
  },
}

module.exports = HospitalController;
