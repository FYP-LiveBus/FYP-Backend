const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
mongoose.set('useCreateIndex', true);

let Locationlaunching = new Schema({
    location_name:{
        type: Schema.Types.Mixed,
        ref: "Location",
        default: null
    },
    location:{
        type:String,
        default:null
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
autoIncrement.initialize(mongoose.connection);
Locationlaunching.plugin(autoIncrement.plugin, {
    model: 'Locationlaunching',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});
export default mongoose.model("Locationlaunching", Locationlaunching);
