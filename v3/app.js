var express = require("express");
var app = express();
// npm install body-parser --save then incude the body parser
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var seedDB = require("./seeds");

seedDB();

// to create a db
mongoose.connect("mongodb://localhost/yelp_camp_v3",{useMongoClient: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


/*Campground.create({
                    name:"new york", 
                    image:"http://www.woodstreamcampsite.com/images/uploads/tents.jpg",
                    description: "This is a beautiful"           
                }, function(err,Campground)
                {
                    if(err)
                    {
                        console.log(err);
                    }
                    else{
                        console.log(Campground);
                    }
                });*/
/* var campgrounds =[
            {name:"cali", image:"https://www.reservecalifornia.com/CaliforniaWebHome/themes/California/simple_banner.jpg"},
             {name:"texas", image:"http://cdn0.wideopencountry.com/wp-content/uploads/2017/10/Camp-793x526.jpg"},
              {name:"new york", image:"http://www.woodstreamcampsite.com/images/uploads/tents.jpg"}
            ];*/

app.get("/", function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req,res){
     // Get all the campground data from db
     Campground.find({}, function(err, allCampgrounds){
         if(err)
         {
             console.log(err);
         }
         else
         {
             res.render("index",{campgrounds:allCampgrounds});
         }
     }
     );
    // this is hardcoded- res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req,res){
   
    //get data from form and add to campground array
   var name =  req.body.name;
   var image= req.body.image;
   var desc = req.body.description;
   var newCampground = {name:name, image:image, description:desc};
   //we dont need this anymore-campgrounds.push(newCampground);
   //create a new campground to save to db
   Campground.create(newCampground, function(err,newlyCreated)
   {
       if(err)
       {
           console.log(err);
       }
       else{
           // if works fine, redirect back to campgrounds
           res.redirect("/campgrounds")
           
       }
   })
    //redirect back to campground page
    res.redirect("/campgrounds")
});

// this to show the form that send the data to the post
app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
    // find the campround with the provided id
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err)
        {
            console.log(err);
        }
        else{
            // render show tempelate with that campground
        res.render("show",{campground:foundCampground});
            
        }
    });
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The yelp camp started");
    
});