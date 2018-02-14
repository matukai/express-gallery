const express = require('express');
const router = express.Router();


router.get('/new', (req, res) => {
  return res.render('register');
})

router.get('/login', (req, res) => {
  return res.render('login');
})

router.get('/logout', (req, res) => {
  return res.render('login');
})






module.exports = router;