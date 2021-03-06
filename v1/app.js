var express = require("express");
var app = express();
// npm install body-parser --save then incude the body parser
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine", "ejs");

 var campgrounds =[
            {name:"cali", image:"https://www.reservecalifornia.com/CaliforniaWebHome/themes/California/simple_banner.jpg"},
             {name:"texas", image:"http://cdn0.wideopencountry.com/wp-content/uploads/2017/10/Camp-793x526.jpg"},
              {name:"new york", image:"http://www.woodstreamcampsite.com/images/uploads/tents.jpg"}
            ];

app.get("/", function(req,res){
   res.render("landing"); 
});

app.get("/campgrounds", function(req,res){
       
     res.render("campgrounds",{campgrounds:campgrounds});
});

app.post("/campgrounds", function(req,res){
   
    //get data from form and add to campground array
   var name =  req.body.name;
   var image= req.body.image;
   var newCampground = {name:name, image:image};
   campgrounds.push(newCampground);
    //redirect back to campground page
    res.redirect("/campgrounds")
});

// this to show the form that send the data to the post
app.get("/campgrounds/new", function(req,res){
    res.render("new.ejs");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The yelp camp started");
    
});