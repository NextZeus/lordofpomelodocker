/**
 * created by nextzeus at 2018/06/14
 * user module
 */
let path = require('path')
let userDao = require('../lib/dao/userDao');
var Token = require(path.join(__dirname, '../../shared/token'));
var secret = require(path.join(__dirname, '../../shared/config/session')).secret;

function User(){}

/**
 * user login 
 * @param {*} req {username, password}
 * @param {*} res 
 */
User.prototype.login = function(req, res){
  var msg = req.body;
  var username = msg.username;
  var pwd = msg.password;

  if (!username || !pwd) {
    res.send({code: 500});
    return;
  }

  userDao.getUserByName(username, function(err, user) {
    if (err || !user) {
      console.log('username not exist!');
      res.send({code: 500});
      return;
    }
    if (pwd !== user.password) {
      // TODO code
      // password is wrong
      console.log('password incorrect!');
      res.send({code: 501});
      return;
    }

    console.log(username + ' login!');
    res.send({code: 200, token: Token.create(user.id, Date.now(), secret), uid: user.id});
  });
}

User.prototype.register = function(req, res) {
    var msg = req.body;
    if (!msg.name || !msg.password) {
      res.send({code: 500});
      return;
    }
    userDao.createUser(msg.name, msg.password, '', function(err, user) {
      if (err || !user) {
        console.error(err);
        if (err && err.code === 1062) {
          res.send({code: 501});
        } else {
          res.send({code: 500});
        }
      } else {
        console.log('A new user was created! --' + msg.name);
        res.send({code: 200, token: Token.create(user.id, Date.now(), secret), uid: user.id});
      }
    });
  }

module.exports = new User();