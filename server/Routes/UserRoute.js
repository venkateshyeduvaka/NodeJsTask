const express=require("express")

const {userRegister,userLogIn}=require("../Contollers/UserController")

const router=express.Router()

router.post("/register",userRegister)
router.post("/login",userLogIn)



module.exports=router