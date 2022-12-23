const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/q_a', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('strictQuery', true)

let questionSchema = mongoose.Schema({
  // TODO: your schema here!
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
  // TODO: your schema here!
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

const Question = mongoose.model('questions', questionSchema);
const Answer = mongoose.model('answers', answerSchema);

// Answer.find({question_id:23})
// .then((result) => {
//   console.log('result is : ',result);
// })
// .catch(() => {
//   console.log('error is : ',error);
// })

module.exports.Question = Question;
module.exports.Answer = Answer;







