/** Google Cloud API credentials that allows the application to
  * make calls to a Google API.
  * See {@link https://console.developers.google.com}
  * and replace each value with your own.
  */
  var authConfigs = {
    googleAuth: {
      clientId: process.env.AUTH_CLIENTID,
      clientSecret: process.env.AUTH_CLIENTSECRET,
      callbackUrl: process.env.AUTH_CALLBACKURL,
    },

    sessionVars: {
      secret: process.env.SESSION_SECRET,
    },

    admins: [

    ],

    gmail: {
      username: process.env.GMAIL_USERNAME,
      password: process.env.GMAIL_PASSWORD
    },

    emailSig: process.env.EMAIL_SIG
  };

module.exports = authConfigs;
