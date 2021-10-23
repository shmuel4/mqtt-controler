FROM node:14

COPY . /app

WORKDIR /app
RUN npm install

CMD ["npm", "start"]
