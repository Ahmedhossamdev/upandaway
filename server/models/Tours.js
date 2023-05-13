const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToursSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        trim: true,
        maxlength: [40, 'A tour name must have less or equal then 40 characters'],
        minlength: [10, 'A tour name must have more or equal then 10 characters'],
    },
    location: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is either: easy, medium, difficult',
        },
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [200, 'A tour name must have more or equal then 200 characters'],
    },
    price: {
        type: Number,
    },
    discount: {
        type: Number,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size'],
    },
    startDates: {
        type: [Date],
        required: true,
    },
    duration:{
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Arrived', 'Pending', 'Returned', 'In Progress'],
        default: 'Pending'
    }
 });

//{
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }


// ToursSchema.virtual('formattedStartDates').get(function() {
//     return this.startDates.map(date =>
//         new Intl.DateTimeFormat('en-US', {
//             month: 'short',
//             day: '2-digit',
//             year: 'numeric'
//         }).format(date)
//     );
// });

module.exports = mongoose.model('Tours', ToursSchema);
