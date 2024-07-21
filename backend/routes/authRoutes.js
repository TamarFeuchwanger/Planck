const express = require("express");
const { verifyLogin } = require("../controllers/authController");
const router = express.Router();

router.post("/login", verifyLogin, (req, res) => {
  const { user } = req;
  res.status(200).json({ user });
});

module.exports = router;
