const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User=require("../model/User");
exports.signup = async(req,res) => {
  // Route pour l'inscription (création d'un utilisateur)
    const { username, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword, role });
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
}
  // Route pour la connexion (authentification)
exports.login= async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ error: "Nom d'utilisateur incorrect" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Mot de passe incorrect' });
      }

      const token = jwt.sign({ username: user.username, role: user.role }, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
};
