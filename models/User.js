const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  links: [{ type: Types.ObjectId, ref: 'Link' }]
})

module.exports = model('User', schema)

//registration with name and date
// will add it early
// const { Schema, model, Types } = require("mongoose");

// const schema = new Schema({
//   userName: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   links: [{type: Types.ObjectId, ref: 'Link'}]
// });

// module.exports = model('User', schema);
