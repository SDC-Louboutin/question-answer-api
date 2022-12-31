const csv = require('csv-parser')
const fs = require('fs')
const db = require('../db')

const photos = [];
const answers = {};
const questions = [];

// read photo csv
fs.createReadStream('answers_photos.csv')
  .pipe(csv())
  .on('data', (data) => {
    photos.push(data);
  })
  .on('end', () => {
    console.log('photos is finished');
  });

// insert initial row for meta table
db.Meta.create({
  id:1,
  question_count:240000,
  answer_count:6900000
})
.then(() => {console.log('insert initial row for meta table')})
.catch(() => {console.log('initial row insertion error')})

//read questions csv
// fs.createReadStream('question.csv')
// .pipe(csv())
// .on('data', (data) => {
//   db.Question.create(data)
//   .then((result) => {
//    // console.log('q is : ', result)
//   })
//   .catch((error) => {console.log('error is : ',error)})
// })
// .on('end', () => {
//   console.log('question finished');
// });

// read answers csv
fs.createReadStream('answers.csv')
  .pipe(csv())
  .on('data', (data) => {

    data.urls = [];
    answers[data.id] = data;
    data.id = parseInt(data.id);
    data.question_id = parseInt(data.question_id);
    data.reported = parseInt(data.reported);
    data.helpful = parseInt(data.helpful);

  })
  .on('end', () => {
    console.log('original answers finished');
    photos.forEach((photo) => {
      if (answers[photo.answer_id] === undefined) {
        console.log('missing id', photo.id);
      } else {
        answers[photo.answer_id]['urls'].push(photo.url);
      }

    })
    //console.log('new answers finished ',Object.values(answers));
    const new_answers = Object.values(answers);


    let chunks = Math.ceil(new_answers.length / 100000);
    console.log(`chunks=${chunks}`)
    for (let i = 0; i < chunks; i++) {
      let arr = new_answers.slice(i * 100000, (i + 1) * 100000);
      let filename = `files/new_answers_${i}.json`;
      fs.writeFileSync(filename,JSON.stringify(arr));
      console.log(`Wrote ${filename}`, "chunk #" + i, arr.length);
    }

    process.exit();
    //write new answer to mongodb
    // new_answers.forEach((ans) => {

    //   db.Answer.create(ans)
    //   .then(() => {
    //     console.log('insered answer');
    //   })
    //   .catch((error) => {console.log('error is : ',error)})
    // })
    // console.log('All steps finished')
  });















