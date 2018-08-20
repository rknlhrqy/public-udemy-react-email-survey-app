const mongoose = require('mongoose');
const { recipientSchema } = require('./recipient');

const { Schema } = mongoose;

const surveySchema = new Schema({
  title: {
    type: String,
    trim: true,
    minlength: 1,
  },
  body: {
    type: String,
    trim: true,
    minlength: 1,
  },
  subject: {
    type: String,
    trim: true,
    minlength: 1,
  },
  recipients: [recipientSchema],
  yes: {
    type: Number,
    default: 0,
  },
  no: {
    type: Number,
    default: 0,
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  dateSent: Date,
  lastResponded: Date,
});

const Survey = mongoose.model('Survey', surveySchema);

module.exports = {
  Survey,
};
