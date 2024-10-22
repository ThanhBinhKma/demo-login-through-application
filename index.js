const express = require('express')
const dotenv = require( 'dotenv')
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send(`<a href='http://localhost:3434/check-login'> Login through app B </a>`);
})

app.use('/callback', (req, res) => {
  const token = req.query.token;

  if (!token) {
    return res.status(401).send("Unauthorized");
  }

  jwt.verify(token, process.env.JWT_SECRET_B, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }

    const userId = decoded.userId;
    console.log(userId);
    res.send("Login successful, you can now close this window.");
  });
});
app.listen(3121, () => {
    console.log('listen port 3121');
})