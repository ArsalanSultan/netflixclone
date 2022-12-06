const router = require("express").Router();
const List = require("../Models/List");
const verify = require("../middlewares/verifyToken");

//create new movie 

router.post("/",verify,async(req,res,next)=>{
   // const id = req.params.id;
if(req.user.isAdmin ){
    const newList = new List(req.body);
    try {
        const savedList = await newList.save();
        res.status(201).json(savedList)
    } catch (error) {
        res.status(500).json(error);
    }
    
}else{
        res.status(403).json("you are not allowed to add a movie")
}
});

// delete
router.delete("/:id",verify,async(req,res,next)=>{
    // const id = req.params.id;
 if(req.user.isAdmin ){
     try {
         await List.findByIdAndDelete(req.params.id);
         res.status(200).json("List is deleted")
     } catch (error) {
         res.status(500).json(error);
     }
     
 }else{
         res.status(403).json("you are not allowed to add a movie")
 }
 });


 // get lists
 router.get("/",verify,async(req,res,next)=>{
    // const id = req.params.id;
    const typeQuery=req.query.type;
    const genreQuery=req.query.genre;
    let list=[]
     try {
        if(typeQuery){
                if(genreQuery){
                    list = await List.aggregate([
                        {   $sample: {size:10}   },
                {  $match:{type:typeQuery, genre:genreQuery}},
            ])
                }else{
                    list = await List.aggregate([
                        {   $sample: {size:10}   },
                {  $match:{type:typeQuery }},
            ])
                }
        }else{
            list = await List.aggregate([{$sample:{size:10}}])
        }
         res.status(200).json(list)
     } catch (error) {
         res.status(500).json(error);
     }
     
 });

//get seriesORmovies
module.exports = router;