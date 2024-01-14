
const authenticateToken=require("../middleware/authenticate");
const Quiz=require("../model/Quiz");

exports.getAll=async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      res.json(quizzes);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des quiz' });
    }
  };

  exports.createQuiz = async (req, res) => {
    try {
      authenticateToken(req, res, async() => {
        const userIsAdmin = req.user && req.user.role === 'admin';
        if (!userIsAdmin) {
          return res.status(403).json({ error: 'Accès non autorisé. Seuls les administrateurs peuvent créer des quiz.' });
        }
  
        const { title, questions } = req.body;
        const newQuiz = new Quiz({ title, questions });
  
        console.log('Nouveau Quiz:', newQuiz);
  
        const savedQuiz = await newQuiz.save();
  
        res.status(201).json(savedQuiz);
      });
    } catch (error) {
      console.error('Erreur lors de la création du quiz:', error);
      res.status(500).json({ error: 'Erreur lors de la création du quiz.' });
    }
  };
  