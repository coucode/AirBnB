const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Spot, User, Review, Image, sequelize } = require('../../db/models')
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all reviews of the current user

router.get('/current', requireAuth, async (req, res) => {
  const reviews = await Review.findAll({
    where: {
      userId: req.user.id
    },
    include: [{
      model: User,
      attributes: ['id', 'firstName', 'lastName']
    }, {
      model: Spot,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
    ]
  })
  for (let review of reviews) {
    let imgResult = []
    const images = await Image.findAll({
      where: {
        reviewId: review.id
      }
    })

    for (let image of images) {
      let temp = {}
      temp.id = image.id
      if (image.reviewId) {
        temp.imageableId = image.reviewId
      } else {
        temp.imageableId = image.spotId
      }
      temp.url = image.url
      imgResult.push(temp)
    }
    // review.toJSON()
    review.dataValues["Images"] = imgResult
  }

  return res.json(reviews)

})


module.exports = router;