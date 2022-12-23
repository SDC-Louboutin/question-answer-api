const { result } = require('lodash');
var db = require('../db');

module.exports = {

  getQuestions: function (product_id, count = 5,page = 1, callback) {
    // fetch all questions
    db.Question.find({product_id:product_id, reported: 0}).limit(count)
    .then((result) => {
      console.log('get question result is : ', result);
      callback(null, result);
    })
    .catch((error) => {
      callback(error,null);
    })

  },
  createQuestion: function (params, callback) {
    // create a question for a product based on the given product_id
    var params = [req.body.body, req.body.name, req.body.email, req.body.product_id];
    // db.Question.findOne().sort('')
    db.Question.create({
      // id:,
      product_id:params[3],
      body:params[0],
      data_written:Date.now(),
      asker_name:params[1],
      asker_email:params[2],
      reported: 0,
      helpful: 0
    })
    .then((result) => {
      console.log('post question result is : ', result);
      callback(null, result);
    })
    .catch((error) => {
      callback(error,null);
    })

  },
  reportQuestion: function (question_id, callback) {
    // report a question , set reported to 1
    db.Question.updateOne({id:question_id}, {reported:1})
    .then((result) => {
      console.log('report question result is : ', result);
      callback(null, result);
    })
    .catch((error) => {
      callback(error,null);
    })


  },
  voteQuestion: function (question_id, callback) {
    // vote a question as helpful, increment the helpfulness
    db.Question.updateOne({id:question_id},{$inc:{helpful:1}})
    .then((result) => {
      console.log('vote question result is : ', result);
      callback(null, result);
    })
    .catch((error) => {
      callback(error,null);
    })

  }

  };