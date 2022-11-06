const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, User, Review, Image, Booking, sequelize } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')

const router = express.Router();

const spotNotFound = {
  "message": "Spot couldn't be found",
  "statusCode": 404
}
const forbidden = {
  "message": "Forbidden",
  "statusCode": 403
}

// Middleware that checks that all query parameters are valid
const validateQuery = [
  check('page')
    .custom((value) => {
      if (value < 0) {
        throw new Error("Page must be greater than or equal to 0")
      }
      if (value > 10) {
        throw new Error("Page must be less than or equal to 10")
      }
      return true
    }),
  check('size')
    .custom((value) => {
      if (value < 0) {
        throw new Error("Size must be greater than or equal to 0 ")
      }
      if (value > 20) {
        throw new Error("Page must be less than or equal to 10")
      }
      return true
    }),
  check('maxLat')
    .custom((value) => {
      if (value > 90) {
        throw new Error("Maximum latitude is invalid")
      }
      return true
    }),
  check('minLat')
    .custom((value) => {
      if (value < -90) {
        throw new Error("Minimum latitude is invalid")
      }
      return true
    }),
  check('maxLng')
    .custom((value) => {
      if (value > 180) {
        throw new Error("Maximum longitude is invalid")
      }
      return true
    }),
  check('minLng')
    .custom((value) => {
      if (value < -180) {
        throw new Error("Maximum longitude is invalid")
      }
      return true
    }),

  check('minPrice')
    .custom((value) => {
      if (value < 0) {
        throw new Error("Minimum price must be greater than or equal to 0")
      }
      return true
    }),
  check('maxPrice')
    .custom((value) => {
      if (value < 0) {
        throw new Error("Maximum price must be greater than or equal to 0")
      }
      return true
    })
  , handleValidationErrors
]
// Gets all spots
router.get('/', validateQuery, async (req, res) => {
  // Grabs query values
  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query
  // Checks if a query value exists. This if statement allows the original get all spots 
  // with avgRating to appear normally.
  if (page || size || minLat || maxLat || minLng || maxLng || minPrice || maxPrice) {
    if (!page) { page = 0 }
    if (!size) { size = 20 }
    page = parseInt(page)
    size = parseInt(size)

    const pagination = {}
    if (page >= 1 && size >= 1) {
      pagination.limit = size
      pagination.offset = size * (page - 1)
    }
    /******** Filters ********/
    const where = {}
    // Latitude: sets min and max values, if provided
    if (minLat && maxLat) { where.lat = { [Op.between]: [minLat, maxLat] } }
    if (minLat && !maxLat) { where.lat = { [Op.gte]: minLat } }
    if (!minLat && maxLat) { where.lat = { [Op.lte]: maxLat } }
    // Longitude: sets min and max values, if provided
    if (minLng && maxLng) { where.lng = { [Op.between]: [minLng, maxLng] } }
    if (minLng && !maxLng) { where.lng = { [Op.gte]: minLng } }
    if (!minLng && maxLng) { where.lng = { [Op.lte]: maxLng } }
    // Price: sets min and max values, if provided
    if (minPrice && maxPrice) { where.price = { [Op.between]: [minPrice, maxPrice] } }
    if (minPrice && !maxPrice) { where.price = { [Op.gte]: minPrice } }
    if (!minPrice && maxPrice) { where.price = { [Op.lte]: maxLng } }


    let allSpots = await Spot.findAll({
      where,
      ...pagination,
      raw: true
    })
    let results = []
    for (let spot of allSpots) {
      let url;
      let image = await Image.findOne({
        where: {
          spotId: spot.id,
          previewImage: true
        }, raw: true
      })
      if (image) { url = image.url }
      else { url = null }
      spot = { ...spot, previewImage: url }
      results.push(spot)
    }

    return res.json({
      "Spots": results,
      "page": page,
      "size": size
    })
  }
  // Returns Get all Spots without query parameters (includes avgRating)
  let allSpots = await Spot.findAll({
    attributes: {
      include: [[sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]]
    },
    include: { model: Review, attributes: [] },
    group: ['Spot.id'],
    raw: true
  })
  let results = []
  for (let spot of allSpots) {
    let url;
    let image = await Image.findOne({
      where: {
        spotId: spot.id,
        previewImage: true
      }, raw: true
    })
    if (image) { url = image.url } else { url = null }
    if (spot.avgRating) { spot.avgRating = Number(spot.avgRating).toFixed(1) }
    spot = { ...spot, previewImage: url }
    results.push(spot)
  }
  return res.json(results)
})

// Get all spots of the current user
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
    include: { model: Review, attributes: [] },
    group: ['Spot.id'],
    raw: true
  })
  let results = []
  for (let spot of allSpots) {
    let url;
    let image = await Image.findOne({
      where: { spotId: spot.id, previewImage: true },
      raw: true
    })
    if (image) { url = image.url } else { url = null }
    if (spot.avgRating) {
      spot.avgRating = Number(spot.avgRating).toFixed(1)
    }
    spot = { ...spot, previewImage: url }
    results.push(spot)
  }

  return res.json({
    Spots: results
  })
})

// Get details for a spot by id
router.get('/:spotId', async (req, res) => {
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
    group: ['Spot.id'],
    raw: true
  })
  if (!requestedSpot) {
    res.status(404)
    return res.json(spotNotFound)
  }
  if (requestedSpot.avgStarRating) { requestedSpot.avgStarRating = Number(requestedSpot.avgStarRating).toFixed(1) }
  // Get the images associated with this spot
  const images = await Image.findAll({ where: { spotId: req.params.spotId } })
  let imgResult = []
  for (let image of images) {
    let temp = {}
    temp.id = image.id
    if (image.reviewId) { temp.imageableId = image.reviewId } else { temp.imageableId = image.spotId }
    temp.url = image.url
    imgResult.push(temp)
  }
  const owner = await User.findByPk(requestedSpot.ownerId, {
    attributes: ['id', 'firstName', 'lastName']
  })
  requestedSpot['Images'] = imgResult
  requestedSpot['Owner'] = owner
  return res.json(requestedSpot)
})

// Get all reviews by a spot's id
router.get('/:spotId/reviews', async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId)
  if (!spot) {
    res.status(404)
    return res.json(spotNotFound)
  }
  let spotReviews = await Review.findAll({
    where: {
      spotId: req.params.spotId
    },
    include: {
      model: User,
      attributes: ['id', 'firstName', 'lastName']
    }
  })
  for (let review of spotReviews) {
    let imgResult = []
    const images = await Image.findAll({
      where: {
        reviewId: review.id
      }
    })
    for (let image of images) {
      let temp = {}
      temp.id = image.id
      if (image.reviewId) { temp.imageableId = image.reviewId } else { temp.imageableId = image.spotId }
      temp.url = image.url
      imgResult.push(temp)
    }
    review.dataValues["Images"] = imgResult
  }
  return res.json({ "Reviews": spotReviews })
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId)
  if (!spot) {
    res.status(404)
    return res.json(spotNotFound)
  }
  if (req.user.id === spot.ownerId) {
    let bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId
      },
      include: {
        model: User,
        // attributes: ['id', 'firstName', 'lastName']
      },
    })
    let result = []
    for (let booking of bookings) {
      let user = booking.User.toJSON()

      let temp = {
        User: user,
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate.toDateString(),
        endDate: booking.endDate.toDateString(),
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      }
      result.push(temp)
    }
    return res.json({
      "Bookings": result
    })
  } else {
    let bookings = await Booking.findAll({
      where: {
        spotId: req.params.spotId
      },
      attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate']
    })
    return res.json({"Bookings": bookings})
  }
})

// Middleware to check all create a spot fields exist, meet validations
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
    .not()
    .isEmpty()
    .withMessage("Latitude is not valid")
    .isDecimal()
    .custom((value) => {
      if (value > 90 || value < -90) {
        throw new Error("Latitude is not valid")
      }
      return true
    }),
  check('lng')
    .not()
    .isEmpty()
    .withMessage("Longitude is not valid")
    .isDecimal()
    .custom((value) => {
      if (value > 180 || value < -180) {
        throw new Error("Longitude is not valid")
      }
      return true
    }),
  check('name')
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check('price')
    .not()
    .isEmpty()
    .withMessage("Price per day is required")
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors
]
// Create a new spot 
router.post('/', requireAuth, validateNewSpot, async (req, res) => {
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const spot = await Spot.create({
    ownerId: req.user.id,
    address, city, state, country, lat, lng, name, description, price
  })
  res.status(201)
  return res.json({
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt
  })
})

// Owner creates an image for a spot
router.post('/:spotId/images', requireAuth, async (req, res) => {
  const { url, previewImage } = req.body
  let spot = await Spot.findByPk(req.params.spotId)
  if (!spot) {
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  if (req.user.id !== spot.ownerId) {
    res.status(403)
    return res.json(forbidden)
  }
  const newImage = await Image.create({
    url,
    previewImage,
    spotId: req.params.spotId,
    userId: req.user.id
  })
  return res.json({
    "id": newImage.id,
    "imageableId": newImage.spotId,
    "url": newImage.url
  })
})

// Helper function to validate review fields
const validateReview = [
  check('review')
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check('stars')
    .isNumeric()
    .withMessage("Stars must be an integer from 1 to 5")
    .custom((value) => {
      if (value > 5 || value < 1) {
        throw new Error("Stars must be an integer from 1 to 5")
      }
      return true
    })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors
]

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
  const { review, stars } = req.body
  let spot = await Spot.findByPk(req.params.spotId)
  if (!spot) {
    res.status(404)
    return res.json(spotNotFound)
  }
  let reviewCheck = await Review.findOne({
    where: { userId: req.user.id, spotId: spot.id }
  })
  if (reviewCheck) {
    res.status(403)
    return res.json({
      "message": "User already has a review for this spot",
      "statusCode": 403
    })
  }
  let newReview = await Review.create({
    review,
    stars,
    userId: req.user.id,
    spotId: spot.id
  })
  res.status(201)
  return res.json(newReview)
})

// Owner edits a spot
router.put('/:spotId', requireAuth, validateNewSpot, async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId)
  if (!spot) {
    res.status(404)
    return res.json(spotNotFound)
  }
  if (req.user.id !== spot.ownerId) {
    res.status(403)
    return res.json(forbidden)
  }
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  spot.update({
    address: address,
    city: city,
    state: state,
    country: country,
    lat: lat,
    lng: lng,
    name: name,
    description: description,
    price: price
  })
  return res.json(spot)
})

// Owner can delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId)
  if (!spot) {
    res.status(404)
    return res.json(spotNotFound)
  }
  if (req.user.id !== spot.ownerId) {
    res.status(403)
    return res.json(forbidden)
  }
  spot.destroy()
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})



// Create a booking based on spotId
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
  let spot = await Spot.findByPk(req.params.spotId)
  if (!spot) {
    res.status(404)
    return res.json(spotNotFound)
  }
  if (spot.ownerId === req.user.id) {
    res.status(403)
    return res.json(forbidden)
  }
  let { startDate, endDate } = req.body
  startDate = new Date(startDate)
  endDate = new Date(endDate)

  if (endDate <= startDate) {
    res.status(400)
    return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot be on or before startDate"
      }
    })
  }
  const { Op } = require('sequelize')

  let conflicts = await Booking.findAll({
    where: {
      [Op.or]: {
        startDate: {
          [Op.between]: [startDate, endDate]
        }, endDate: {
          [Op.between]: [startDate, endDate]
        },
      },
      spotId: spot.id,
    },
    attributes: ['startDate', 'endDate']
  })
  let error = {}
  for (let conflict of conflicts) {
    if (startDate >= conflict.startDate && startDate <= conflict.endDate) {
      error.startDate = "Start date conflicts with an existing booking"
    }
    if (endDate >= conflict.endDate && endDate <= conflict.endDate) {
      error.endDate = "End date conflicts with an existing booking"
    }
  }
  if (error.startDate || error.endDate) {
    res.status(403)
    return res.json({
      "message": "Sorry, this spot is already booked for the specified dates",
      "statusCode": 403,
      "errors": error
    })
  }
  let newBooking = await Booking.create({
    spotId: spot.id,
    userId: req.user.id,
    startDate,
    endDate
  })
  return res.json(newBooking)
})

module.exports = router;