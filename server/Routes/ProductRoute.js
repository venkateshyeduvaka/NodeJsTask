const express=require("express")

const {CreateProduct,DeleteProduct,UpdateProduct,GetSpecificProduct,GetAllProducts}=require("../Contollers/ProductController")

const CreateandDeleteMiddleware =require("../Middleware/CreateDeleteProduct")
const GetandUpdateMiddleware=require("../Middleware/GetUpdateProducts")

const router=express.Router()

router.post("/create",CreateandDeleteMiddleware,CreateProduct)
router.put("/update/:id",GetandUpdateMiddleware,UpdateProduct)
router.delete("/delete/:id",CreateandDeleteMiddleware,DeleteProduct)

router.get("/:id",GetSpecificProduct)
router.get("/",GetandUpdateMiddleware,GetAllProducts)



module.exports=router