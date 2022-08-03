const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { request } = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  let allSpots = await Spot.findAll({
    attributes: {
      include: [
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
      ]
    },
    include: {
      model: Review,
      attributes: []
    },
    group: ['Spot.id'],
    raw: true
  })
  let results = []

  for (let i = 0; i < allSpots.length; i++) {
    let spot = allSpots[i]
    let url;
    let image = await Image.findOne({
      where: {
        spotId: spot.id,
        previewImage: true
      },
      raw: true
    })
    if (image) {
      url = image.url
    } else {
      url = null
    }
    spot = {
      ...spot,
      previewImage: url
    }
    results.push(spot)
  }

  return res.json(results)
})

router.get('/current', requireAuth, async (req, res) => {
  const allSpots = await Spot.findAll({
    where: {
      ownerId: req.user.id
    },
    attributes: {
      include: [
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
      ]
    },
    include: {
      model: Review,
      attributes: []
    },
    group: ['Spot.id'],
    raw: true
  })
  let results = []

  for (let i = 0; i < allSpots.length; i++) {
    let spot = allSpots[i]
    let url;
    let image = await Image.findOne({
      where: {
        spotId: spot.id,
        previewImage: true
      },
      raw: true
    })
    if (image) {
      url = image.url
    } else {
      url = null
    }
    spot = {
      ...spot,
      previewImage: url
    }
    results.push(spot)
  }

  return res.json({
    Spots: results
  })
})

router.get('/:spotId', async (req, res) => {
  const { Op } = require('sequelize');
  const requestedSpot = await Spot.findByPk(req.params.spotId, {
    attributes: {
      include: [
        [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"],
        [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"]
      ]
    },
    include: {
      model: Review,
      attributes: []
    },
    raw: true
  })


  let reviewId = await Review.findAll({
    where: {
      spotId: req.params.spotId
    }, attributes: ['id'],
    raw: true
  })
  let ids = []
  reviewId.forEach((review) => {
    ids.push(review.id)
  })
  let images = await Image.findAll({
    where: {
      [Op.or]: {
        spotId: req.params.spotId,
        reviewId: {
          [Op.in]: ids
        }
      }
    },
    attributes: ['id', 'spotId', 'reviewId', 'url'],
    raw: true
  })
  let newImages = []
  images.forEach((img) => {
    let temp = {}
    temp.id = img.id
    if (img.spotId) {
      temp.imageableId = img.spotId
    } else {
      temp.imageableId = img.reviewId
    }
    temp.url = img.url
    newImages.push(temp)
  })
  requestedSpot['Images'] = newImages
  requestedSpot['Owner'] = await User.findOne({
    where: {
      id: requestedSpot.ownerId
    }, attributes: ['id', 'firstName', 'lastName']
  })

  if (!requestedSpot.id) {
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

  return res.json({
    id: spot.id ,
    ownerId: spot.ownerId ,
    address: spot.address,
    city: spot.address,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lat,
    name: spot.name,
    description: spot.name,
    price: spot.name,
    createdAt: spot.createdAt, 
    updatedAt: spot.updatedAt
  })
})



module.exports = router;