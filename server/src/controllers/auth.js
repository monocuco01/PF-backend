const { Users } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
    try {
      const newUser = await Users.create({
        firstName: userData.firstName,
        userName: userData.userName,
        email: userData.email,
        password: userData.password, 
        admin: userData.admin || false,
      });
  
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  
  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await Users.findOne({
        where: { email },
      });
  
      if (!user) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
      }
  
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  
      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  };

  const getAllUsers = async () => {
    try {
      const users = await Users.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  };
  

module.exports = {
  registerUser,
  loginUser,
  getAllUsers
};
