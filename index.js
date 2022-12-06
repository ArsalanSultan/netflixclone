const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const authRoute= require("./routes/auth")
const userRoute = require("./routes/users"); 
const movieRoute = require("./routes/movie");
const listRoute = require("./routes/list");  

dotenv.config();

app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/movies",movieRoute);
app.use("/api/lists",listRoute);
     



mongoose.connect(process.env.MONGO_URL).then(()=>console.log("Connected to DB")).then(()=>{
    app.listen(8800, () => {
        console.log("Backend server is running!");
    });
}).catch((err)=>console.log(err));






//   8VdAx!-FLwrEH5W