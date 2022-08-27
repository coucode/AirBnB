const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Middleware to check that all sign up fields are valid
const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Username is required'),
  check('username')
    .exists({ checkFalsy: false })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email address.'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
  handleValidationErrors
]

// Signs up a new user and checking against existing emails and usernames
router.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  const emailCheck = await User.findOne({ where: { email: email } })
  const usernameCheck = await User.findOne({ where: { username: username } })
  let error = {}

  if (emailCheck) { error.email = "User with that email already exists" }
  if (usernameCheck) { error.username = "User with that username already exists" }

  if (emailCheck || usernameCheck) {
    res.status(403)
    return res.json({
      "message": "User already exists",
      "statusCode": 403,
      "errors": error
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