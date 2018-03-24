var mongoose = require("mongoose"),
Campground = require("./models/campgrounds"),
Comment = require("./models/comment");


var data =[
    {name:"Cloud's Rest",
        image: "http://cdn.hiconsumption.com/wp-content/uploads/2015/09/Best-Four-Season-Tents-for-Winter-Camping.jpg",
        description:"blah blah blah"
    },
    
    {name:"Desert's mesa",
        image: "http://www.visitnc.com/contents/imgcrop/61803/1200/630/preview",
        description:"blah blah blah"},
    
    {name:"cannyon's floor",
        image: "http://www.readersdigest.ca/wp-content/uploads/2016/05/7-reasons-why-you-should-go-camping-this-summer.jpg",
        description:"blah blah blah"}
    ];


function seedDB(){
    // removes all campgrounds
    Campground.remove({}, function(err){
        if(err)
        {
            console.log(err)
        }
        else
        console.log("Remove campgrounds!")
          // add few campgrounds 
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log(err)
            }
            else{
                console.log("added a campgrounds");
                Comment.create({
                    text:"This place is great, but I wish there was internet",
                    author: "Homer"
                }, function(err,comment){
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                    campground.comments.push(comment);
                    campground.save();
                    console.log("created a new comment")
                    }
                });
            }
        })
        
    })
    });
  
    // add few comments
}

module.exports = seedDB;