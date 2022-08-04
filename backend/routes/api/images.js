const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { Spot, User, Review, Image, Booking, sequelize } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
  let image = await Image.findByPk(req.params.imageId)
  if (!image){
    res.status(404)
    return res.json({
      "message": "Image couldn't be found",
      "statusCode": 404
    })
  }
  if (image.userId !== req.user.id){
    res.status(403)
    return res.json({
      "message": "Unauthorized action - you are not authorized to delete this image",
      "statusCode": 403
    })
  }
  image.destroy()
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

module.exports = router;