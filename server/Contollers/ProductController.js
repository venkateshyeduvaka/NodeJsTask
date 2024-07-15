const ProductModel=require("../Models/ProductModel")


const CreateProduct=async(req,res)=>{
    try {
        const productData = new ProductModel(req.body);
        //console.log("data-->",productData)
        const saveProduct = await productData.save();
    
        res.status(200).json({
          message: "Product uploaded successfully",
          data: saveProduct,
          success: true,
          error: false,
        });
      } catch (err) {
        res.status(500).json({
          message: err.message || err,
          success: false,
          error: true,
        });
      }
}

const DeleteProduct=async(req,res)=>{
    try {
        const productId = req.params.id;
        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
    
        if (!deletedProduct) {
          return res.status(404).send('Product not found');
        }
    
        res.status(200).send('Product deleted successfully');
      } catch (err) {
        res.status(500).send('Server error');
      }
}

const UpdateProduct=async(req,res)=>{
    try {

    const productId = req.params.id
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, req.body,{ new: true });
    if (!updatedProduct) {
        throw new Error('Product not found');
    }
    res.status(200).json({
        message: "Product updated successfully",
        data: updatedProduct,
        success: true,
        error: false,
      });
        
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            success: false,
            error: true,
          });
    }
}

const GetSpecificProduct=async(req,res)=>{
    try {
        const productId  = req.params.id;
        const productDetails = await ProductModel.findById(productId);
        if (!productDetails) {
          throw Error("Something went wrong!");
        }
        res.json({
          message: "Product details fetched successfully",
          data: productDetails,
          success: true,
          error: false,
        });
      } catch (err) {
        res.status(500).json({
          message: err.message || err,
          success: false,
          error: true,
        });
      }
}

const GetAllProducts=async(req,res)=>{
    try {
        const allProducts = await ProductModel.find();
        if (!allProducts) {
          throw Error("Something went wrong!");
        }
        res.json({
          message: "Products fetched successfully",
          data: allProducts,
          success: true,
          error: false,
        });
      } catch (err) {
        res.status(500).json({
          message: err.message || err,
          success: false,
          error: true,
        });
      }
}


module.exports={CreateProduct,DeleteProduct,UpdateProduct,GetSpecificProduct,GetAllProducts}