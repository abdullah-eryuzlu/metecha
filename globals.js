module.exports = {
  port:  3050,

  statusCode: {
    badRequest: 400,
    unauthorized: 401,
    internal: 500
  },

  userType: {
    admin: 0,
    doctor: 1,
    nurse: 2,
    patient: 3,
    relative: 4
  },

  maxPwTry: 15,
  saltLength: 10,
  passwordLength: 12,
  sessionTime: 2 * 24 * 60 * 60,
  pwReqExpiration: 60 * 60 * 1000,

  loginReasons: {
    blocked: 1,
    notActive: 2,
    wrongPassword: 3
  },

  error: {
    unexpected: "Unexpected error occured. Please try again another time.",
    emailInUse: "This email address is in use. Please type a different email address.",
    userNotFound: "The user, which you want to process is not found.",
    authLevel: "You are not authorized to do the task or see the data.",
    accountBlocked: "Your account has been blocked because you have entered too many wrong passwords. Please check you email to unblock your account.",
    accountNotActive: "Your account is not active yet. Please check your email to activate your account.",
    wrongUserPass: "Wrong username of password.",
    relationExists: "Relation already exists.",
    passwordMismatch: "Passwords you have entered does not match.",
    sessionExpired: "Your session is expired. Please re-login.",
    noSession: "You are not logged in. Please log in first.",
    pwRequestNotFound: "Password change request could not found. Please try again.",
    pwReqExpired: "Your password request is expired. Please repeat the process.",
    badInput: "Missing body parameter."
  },

  secret: "xjdg<KVM/]3wms_e>BFrgCC<bYE!!9",

  mailTemplates: {
    confirmation: 'Greetings from Metecha {{username}}. Please click the link to activate your account: https://metecha.tk/public/activate_account/{{activationHash}}',
    forgotPassword: 'Hello {{username}}. Please click the link to change your password: https://metecha.tk/forgot_password/{{pwReqHash}}',
    unblock: 'Hello {{username}}. Your account is blocked. To unlock it, please click the link: https://metecha.tk/public/unblock_account/{{unblockHash}}'
  }

}
