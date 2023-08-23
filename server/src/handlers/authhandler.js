const { registerUser, loginUser } = require('../controllers/auth');

const registerUserHandler = async (req, res) => {
  const userData = req.body;

  try {
    const newUser = await registerUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUserHandler = async (req, res) => {
    try {
      const result = await loginUser(req, res);
      return result;
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      return res.status(500).json({ error: "Error en el servidor" });
    }
  };

module.exports = {
  registerUserHandler,
  loginUserHandler,
};
