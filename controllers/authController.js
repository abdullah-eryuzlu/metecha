const User = require('../models/user');
const globals = require('../globals');
const helper = require('../helper');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const UserActivation = require('../models/userActivation');
const LoginLog = require('../models/loginLog');
const Relation = require('../models/relation');
const PwChangeRequest = require('../models/passwordChangeRequest');
const UnblockRequest = require('../models/unblockRequest');

// TODO: Do not forget to test token expiration

function create_user(user, unameId) {
  let new_user = new User();

  new_user.name = user.name;
  new_user.surname = user.surname;
  new_user.username = user.name[0] + user.surname + unameId;
  new_user.userType = user.userType;
  new_user.email = user.email;

  // Generate salt and hash the password with the salt
  let salt = helper.generateString(globals.saltLength);
  new_user.password = crypto.createHash('sha256').update(user.password + salt).digest('hex');

  new_user.salt = salt;

  return new_user;
}

const AuthController = {

  unblockAccount(req, res) {
    UnblockRequest.findOne({
      _id: req.params.unblockHash,
      isActive: true
    })
    .then((unblock) => {
      if (!unblock) {
        return res.redirect('https://metecha.tk/unblock_failed');
      }

      User.findOne({ _id: unblock.user_id, isActive: true })
      .then((user) => {
        if (!user) {
          return res.redirect('https://metecha.tk/unblock_failed');
        }

        user.isBlocked = false;
        user.pwTry = 0;
        unblock.isActive = false;
        unblock.save();
        user.save();
        return res.redirect('https://metecha.tk/login');
      })
      .catch((err) => {
        console.log(err.message);
        return res.redirect('https://metecha.tk/unblock_failed');
      })
    })
    .catch((err) => {
      console.log(err.message);
      return res.redirect('https://metecha.tk/unblock_failed');
    })
  },

  changePasswordRequest(req, res) {
    User.findOne({ email: req.params.email, isActive: true })
    .then((user) => {
      if (!user) {
        return helper.authError(res, globals.error.userNotFound);
      }
      let request = PwChangeRequest();
      request.user_id = user._id;

      request.save()
      .then((saved_req) => {
        helper.sendForgotPassword(user.username, user.email, request._id);
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

  changePasswordPublic(req, res) {

    PwChangeRequest.findOne({ _id: req.params.pwReqHash, isActive: true })
    .then((pw_req) => {
      if (!pw_req) {
        return helper.authError(res, globals.error.pwRequestNotFound);
      }

      if (Date.now() - pw_req.createdDate > globals.pwReqExpiration) {
        return helper.authError(res, globals.error.pwReqExpired);
      }

      if (!req.body.newPassword) {
        return helper.authError(res, globals.error.badInput);
      }

      User.findOne({ _id: pw_req.user_id, isActive: true })
        .then((user) => {
          if (!user) {
            return helper.internalError(res, globals.error.unexpected);
          }

          let newSalt = helper.generateString(globals.saltLength);
          console.log(req.body.newPassword);
          let newPassword = crypto.createHash('sha256').update(req.body.newPassword + newSalt).digest('hex');
          user.password = newPassword;
          user.salt = newSalt;

          user.save()
            .then(() => {
              pw_req.isActive = false;
              pw_req.changedDate = Date.now();
              pw_req.save()
                .then(() => {
                  return res.clearCookie('pw_req_id').send({ status: 1 })
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

  activateAccount(req, res) {
    UserActivation.findOne({
      activationHash: req.params.activationHash
    })
    .then((act) => {
      if (!act) {
        return res.redirect('https://metecha.tk/activation_failed');
      }
      act.remove();

      User.findOne({ _id: act.userId, isActive: true })
        .then((user) => {
          if (!user) {
            console.log('no user');
            return res.redirect('https://metecha.tk/activation_failed');
          }
          user.isAccountActive = true;
          user.save()
            .then(() => {
              return res.redirect('https://metecha.tk/login');
            })
            .catch(() => {
              return res.redirect('https://metecha.tk/activation_failed');
            })
        })
        .catch(() => {
          return res.redirect('https://metecha.tk/activation_failed');
        })
    })
    .catch((err) => {
      return res.redirect('https://metecha.tk/activation_failed');
    })
  },

  changePassword(req, res) {
    User.findOne({ _id: req.decoded.userId, isActive: true })
      .then((user) => {
        if (!user) {
          return helper.internalError(res, globals.error.unexpected);
        }
        let oldPassword = crypto.createHash('sha256').update(req.body.oldPassword + user.salt).digest('hex');

        if (oldPassword != user.password) {
          return helper.authError(res, globals.error.passwordMismatch);
        }

        let newSalt = helper.generateString(globals.saltLength);
        let newPassword = crypto.createHash('sha256').update(req.body.newPassword + newSalt).digest('hex');
        user.password = newPassword;
        user.salt = newSalt;

        user.save()
          .then(() => {
            return res.send({ status: 1 })
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

  developmentAdd(req, res) {
    User.find({
      username: { $regex: req.body.name[0] + req.body.surname }
    })
    .then((users) => {
      let idNum = 0;

      if (users.length !== 0) {
        // Prevent the duplicate usernames
        for (let user of users) {
          let temp = parseInt(user.username.substring(user.surname.length + 1), 10);
          if (temp > idNum) {
            idNum = temp;
          }
        }
      }

      let user = create_user(req.body, idNum + 1);
      user.createdBy = "asd";

      user.save();
    })
    .catch((err) => {
      console.log(err.message);
      return helper.internalError(res, globals.error.unexpected);
    })
  },

  addUser(req, res) {
    User.find({
      username: { $regex: req.body.name[0] + req.body.surname }
    })
    .then((users) => {
      let idNum = 0;

      if (users.length !== 0) {
        // Prevent the duplicate usernames
        for (let user of users) {
          let temp = parseInt(user.username.substring(user.surname.length + 1), 10);
          if (temp > idNum) {
            idNum = temp;
          }
        }
      }

      let user = create_user(req.body, idNum + 1);
      user.createdBy = req.decoded.userId;

      user.save()
        .then((user) => {
          // TODO: can be status: 1

          if (user.userType == globals.userType.relative) {
            let relation = Relation({
              higherPrioUser: req.decoded.userId,
              lowerPrioUser: user._id,
              higherUserType: globals.userType.patient,
              lowerUserType: globals.userType.relative
            })

            relation.save();
          }

          let userActivation = UserActivation();
          userActivation.userId = user._id;

          let activationHash = crypto.createHash('sha256').update(user.email + Date.now() + user.password).digest('hex');
          userActivation.activationHash = activationHash;

          userActivation.save()
            .then(() => {
              helper.sendActivationMail(user.username, user.email, userActivation.activationHash);
              return res.json({
                'username': user.username
              });
            })
            .catch((err) => {
              console.log(err.message);
              return helper.internalError(res, globals.error.unexpected);
            })
        })
        .catch((err) => {
          console.log(err.message);
          return helper.authError(res, globals.error.emailInUse);
        })

      })
      .catch((err) => {
        console.log(err.message);
        return helper.internalError(res, globals.error.unexpected);
      })
  },

  login(req, res) {
    User.findOne({
      username: req.body.username,
      isActive: true
    })
      .then((user) => {
        if (!user) {
          return helper.authError(res, globals.error.wrongUserPass);
        }

        let loginLog = LoginLog();
        loginLog.userId = user._id;
        loginLog.ip_addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        if (user.isBlocked == true) {
          console.log('Blocked user!');
          loginLog.isSuccess = false;
          loginLog.reason = globals.loginReasons.blocked;
          loginLog.save();
          return helper.authError(res, globals.error.accountBlocked);
        }

        if (user.isAccountActive == false) {
          console.log('Account not active');
          loginLog.isSuccess = false;
          loginLog.reason = globals.loginReasons.notActive;
          loginLog.save();
          return helper.authError(res, globals.error.accountNotActive);
        }

        let password = crypto.createHash('sha256').update(req.body.password + user.salt).digest('hex');

        if (password == user.password) {
          const token = jwt.sign({
            userId: user._id,
            userType: user.userType
          }, globals.secret, {
            expiresIn: 86400
          })
          user.pwTry = 0;
          user.save();

          loginLog.isSuccess = true;
          loginLog.save();
          return res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 })
            .send({ 'status': 1 });
        }

        else {
          loginLog.isSuccess = false;
          loginLog.reason = globals.loginReasons.wrongPassword;
          user.pwTry = user.pwTry + 1;

          if (user.pwTry >= globals.maxPwTry) {
            let unblock = UnblockRequest();
            console.log('notifying blocked user');

            helper.notifyBlockedUser(user.username, user.email, unblock._id);

            user.isBlocked = true;
            unblock.user_id = user._id;
            unblock.save();
            loginLog.save();
            user.save();
            return helper.authError(res, globals.error.wrongUserPass);
          }
          else {
            loginLog.save();
            user.save();
            return helper.authError(res, globals.error.wrongUserPass);
          }
        }
      })
  },

  logout(req, res) {
    return res.clearCookie('token')
      .send({ 'status': 1 });
  },

  check_session(req, res) {
    User.findOne({ _id: req.decoded.userId })
      .then((user) => {
        if (!user) {
          return helper.internalError(res, globals.error.unexpected);
        }
        return res.send(user);
      })
      .catch((err) => {
        console.log(err.message);
        return helper.internalError(res, globals.error.unexpected);
      })
  }
}

module.exports = AuthController;
