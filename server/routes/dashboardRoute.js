const express = require('express');
const router = express.Router();
const {
    dashboardMain,
    getDashboardTours,
    editDashboardTour,
    updateDashboardTour,
    deleteDashboardTour,
    AddTour,
    AddTourSubmit,
    getDashboardProfile,

} = require('../controllers/dashboardController');

const checkAdminRole = require('../middleware/checkAuth');
const {search} = require("../controllers/packagesController");


// GET /dashboard-MAIN
router.get('/dashboard', checkAdminRole, dashboardMain);
router.get('/dashboard/tours', checkAdminRole, getDashboardTours);
router.get('/edit/:id', checkAdminRole, editDashboardTour);
router.post('/edit/:id', checkAdminRole, updateDashboardTour);
router.post('/delete/:id', checkAdminRole, deleteDashboardTour);
router.get('/add-card' , AddTour);
router.get('/profile' , checkAdminRole , getDashboardProfile);
router.post('/add-card', AddTourSubmit);


module.exports = router;