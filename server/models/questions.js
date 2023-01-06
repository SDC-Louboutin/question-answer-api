const { result } = require('lodash');
var db = require('../db');
//var debug = require('debug')('question');

module.exports = {

  getQuestions: function (product_id, count = 5, page = 1, callback) {
    //debug('start question model')
    // fetch all questions
    db.Question.find({ product_id: product_id, reported: 0 }).limit(count)
      .then((result) => {
        //console.log('get question result is : ', result);
        //debug('end question model')
        callback(null, result);
      })
      .catch((error) => {
        callback(error, null);
      })

  },
  createQuestion: function (params, callback) {
    //console.log('here for the post in model')
    // db.Meta.find({id:1})
    // .then((result) => {
    //   new_id = result[0].question_count;

    //   db.Question.create({
    //   id:new_id,
    //   product_id:params[3],
    //   body:params[0],
    //   data_written:Date.now(),
    //   asker_name:params[1],
    //   asker_email:params[2],
    //   reported: 0,
    //   helpful: 0
    // })
    // .then((result) => {
    //   db.Meta.updateOne({id:1},{question_count:new_id+1}).then(() => {
    //     console.log('increase meta id');
    //     callback(null, result);
    //   }).catch(() => {
    //     console.log('error')
    //   })
    // })
    // .catch((error) => {
    //   callback(error,null);
    // })
    // })
    // .catch((error) => {
    //   console.log('error is : ',error);
    // })
    db.Meta.findOneAndUpdate({ id: 1 }, { $inc: { question_count: 1 } }, { new: false })
      .then((result) => {
        db.Question.create({
          id: result.question_count,
          product_id: params[3],
          body: params[0],
          date_written: Date.now(),
          asker_name: params[1],
          asker_email: params[2],
          reported: 0,
          helpful: 0
        })
          .then((result) => {
            callback(null, result);
          })
          .catch((error) => {
            callback(error, null);
          })
      })
      .catch((error) => {console.log('insert error is : ',error)})
  },
  reportQuestion: function (question_id, callback) {
    // report a question , set reported to 1
    db.Question.updateOne({ id: question_id }, { reported: 1 })
      .then((result) => {
        //console.log('report question result is : ', result);
        callback(null, result);
      })
      .catch((error) => {
        callback(error, null);
      })


  },
  voteQuestion: function (question_id, callback) {
    // vote a question as helpful, increment the helpfulness
    db.Question.updateOne({ id: question_id }, { $inc: { helpful: 1 } })
      .then((result) => {
        //console.log('vote question result is : ', result);
        callback(null, result);
      })
      .catch((error) => {
        callback(error, null);
      })

  }

};
