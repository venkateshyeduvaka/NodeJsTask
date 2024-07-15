const mongoose=require("mongoose")

const {Schema}=mongoose




const UserSchema=mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    cart:[{type:mongoose.Schema.Types.ObjectId,ref:"Products"}]
},

{timestamps: true}
)

const UserModel=mongoose.model("Profiles",UserSchema)

module.exports=UserModel