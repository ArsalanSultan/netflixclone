const router = require("express").Router();
const User = require ("../Models/Users");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

//register
router.post("/register", async (req,res,next) =>{
    const newUser =new User ({
        
        username:  req.body.username,
        email:  req.body.email,
        // encrypting user password using our secret key(crypto-js library)
        password:  CryptoJS.AES.encrypt(req.body.password, process.env.Secret_Key).toString()
    });
    try {
    const user = await newUser.save();
    res.status(201).json(user);
} catch (error) {
        res.status(500).json(error)
}
});

//login

router.post("/login",async (req,res,next) =>{
    try {
        const user = await User.findOne({email: req.body.email})
        !user && res.status(401).json("wrong password or username!")

        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.Secret_Key);
        const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
         
        decryptedPassword !== req.body.password && res.status(401).json("wrong password or username");
           
           const accessToken=jwt.sign({id: user._id,isAdmin: user.isAdmin},process.env.Secret_Key,{expiresIn:"2d"});

        // do not send password as a response to the API 
        const { password, ...info } = user._doc;

        res.status(200).json({...info,accessToken});

    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;