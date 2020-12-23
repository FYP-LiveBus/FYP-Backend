const mongoose = require("mongoose");
// var autoIncrement = require('mongoose-auto-increment');
// mongoose.set('useCreateIndex', true);

const locationSchema = new mongoose.Schema({
    location_no: {
        type: Number,
    },
    location_name: {
        type: String,
        default: null
    },
    latitude: {
        type: mongoose.Decimal128,
        default: 0
    },
    longitude: {
        type: mongoose.Decimal128,
        default: 0
    },
    routeNo: {
        type: Number,
    },
    status: {
        type: String,
        default: 'Active',
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


const Location = mongoose.model('Location', locationSchema); 
// autoIncrement.initialize(mongoose.connection);
// Location.plugin(autoIncrement.plugin, {
//     model: 'Location',
//     field: '_id',
//     startAt: 1,
//     incrementBy: 1
// });


exports.Location = Location; 
exports.locationSchema = locationSchema;