const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors, handleSignupErrors } = require('../../utils/validation');

const router = express.Router();

// Original validateSignup
// const validateSignup = [
//   check('email')
//     .exists({ checkFalsy: true })
//     .isEmail()
//     .withMessage('Please provide a valid email.'),
//   check('username')
//     .exists({ checkFalsy: true })
//     .isLength({ min: 4 })
//     .withMessage('Please provide a username with at least 4 characters.'),
//   check('username')
//     .not()
//     .isEmail()
//     .withMessage('Username cannot be an email.'),
//   check('password')
//     .exists({ checkFalsy: true })
//     .isLength({ min: 6 })
//     .withMessage('Password must be 6 characters or more.'),
//   handleValidationErrors
// ];

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required'),
  check('username') 
    .exists({ checkFalsy: false})
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  handleValidationErrors
]

// Sign Up 
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  const emailCheck = await User.findOne({ where: { email: email } })
  if (emailCheck) {
    res.status(403)
    return res.json({
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "email": "User with that email already exists"
      }
    })
  }
  const usernameCheck = await User.findOne({ where: { username: username } })
  if (usernameCheck) {
    res.status(403)
    return res.json({
      "message": "User already exists",
      "statusCode": 403,
      "errors": {
        "username": "User with that username already exists"
      }
    })
  }


  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password
  });

  const token = await setTokenCookie(res, user);
  const userInfo = user.toSafeObject()
  userInfo.token = token

  return res.json(userInfo);
})

module.exports = router;