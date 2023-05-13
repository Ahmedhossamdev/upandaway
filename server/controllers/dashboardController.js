const Tours = require('../models/Tours');



/*
 GET /
 Home page
 */


function getStatusClass(status) {
    if (status === 'Arrived') {
        return 'delivered';
    }
    else if (status === 'Pending') {
        return 'pending';
    }
    else if (status === 'Returned') {
        return 'return';
    }
    else if (status === 'In Progress') {
        return 'inProgress';
    }
    else {
        return '';
    }
}

exports.dashboardMain = async (req, res) => {
    try {
        const userRole = req.user.role;
        if (userRole === 'admin') {
            const recentTours = await Tours.find().sort({createdAt: -1}).limit(8);
            res.render('admin-dashboard/home-dashboard', {
                layout: 'layouts/dashboardMain',
                recentTours: recentTours,
                getStatusClass: getStatusClass,
                user: req.user, // Pass the user object to the template
            });
        }
        else {
            res.send('This page is for admin only.');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};


exports.getDashboardTours = async (req, res) => {
    try {
        const pipeline = [
            {$sort: {updatedAt: -1}},
            {
                $unwind: '$startDates'
            },
            {
                $project: {
                    _id: 1,
                    duration: 1,
                    rating: 1,
                    description: {$substrCP: ['$description', 0, 100]},
                    name: {$substr: ['$name', 0, 30]},
                    imgUrl: 1,
                    maxGroupSize: 1,
                    price: 1,
                    difficulty: 1,
                    location: 1,
                    startDates: {
                        $dateToString: {
                            date: "$startDates",
                            format: "%d-%m-%Y"
                        }
                    }
                }
            },
        ];
        const tours = await Tours.aggregate(pipeline);
        if (tours.length === 0) {

        }
        else {
            res.render('admin-dashboard/cards-dashboard', {
                tours,
                layout: '../views/layouts/dashboard-tours-index'
            });
        }
    } catch (error) {
        console.log(error);
    }
}



exports.editDashboardTour = async (req, res) => {
    try {
        const tour = await Tours.findById(req.params.id);
        res.render('admin-dashboard/edit-tour', {
            tour,
            layout: '../views/layouts/dashboard'
        });
    }
    catch (error) {
        console.log(error);
        res.redirect('/dashboard'); // Redirect to the dashboard if an error occurs
    }
};



exports.updateDashboardTour =  async (req, res) => {
    try {
        const tour = await Tours.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.redirect('/dashboard/tours');
    }
    catch (error) {
        console.log(error);
        res.redirect('/dashboard'); // Redirect to the dashboard if an error occurs
    }
}




exports.deleteDashboardTour = async (req, res) => {
    try {
        const tour = await Tours.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard/tours');
    }
    catch (error) {
        console.log(error);
        res.redirect('/dashboard');
    }
};



exports.AddTour = async (req, res) => {
    res.render('add-card', {
        layout: '../views/layouts/dashboard'
    });
};

exports.AddTourSubmit = async (req, res) => {
    try {
        await Tours.create(req.body);
        res.redirect("/dashboard/tours");
    }
    catch (error) {
        console.log(error);
    }
};
/* Get Tours */

exports.getDashboardProfile = async (req, res) => {
    try {
        const user = req.user;
        res.render('admin-dashboard/profile', {
            user,
            layout: '../views/layouts/dashboard-tours-index',
        });
    } catch (error) {
        console.log(error);
    }
};
