var models = require('../models');

module.exports = {

  getQuestions: function (req, res) {
    models.questions.getQuestions(req.query.product_id,req.query.count, req.query.page, function(err, results) {
      if (err) {
        console.error('Unable to retrieve questions from the database: ', err);
        res.sendStatus(500);
      } else {
        //console.log('result is : ',results);
        res.json(results);
      }
    });
  },
  postQuestion: function (req, res) {
    var params = [req.body.body, req.body.name, req.body.email, req.body.product_id];
    models.questions.createQuestion(params, function(err, results) {
      if (err) {
        console.error('Unable to post question to the database: ', err);
        res.sendStatus(500);
      }
      console.log('question inserted')
      res.sendStatus(201);
    });
  },
  voteQuestion: function (req, res) {
    // var params = [req.body.message, req.body.username, req.body.roomname];
    models.questions.voteQuestion(req.params.question_id, function(err, results) {
      if (err) {
        console.error('Unable to vote question in the database: ', err);
        res.sendStatus(500);
      }
      console.log('question voted')
      res.sendStatus(204);
    });
  },
  reportQuestion: function (req, res) {
    models.questions.reportQuestion(req.params.question_id,function(err, results) {
      if (err) {
        console.error('Unable to report question in the database: ', err);
        res.sendStatus(500);
      }
      console.log('question reported')
      res.sendStatus(204);
    });
  },
  };