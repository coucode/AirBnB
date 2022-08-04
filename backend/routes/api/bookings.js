const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, User, Review, Image, Booking, sequelize } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Get all of the current user's bookings
router.get('/current', requireAuth, async (req, res) => {
  let bookings = await Booking.findAll({
    where: {
      userId: req.user.id
    }
  })

  let result = []
  for (let booking of bookings) {
    let spotInfo = await Spot.findByPk(booking.spotId, {
      attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'], 
      raw: true
    })
    let image = await Image.findOne({
      where: {
        spotId: booking.spotId,
        previewImage: true
      }, raw: true
    })
    spotInfo["previewImage"] = image.url
    let temp = {
      id: booking.id,
      spotId: booking.spotId,
      Spot: spotInfo,
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
})


module.exports = router;