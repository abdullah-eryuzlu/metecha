const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/routes')
const globals = require('./globals');
const jwt = require('jsonwebtoken');
const helper = require('./helper');
const cookieParser = require('cookie-parser');
const https = require('https');
const fs = require('fs');
const morgan = require('morgan');
const http = require('http');

const app = express();

app.use(morgan('tiny'));


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/metecha-dev');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/metecha.tk/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/metecha.tk/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/metecha.tk/chain.pem', 'utf8');

// app.use(cors({ credentials: true, origin: 'http://localhost:4200'}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", function(req, res, next){
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, globals.secret, function(err, decoded) {
      if (err) {
        return helper.authError(res, globals.error.sessionExpired);
      }
      req.decoded = decoded;
      return next();
    });
  }
  else {
    return helper.authError(res, globals.error.noSession);
  }
});

routes(app);

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

//
const httpsServer = https.createServer(credentials, app);


http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});

module.exports = app;
