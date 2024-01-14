
const express = require('express');
const router = express.Router();
const {getAll,createQuiz}=require("../controllers/quizController");
router.get('/quizzes',getAll);
router.post('/quizzes',createQuiz);
module.exports=router;
