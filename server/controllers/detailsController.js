const Tours = require('../models/Tours');
const mongoose = require('mongoose');


// exports.showDetails = async (req, res) => {
//     try {
//         const pipeline = [
//             {
//                 $unwind: '$startDates'
//             },
//             {
//                 $project: {
//                     description: {$substrCP: ['$description', 0, 1000]},
//                     name: {$substr: ['$name', 0, 30]},
//                     imgUrl: 1,
//                     maxGroupSize: 1,
//                     difficulty: 1,
//                     location: 1,
//                     startDates: {
//                         $dateToString: {
//                             date: "$startDates",
//                             format: "%d-%m-%Y"
//                         }
//                     }
//                 }
//             },
//         ];
//         const details = await Tours.aggregate(pipeline);
//         res.render('show-details', {
//             details,
//             layout: '../views/layouts/details'
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };
//
