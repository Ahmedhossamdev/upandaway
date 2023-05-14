const express = require('express');
const router = express.Router();
const {frontPage , contactUs , services , gallary , showBook, getChat} = require('../controllers/mainController');


router.get('/' , frontPage , getChat);
router.get('/contact-us' , contactUs);
router.get('/services' , services);
router.get('/gallery' , gallary);
router.get('/book.html');
router.get('/credit.html');


module.exports = router;