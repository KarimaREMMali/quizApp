const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
    title: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Référence vers le modèle User
    questions: [{ question: String, options: [String], correctOption: Number }],
  });
const Quiz = mongoose.model('Quiz', quizSchema);
module.exports=Quiz;
  