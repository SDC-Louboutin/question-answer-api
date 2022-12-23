var db = require('../db');

module.exports = {

  getAnswers: function (question_id, count = 5, page = 1, callback) {
    // fetch all answers for a specific question
    db.Answer.find({question_id:question_id}).limit(count)
    .then((result) => {
      console.log('get answers result is : ', result);
      callback(null, result);
    })
    .catch((error) => {
      callback(error,null);
    })

  },
  createAnswer: function (params, callback) {
    // create a answer for a product based on the given product_id

  },
  retportAnswer: function (answer_id,callback) {
    // report a answer , set reported to 1
    db.Answer.updateOne({id:answer_id}, {reported:1})
    .then((result) => {
      console.log('report answer result is : ', result);
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
      console.log('vote answer result is : ', result);
      callback(null, result);
    })
    .catch((error) => {
      callback(error,null);
    })

  }

  };