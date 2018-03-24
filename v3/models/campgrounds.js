var mongoose = require("mongoose")
// scheme setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
        ]
});

var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;