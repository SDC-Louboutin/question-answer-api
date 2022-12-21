const { Client } = require('pg')

const client = new Client({
  host: '127.0.0.1',
  user: 'abigailli',
  database: 'abigailli',
  password: '',
  port: 5432,
});


const queryQuestion = `
    CREATE TABLE IF NOT EXISTS "questions" (
	    "id" SERIAL,
      "product_id" INTEGER,
	    "q_body" TEXT NOT NULL,
      "date" TIMESTAMP,
	    "asker_name" VARCHAR(50) NOT NULL,
      "asker_email" VARCHAR(150) NOT NULL,
      "reported" BOOLEAN NOT NULL,
      "helpful" INTEGER,
	    PRIMARY KEY ("id")
    );`;

const queryAnswer = `
  CREATE TABLE IF NOT EXISTS "answers" (
    "id" SERIAL,
    "question_id" INTEGER,
    "a_body" TEXT NOT NULL,
    "date" TIMESTAMP,
    "answerer_name" VARCHAR(50) NOT NULL,
    "answerer_email" VARCHAR(150) NOT NULL,
    "reported" BOOLEAN NOT NULL,
    "helpful" INTEGER,
    "photos" TEXT [],
    PRIMARY KEY ("id")
  );`;


client.connect();
const execute = async (query) => {
  try {
    // await client.connect();     // gets connection
    await client.query(query);  // sends queries
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }
};


execute(queryQuestion).then(result => {
  if (result) {
    console.log('questions Table created');
  }
});

execute(queryAnswer).then(result => {
  if (result) {
    console.log('answers Table created');
  }
});



