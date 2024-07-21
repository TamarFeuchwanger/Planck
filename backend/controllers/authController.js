const fs = require("fs");
const path = require("path");

const users = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/users.json"), "utf-8")
);

const verifyLogin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid authorization header" });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = atob(base64Credentials).split(":");
  const email = credentials[0];
  const password = credentials[1];
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

module.exports = { verifyLogin };
