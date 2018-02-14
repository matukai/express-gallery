const express = require('express');
const router = express.Router();
// const User = require('../knex/models/User');
// const Gallery = require('../knex/models/Gallery');


router.get('/new', (req, res) => {
  console.log(req)
  return res.render('register')
})










module.exports = router;