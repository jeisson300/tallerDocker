FROM node:18

WORKDIR  /home/app

COPY . /home/app

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]