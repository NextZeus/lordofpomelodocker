var path = require('path');
var mysqlConfig = require(path.join(__dirname,'/../../../../shared/config/mysql'));

var env = process.env.NODE_ENV || 'development';
if(mysqlConfig[env]) {
  mysqlConfig = mysqlConfig[env];
}

console.warn('web-server mysqlConfig %j', mysqlConfig);

var _poolModule = require('generic-pool');  
var mysql = require('mysql');  

/* 
 * Create mysql connection pool. 
 */  
var createMysqlPool = function (app) {  
    const factory = {  
        create: function () {
            return new Promise(function (resolve, reject) {  
                var client = mysql.createConnection({  
                    host: mysqlConfig.host,
                    user: mysqlConfig.user,  
                    password: mysqlConfig.password,  
                    database: mysqlConfig.database,  
                    port: mysqlConfig.port  
                });  
                client.on('error', function (err) {  
                    console.error('create connection error ', error);
                    client.disconnect();  
                });  
                client.connect(function (error) {  
                    if (error) {  
                        console.log('mysql connect error', error);
                    }  
                    resolve(client)  
                });  
  
            })  
        },  
        destroy: function (client) {  
            return new Promise(function (resolve) {  
                client.on('end', function () {  
                    resolve()  
                })  
                client.end()  
            });
        }  
    }  
  
    var opts = {  
        min: 2,
        max: 10,
        idleTimeoutMillis: 30000,  
        log: true  
    };
  
    return _poolModule.createPool(factory, opts);  
};  
exports.createMysqlPool = createMysqlPool;  