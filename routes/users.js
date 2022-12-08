const router = require("express").Router();
const User = require("../Models/Users");
const CryptoJS = require("crypto-js");
const verify = require("../middlewares/verifyToken");
const Users = require("../Models/Users");
//update

router.put("/:id",verify,async(req,res,next)=>{
   // const id = req.params.id;
if(req.user.id === req.params.id ||req.user.isAdmin ){
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.Secret_Key).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },
        { new: true}
        );
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
}else{
        res.status(403).json("you are no authenticated")
}
})
//delete

router.delete("/:id",verify,async(req,res,next)=>{
    // const id = req.params.id;
 if(req.user.id === req.params.id ||req.user.isAdmin ){
     try {
         await User.findByIdAndDelete(req.params.id
         );
         res.status(200).json("user has been deleted")
     } catch (error) {
         res.status(500).json(error)
     }
 }else{
         res.status(403).json("you are no authenticated")
 }
 })
//get

router.get("/find/:id",async(req,res,next)=>{
    // const id = req.params.id;
     try {
        const user = await User.findById(req.params.id);
        const {password, ...info} = user._doc;
         res.status(200).json(info);
     } catch (error) {
         res.status(500).json(error)
     }
 });
//getall//get last 5 users

router.get("/",verify,async(req,res,next)=>{
    // const id = req.params.id;
    const query =req.query.new;
 if(req.user.isAdmin ){
     try {
        const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
         res.status(200).json(users)
     } catch (error) {
         res.status(500).json(error)
     }
 }else{
         res.status(403).json("you are not allowed to see all users")
 }
 })

// get user stats
router.get("/stats",async(req,res)=> {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);

    try {
        const data = await User.aggregate([
          {
            $project:{
                month: {$month:"$createdAt"}
            }
          },{
            $group:{
                _id: "$month",
                total:{$sum:1}
            }
          }

        ])
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }

})

module.exports = router;