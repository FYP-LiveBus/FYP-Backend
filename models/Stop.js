const mongoose = require("mongoose");

const stopSchema = new mongoose.Schema({
    stopNo: {
        type: Number,
    },
    stopName: {
        type: String,
        default: null
    },
    latitude: {
        type: Decimal128,
        default: 0
    },
    longitude: {
        type: Decimal128,
        default: 0
    },
    status: {
        type: String,
        default: 'In-Active',
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


const Stop = mongoose.model('Stop', stopSchema); 

exports.Stop = Stop; 
exports.stopSchema = stopSchema;