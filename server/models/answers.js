var db = require('../db');

module.exports = {

  getAnswers: function (question_id, count = 5, page = 1, callback) {
    // fetch all answers for a specific question
    db.Answer.find({question_id:question_id}).limit(count)
    .then((result) => {
      //console.log('get answers result is : ', result);
      callback(null, result);
    })
    .catch((error) => {
      callback(error,null);
    })

  },
  createAnswer: function (params, callback) {
    // create a answer for a product based on the given product_id
    let new_id = 0;
    db.Meta.find({id:1})
    .then((result) => {
      new_id = result[0].answer_count;
      db.Answer.create({
      id:new_id,
      question_id:params[0],
      body:params[1],
      data_written:Date.now(),
      answerer_name:params[2],
      answerer_email:params[3],
      reported: 0,
      helpful: 0,
      urls:params[4]
    })
    .then((result) => {
      db.Meta.updateOne({id:1},{answer_count:new_id+1}).then(() => {
        console.log('increase meta id');
        callback(null, result);
      }).catch(() => {
        console.log('error')
      })
    })
    .catch((error) => {
      callback(error,null);
    })
    })
    .catch((error) => {
      console.log('error is : ',error);
    })

  },
  retportAnswer: function (answer_id,callback) {
    // report a answer , set reported to 1
    db.Answer.updateOne({id:answer_id}, {reported:1})
    .then((result) => {
      //console.log('report answer result is : ', result);
      callback(null, result);
    })
    .catch((error) => {
      callback(error,null);
    })

  },
  voteAnswer: function (answer_id, callback) {
    // vote a question as helpful, increment the helpfulness
    db.Answer.updateOne({id:answer_id},{$inc:{helpful:1}})
    .then((result) => {
      //console.log('vote answer result is : ', result);
      callback(null, result);
    })
    .catch((error) => {
      callback(error,null);
    })

  }

  };