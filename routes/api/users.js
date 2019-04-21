const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const ApprovedUser =require('../../models/ApprovedUsers');
// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  console.log("this route was hit");
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ servicenumber: req.body.servicenumber }).then(user => {
    if (user) {
      errors.servicenumber = 'Service Number already exists';
      return res.status(400).json(errors);
    } else {
      ApprovedUser.findOne({servicenumber:req.body.servicenumber}).then(approveduser=>{
        if(approveduser){
          //the registration can go on now
          const newUser = new User({
            servicenumber:req.body.servicenumber,
            armofservice:req.body.armofservice,
            name: req.body.name,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });

        }else{
          errors.servicenumber="incorrect service number or service number not yet uploaded"
            res.status(400).json(errors);
           }
      })
      /*
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        serviceNumber:req.body.serviceNumber,
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });*/
    }
  });
});

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const servicenumber = req.body.servicenumber;
  const password = req.body.password;

  // Find user by email
  User.findOne({ servicenumber }).then(user => {
    // Check for user
    if (!user) {
      errors.servicenumber = 'Servicenumber not found please Ensure that you are registered';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id,armofservice:user.armofservice, name: user.name, servicenumber: user.servicenumber }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});
router.get('/all', passport.authenticate('jwt', { session: false }),(req,res,next)=>{
  User.find()
  .then(users=>{
       res.json(users)
  })
  .catch(err=>{
    res.status(400).json(err)
  })
})
// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get( '/current', passport.authenticate('jwt', { session: false }),(req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      servicenumber: req.user.servicenumber
    });
  }
);

module.exports = router;
