FROM node:6

WORKDIR /usr/src/app

COPY . .

RUN npm install pomelo@2.2.5 -g
RUN npm install -g component
RUN npm install pm2 -g
RUN sh npm-install.sh
RUN apt-get update
RUN apt-get install sysstat -y

WORKDIR /usr/src/app/web-server
RUN pwd
RUN sh bin/component.sh

EXPOSE 3001 3014 3010 3011

CMD [ "npm", "start" ]