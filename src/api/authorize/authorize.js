const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

  function generateAuthToken(user) {
    const token = jwt.sign({ id: user.id }, "jwtPrivateKey", {
      expiresIn: '1h'
    });
    return token;
  }
  function auth(req, res, next) {
    console.log("console.log" +req.params.token)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (req.params.token == null) {
      return res.sendStatus(401);
    }
    jwt.verify(req.params.token, "jwtPrivateKey", (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  }
  function authorize(role) {
    return (req, res, next) => {
      if (req.params.role !== role && req.params.role != 'admin') {
        return res.sendStatus(403);
      }
      next();
    }
  }

  module.exports = {
    generateAuthToken: generateAuthToken,
    auth: auth,
    authorize : authorize
  }