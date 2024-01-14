// authenticateToken.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  jwt.verify(token, 'YOUR_SECRET_KEY', (err, decodedToken) => {
    if (err) {
      console.error(err.message);
      res.status(401).json({ error: 'Erreur de vérification du jeton' });
    } else {
      req.user = {
        username: decodedToken.username,
        role: decodedToken.role,
      };
      next(); // Appel de next() pour passer au middleware ou à la route suivante
    }
  });
};

module.exports = authenticateToken;
