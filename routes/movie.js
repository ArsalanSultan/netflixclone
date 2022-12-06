const router = require("express").Router();
const Movie = require("../Models/Movie");
const verify = require("../middlewares/verifyToken");

//create new movie 

router.post("/",verify,async(req,res,next)=>{
   // const id = req.params.id;
if(req.user.isAdmin ){
    const newMovie = new Movie(req.body);
    try {
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie)
    } catch (error) {
        res.status(500).json(error);
    }
    
}else{
        res.status(403).json("you are not allowed to add a movie")
}
});

//update the movie

router.put("/:id",verify,async(req,res,next)=>{
    // const id = req.params.id;
 if(req.user.isAdmin ){
     
     try {
         const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,{
            $set:req.body,  
         },{new:true});
         res.status(200).json(updatedMovie)
     } catch (error) {
         res.status(500).json(error);
     }
     
 }else{
         res.status(403).json("you are not allowed to update movies")
 }
 });


 //delete  movie
 router.delete("/:id",verify,async(req,res,next)=>{
    // const id = req.params.id;
 if(req.user.isAdmin ){
     
     try {
          await Movie.findByIdAndDelete( req.params.id);
         res.status(200).json( "movie deleted  ")
     } catch (error) {
         res.status(500).json(error);
     }
     
 }else{
         res.status(403).json("you are not allowed ")
 }
 });


 //get movie
 router.get("/find/:id",async(req,res,next)=>{
    // const id = req.params.id;
 
     
     try {
          const movie = await Movie.findById( req.params.id);
         res.status(200).json(movie)
     } catch (error) {
         res.status(500).json(error);
     }
 });

 // get random movie
 router.get("/random",async(req,res,next)=>{
    // const id = req.params.id;
    const type = req.query.type;
    let movie;
     try {
        if(type === "series"){
           movie = await Movie.aggregate([
            {$match:{isSeries:true}},
            {$sample:{size: 1}},
           ])
        }else{
            movie = await Movie.aggregate([
                {$match:{isSeries:false}},
                {$sample:{size: 1}},
               ])
        }
        res.status(200).json(movie)
     } catch (error) {
         res.status(500).json(error);
     }
 });

 //get all movies
 router.get("/",verify,async(req,res,next)=>{
    // const id = req.params.id;
    if(req.user.isAdmin){
     try {
          const movies = await Movie.find();
         res.status(200).json(movies.reverse())
     } catch (error) {
         res.status(500).json(error);
     }
    }else{
        res.status(403).json("you are not allowed")
    }
 });


module.exports = router;