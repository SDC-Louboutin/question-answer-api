var controller = require('./controllers');
var router = require('express').Router();
var debug = require('debug')('router');

//Connect controller methods to their corresponding routes
debug('start router ')
// Routes for questions
router.get('/questions', controller.questions.getQuestions);
router.post('/questions', controller.questions.postQuestion);
router.put('/questions/:question_id/helpful', controller.questions.voteQuestion);
router.put('/questions/:question_id/report', controller.questions.reportQuestion);


// Routes for answers
router.get('/questions/:question_id/answers', controller.answers.getAnswers)
router.post('/questions/:question_id/answers', controller.answers.postAnswer);
router.put('/answers/:answer_id/helpful', controller.answers.voteAnswer);
router.put('/answers/:answer_id/report', controller.answers.reportAnswer);

module.exports = router;

