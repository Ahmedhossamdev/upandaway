const express = require('express');
const router = express.Router();
const {frontPage , contactUs , services , gallary , showBook} = require('../controllers/mainController');


router.get('/' , frontPage);
router.get('/contact-us' , contactUs);
router.get('/services' , services);
router.get('/gallery' , gallary);
router.get('/book.html');
router.get('/credit.html');


module.exports = router;