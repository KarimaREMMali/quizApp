const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/quizApp');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
app.use('/auth', authRoutes);
app.use('/api', quizRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});