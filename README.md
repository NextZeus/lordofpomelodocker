# lordofpomelo docker-compose

# Dependenies
- node@6.x
- pomelo@2.2.5
- mysql/mysql-server:5.7.22
- docker-compose
- pidstat


## depends_on VS links

links db, maybe not wait for db start finish
depends_on wait for db wait for connection 


## install pidstat

console - the command pidstat failed!  Error: Command failed: pidstat -p 11
/bin/sh: 1: pidstat: not found

Unable to locate package sysstat

 - apt-get update
 - apt-get install sysstat -y