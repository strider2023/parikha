FROM node:10

WORKDIR /usr/src/app

ENV APPLICATION_KEY=N0tAn3SY0n3
ENV DB_URL=mongodb://localhost:27017/parikha
ENV ENV=production
ENV PORT=9000
ENV NODE_ENV=production
ENV ROOT_PATH=/
ENV VUE_ENV=server

COPY package.json ./
RUN npm install
# RUN npm install pm2 -g

COPY . .
# RUN node app

EXPOSE 9000
CMD ["node","app"]