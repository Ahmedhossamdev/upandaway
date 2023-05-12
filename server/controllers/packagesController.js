const Tours = require('../models/Tours');
const mongoose = require('mongoose');

/* Get Tours */
exports.Tours = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the current page from query parameter, default to 1
        const limit = 6; // Number of cards per page
        const startIndex = (page - 1) * limit; // Calculate the starting index for the current page

        const pipeline = [
            { $sort: { updatedAt: -1 } },
            { $unwind: '$startDates' },
            {
                $project: {
                    _id: 1,
                    duration: 1,
                    rating: 1,
                    description: { $substrCP: ['$description', 0, 200] },
                    name: { $substr: ['$name', 0, 30] },
                    imgUrl: 1,
                    maxGroupSize: 1,
                    price: 1,
                    difficulty: 1,
                    location: 1,
                    startDates: {
                        $dateToString: {
                            date: '$startDates',
                            format: '%d-%m-%Y'
                        }
                    }
                }
            },
            { $skip: startIndex }, // Skip documents based on the starting index
            { $limit: limit } // Limit the number of documents returned
        ];

        const tours = await Tours.aggregate(pipeline);
        const totalToursCount = await Tours.countDocuments(); // Total number of tours
        const totalPages = Math.ceil(totalToursCount / limit); // Calculate the total number of pages

        if (tours.length === 0) {
            res.render('packages/no-tours', {
                layout: '../views/layouts/index',
            });
        } else {
            res.render('packages/cards', {
                tours,
                currentPage: page,
                totalPages,
                layout: '../views/layouts/index',
            });
        }
    } catch (error) {
        console.log(error);
    }
};


exports.showDetails = async (req, res) => {
    try {
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID');
        }
        const pipeline = [
            {
                $match: {
                    _id: mongoose.Types.ObjectId(id)
                }
            },
            {
                $unwind: "$startDates"
            },
            {
                $project: {
                    description: {$substrCP: ["$description", 0, 1000]},
                    name: {$substr: ["$name", 0, 30]},
                    duration: 1,
                    imgUrl: 1,
                    maxGroupSize: 1,
                    difficulty: 1,
                    location: 1,
                    startDates: {
                        $dateToString: {
                            date: "$startDates",
                            format: "%d-%m-%Y"
                        }
                    }
                }
            }
        ];
        const tour = await Tours.aggregate(pipeline);
        res.render("show-details", {
            details: tour[0], // pass the first item in the array as "details" variable to the template
            layout: "../views/layouts/details"
        });
    } catch (error) {
        console.log(error);
    }
};


exports.search = async (req, res) => {
    try {
        const searchTerm = req.query.text;
        let tours;
        if (searchTerm) {
            tours = await Tours.aggregate([
                {
                    $match: {name: {$regex: searchTerm, $options: 'i'}}
                },
                {
                    $unwind: "$startDates"
                },
                {
                    $project: {
                        description: {$substrCP: ["$description", 0, 250]},
                        name: {$substr: ["$name", 0, 30]},
                        duration: 1,
                        imgUrl: 1,
                        maxGroupSize: 1,
                        difficulty: 1,
                        location: 1,
                        startDates: {
                            $dateToString: {
                                date: "$startDates",
                                format: "%d-%m-%Y"
                            }
                        }
                    }
                }
            ]);
        }
        if (tours.length === 0) {
            // No tours found matching the search term
            return res.render("no-results", {
                layout: '../views/layouts/index',
            });
        }
        res.render('packages/cards', {
            tours,
            layout: '../views/layouts/index',
        });
    } catch (error) {
        res.status(500).json({error: 'An error occurred'});
        alert: error.message
    }
};


