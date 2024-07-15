const express = require("express");
const mongoose =require("mongoose")


const cors = require("cors");
require("dotenv").config();


const UserRoute=require("./Routes/UserRoute")
const ProductRoute=require("./Routes/ProductRoute")

const app = express();

app.use(cors());
app.use(express.json());


const mongoUri = `mongodb+srv://venkateshyeduvaka38:ZzfT3uyyCs6aWFUa@syoft-node.mb1qrhq.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(mongoUri)
.then(()=>{console.log("CONNECTION SUCCESSFULLY")})
.catch((error)=>{console.log("venky--->",error)})


app.use('/user', UserRoute);
app.use("/product",ProductRoute)


app.listen(5003,()=>{
    console.log("server is running")
})