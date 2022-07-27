const express = require('express');
const router = express.Router();

router.get('/hello/world', function (req, res) {
  const csrfToken = req.csrfToken()
  res.cookie('XSRF-TOKEN', csrfToken);
  res.send('Hello World!');
});

module.exports = router;