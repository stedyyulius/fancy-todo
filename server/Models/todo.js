const mongoose = require('mongoose')
const Schema = mongoose.Schema

var todoSchema = new Schema({
  task: String,
  status: String,
  user_id: {type:Schema.Types.ObjectId,ref:'User'},
  createdAt: Date,
})

var todo = mongoose.model('Todo',todoSchema)

module.exports = todo