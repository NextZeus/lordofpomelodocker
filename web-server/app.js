var express = require('express');
var Token = require('../shared/token');
var secret = require('../shared/config/session').secret;
var app = express.createServer();
var mysql = require('./lib/dao/mysql/mysql');
var everyauth = require('./lib/oauth');
let userC = require('./controller/user');

var publicPath = __dirname +  '/public';

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyboard cat" }));
  app.use(everyauth.middleware());
  app.use(app.router);
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  app.set('view options', {layout: false});
  app.set('basepath', publicPath);
});

app.configure('development', function(){
  app.use(express.static(publicPath));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  var oneYear = 31557600000;
  app.use(express.static(publicPath, { maxAge: oneYear }));
  app.use(express.errorHandler());
});

app.get('/auth_success', function(req, res) {
  if (req.session.userId) {
    var token = Token.create(req.session.userId, Date.now(), secret);
    res.render('auth', {code: 200, token: token, uid: req.session.userId});
  } else {
    res.render('auth', {code: 500});
  }
});

app.post('/login', userC.login);

app.post('/register', userC.register);

//Init mysql
mysql.init(app);

if(!process.env.PORT){
  process.env.PORT = 3001;
}

app.listen(process.env.PORT);

// Uncaught exception handler
process.on('uncaughtException', function(err) {
	console.error(' Caught exception: ' + err.stack);
});

console.log("Web server has started.\n Please log on http://127.0.0.1:/"+process.env.PORT);
