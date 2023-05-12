const express = require('express');
const router = express.Router();
const {

    Tours,
    showDetails,
    search,


 } = require('../controllers/packagesController');
const {

} = require('../controllers/detailsController');
// TODO , IS LOGGED IN ?
router.get('/packages', Tours);
//router.get('/details' , Tours);
router.get('/details/:id', showDetails);
router.get('/results', search );

module.exports = router;