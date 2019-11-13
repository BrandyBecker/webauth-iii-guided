const jwt = require('jsonwebtoken') //1. npm i jsonwebtoken

module.exports = (req, res, next) => {
const token = req.headers.authorization; //this is a good place for the token

  if (token) {
    const secret = process.env.JWT_SECRET || 'cat0range' //secret env
    
    //Check that the token is VALID!
    jwt.verify(token, secret, (err, decodedToken)=>{
      if(err){
        //bad panda, token has been tampered with
        res.status(401).json({ message: 'Invalid Credentials' });
      } else {
        req.decodedJwt = decodedToken; //req.decodedJwt = decodedToken
        next();
      }
    })

  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};

//checks token is valid and logged in

//users
//roles
//can a user have more than 1 role
//can a role be assigned to more than 1 user
// select * from users join roles join ... where user.username = username
