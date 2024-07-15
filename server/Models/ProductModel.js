const mongoose=require("mongoose")

const {Schema}=mongoose

const ProductSchema=mongoose.Schema({
     title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      inventoryCount: {
        type: Number,
        required: true,
        default: 0,
      },
      userid:{ type: mongoose.Schema.Types.ObjectId, ref: 'Profiles'}
},

{timestamps: true}

)

const ProductModel=mongoose.model("Products",ProductSchema)

module.exports=ProductModel