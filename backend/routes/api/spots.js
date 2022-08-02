const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, User } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { request } = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  const allSpots = await Spot.findAll()
  return res.json({
    Spots: allSpots
  })
})

router.get('/current', requireAuth, async (req, res) => {
  const userSpots = await Spot.findAll({
    where: {
      ownerId: req.user.id
    }
  })
  return res.json({
    Spots: userSpots
  })
})

router.get('/:spotId', async (req, res) => {
  const requestedSpot = await Spot.findByPk(req.params.spotId)

  if (!requestedSpot){
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  return res.json(requestedSpot)
})

const validateNewSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage("Street address is required"),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage("City is required"),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage("State is required"),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage("Country is required"),
  check('lat')
    .isDecimal()
    .custom((value) => {
      if (value > 90 || value < -90) {
        throw new Error("Latitude is not valid")
      }
      return true
    })
    .withMessage("Latitude is not valid"),
  check('lng')
    .isDecimal()
    .custom((value) => {
      if (value > 180 || value < -180) {
        throw new Error("Longitude is not valid")
      }
      return true
    })
    .withMessage("Longitude is not valid"),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors
]

router.post('/', requireAuth, validateNewSpot, async (req, res) => {
  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  } = req.body;

  const spot = await Spot.create({
    ownerId: req.user.id,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price
  })

  return res.json(spot)
})

module.exports = router;