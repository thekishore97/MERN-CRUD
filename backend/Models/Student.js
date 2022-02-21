const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentSchema = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  email: {
    type: String
  },
   dob: {
    type: String
  },
}, {
    collection: 'users'
  })

module.exports = mongoose.model('User', studentSchema)