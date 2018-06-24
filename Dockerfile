FROM node:9

WORKDIR /usr/src/app

COPY . .

RUN npm i npm@latest -g
RUN npm install pomelo -g
RUN npm install pm2 -g
RUN sh npm-install.sh

EXPOSE 3001 3014 3010 3011

CMD [ "npm", "start" ]