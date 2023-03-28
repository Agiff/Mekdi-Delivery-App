FROM node:lts-hydrogen

WORKDIR /orchestrator

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "npm", "start" ]