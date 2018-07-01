FROM node:6

# copy source code
WORKDIR /usr/src/app
COPY . .

# install component 
WORKDIR /usr/src/app/web-server
RUN npm install -g component
RUN sh bin/component.sh

# install server denpendecies
WORKDIR /usr/src/app
RUN npm install pomelo@2.2.5 -g
RUN sh npm-install.sh

# install pidstat
RUN apt-get update
RUN apt-get install sysstat -y

EXPOSE 3001 3014 3010 3011

CMD [ "npm", "start" ]