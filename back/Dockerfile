FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . ./

RUN npm rebuild sqlite3

EXPOSE ${BACK_API_PORT}

CMD ["sh", "-c", "npm run start && npm run seed"]
