const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/q_a', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let questionSchema = mongoose.Schema({
  // TODO: your schema here!
  question_id: {type: Number, required: true, unique: true},
  q_body: String,
  q_date: String,
  asker_name: String,
  q_helpfulness: Number,
  q_reported: Boolean,
  asker_email: String,
  product_id: Number
});

let answerSchema = mongoose.Schema({
  // TODO: your schema here!
  answer_id: {type: Number, required: true, unique: true},
  a_body: String,
  a_date: Date,
  answerer_name: String,
  a_helpfulness: Number,
  a_photos: Array,
  a_reported: Boolean,
  question_id: Number
});

let Question = mongoose.model('Questions', questionSchema);
let Answer = mongoose.model('Answers', answerSchema);





