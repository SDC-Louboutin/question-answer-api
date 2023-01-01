const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/q_a', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('strictQuery', true)

let questionSchema = mongoose.Schema({

  id: {type: Number, required: true, unique: true},
  product_id: Number,
  body: String,
  date_written: String,
  asker_name: String,
  asker_email: String,
  reported: Number,
  helpful: Number
});

let answerSchema = mongoose.Schema({

  id: {type: Number, required: true, unique: true},
  question_id: Number,
  body: String,
  date_written: Date,
  answerer_name: String,
  answerer_email:String,
  reported: Number,
  helpful: Number,
  urls: Array
});

let metaSchema = mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  question_count: Number,
  answer_count: Number
});

const Question = mongoose.model('questions', questionSchema);
const Answer = mongoose.model('answers', answerSchema);
const AnswerD = mongoose.model('answersds', answerSchema);
const Meta = mongoose.model('metas', metaSchema);


// // insert into meta table
// let question_count = 0;
// let answer_count = 0;

// Question.countDocuments({})
// .then((result) => {
//   question_count = result;
//   Answer.countDocuments({})
// .then((result) => {
//   answer_count = result;
//   console.log('the count is : ', question_count, answer_count);
//   Meta.create({id: 1,question_count:question_count, answer_count:answer_count}).then(() => {console.log('result is of create meta table')})
// })
// })

module.exports.Question = Question;
module.exports.Answer = Answer;
module.exports.Meta = Meta;
module.exports.AnswerD = AnswerD;







