const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String, // 'admin' ou 'student'
  });
  const User = mongoose.model('User', userSchema);
module.exports=User;
  