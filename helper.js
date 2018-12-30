const crypto = require('crypto');
const globals = require('./globals');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  secure: false,
  auth: {
    user: 'info.metecha@gmail.com',
    pass: 'meka123.123.M'
  }
})

function generateMailTemplate(template, keywords) {

  for (let keyword of keywords) {
    console.log(keyword);
    template = template.replace(keyword.key, keyword.value);
  }
  return template;
}

const Helper = {

  notifyBlockedUser(username, email, unblockHash) {
    console.log('notifying');

    let mailOptions = {};
    mailOptions.from = 'info.metecha@gmail.com';
    mailOptions.to = email;

    let template = generateMailTemplate(globals.mailTemplates.unblock, [
      { key: "{{username}}", value: username },
      { key: "{{unblockHash}}", value: unblockHash },
    ]);

    mailOptions.html = template;
    mailOptions.subject = 'Unblock your account!';

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error.message);
      }
    });
  },

  sendForgotPassword(username, email, pwReqHash) {
    let mailOptions = {};
    mailOptions.from = 'info.metecha@gmail.com';
    mailOptions.to = email;

    let template = generateMailTemplate(globals.mailTemplates.forgotPassword, [
      { key: "{{username}}", value: username },
      { key: "{{pwReqHash}}", value: pwReqHash },
    ]);

    mailOptions.html = template;
    mailOptions.subject = 'Change password!';

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error.message);
      }
    });
  },

  sendActivationMail(username, email, activationHash) {

    let mailOptions = {};
    mailOptions.from = 'info.metecha@gmail.com';
    mailOptions.to = email;

    let template = generateMailTemplate(globals.mailTemplates.confirmation, [
      { key: "{{username}}", value: username },
      { key: "{{activationHash}}", value: activationHash }
    ]);

    mailOptions.html = template;
    mailOptions.subject = 'Activate Your Account!';

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error.message);
      }
    });
  },

  internalError(res, message) {
    return res.status(globals.statusCode.internal).json({
      'error': message
    });
  },

  authError(res, message) {
    return res.status(globals.statusCode.unauthorized).json({
      'error': message
    });
  },

  generateString(length) {
    const date = (new Date()).valueOf().toString();
    const random = Math.random().toString();
    return crypto.createHash('sha1').update(date + random).digest('hex').substring(0, length);
  }
}

module.exports = Helper;
