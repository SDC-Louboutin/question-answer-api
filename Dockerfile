FROM node:18-slim

WORKDIR /app

COPY ./package*.json /app

RUN npm install

COPY . .

ENV PORT=8080

ENV DB_MONGO='mongodb://127.0.0.1/q_a'

EXPOSE 8080

CMD ["npm", "start"]