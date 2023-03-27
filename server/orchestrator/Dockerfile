FROM node:lts-hydrogen

ENV APP_SERVICE_URL=http://localhost:4002
ENV USER_SERVICE_URL=http://localhost:4001
ENV NODE_ENV=production
ENV JWT_SECRET=duaaaaaaaarrrrrrrrr

WORKDIR /orchestrator

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "npm", "start" ]