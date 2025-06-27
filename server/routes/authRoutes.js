const express = require("express");
const router = express.Router();
const authController = require('../controllers/auth.Controller');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello from Railway!'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
