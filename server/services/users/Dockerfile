FROM node:lts-hydrogen

WORKDIR /users

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "npm", "start" ]