const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken') //1. npm i jsonwebtoken

const Users = require('../users/users-model.js');
const {validateUser} = require ('../users/users-helpers.js')
// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
  let user = req.body;
  //always validate the data before sending it to the db
  const validateResult = valudateUser(user);

  if(validateResult.isSuccessful === true){

 

  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
    
  }else{
    res.status(400).json({message: 'Invalid Info about the User'})
  }
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        //2. produce a token
        const token = getJwtToken(user.username);

        //3. send the token to the clinet
        res.status(200).json({
          token, //token
          message: `Welcome ${user.username}! have a token ...`
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function getJwtToken(username){
  const payload = { //obj
    username,
    role: 'student' //this will porbably come from the db
  }

  const secret = process.env.JWT_SECRET || 'cat0range' //env

  const options = { //obj
    expiresIn: '1d' //expires in 1 day
  }

  return jwt.sign(payload, secret, options)
}

module.exports = router;
