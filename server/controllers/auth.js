const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  User.findOne({email: email}).then(user => {
    console.log(user);
    if(!user) {
      return res.status(404).json({err: "User is not found"}) 
    }

    bcrypt.compare(password, user.password).then(match => {
      if(match) {
        const payload = {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        };

        jwt.sign(payload, process.env.KEY, {expiresIn: 604800 }, (err, token) => {
          return res.status(200).json({ token: `Bearer ${token}`, })
        })
      } else {
        return res.status(404).json({msg: "Incorrect Password."});
      }
    })
  });
}

exports.postRegister = (req, res) => {
  const body = req.body;
  const user = new User();

  user.username = body.username;
  user.email = body.email;
  user.credits = body.credits;
  user.role = body.role;

  try {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        user.password = hash;

        user.save().then(() => {
            res.status(201).json(user);
        });
    });
  } catch(error) {
      res.status(409).json({message: error.message});
  }
}

exports.postResetPassword = (req, res) => {
  res.status(200).send({message: 'success reset password'});
}