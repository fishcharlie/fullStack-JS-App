var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

var Card = mongoose.model('Card', cardSchema);

module.exports = Card;
