var models = require('../models');

module.exports = {

  getAnswers: function (req, res) {
    models.answers.getAnswers(req.params.question_id, req.query.count, req.query.page, function(err, results) {
      if (err) {
        console.error('Unable to retrieve answers from the database: ', err);
        res.sendStatus(500);
      } else {
        //console.log('get answer result is : ',results);
        res.json(results);
      }
    });
  },
  postAnswer: function (req, res) {
    var params = [req.params.question_id,req.body.body, req.body.name, req.body.email, req.body.photos];
    models.answers.createAnswer(params, function(err, results) {
      if (err) {
        console.error('Unable to post answer to the database: ', err);
        res.sendStatus(500);
      }
      console.log('answer inserted')
      res.sendStatus(201);
    });
  },
  voteAnswer: function (req, res) {
    models.answers.voteAnswer(function(err, results) {
      if (err) {
        console.error('Unable to vote answer in the database: ', err);
        res.sendStatus(500);
      }
      console.log('answer voted')
      res.sendStatus(201);
    });
  },
  reportAnswer: function (req, res) {
    models.answers.reportAnswer(req.params.answer_id,function(err, results) {
      if (err) {
        console.error('Unable to report answer in the database: ', err);
        res.sendStatus(500);
      }
      console.log('answer reported')
      res.sendStatus(201);
    });
  },
  };