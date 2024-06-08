const productModel = require("../models/ProductModel");

exports.AddProduct = async (req, res) => {
  try {
    const { name, product_code } = req.body;
  
    
    // Check if required fields are provided
    if (!name || !product_code) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Check if file is provided
    if (!req.file) {
      return res.status(400).json({ message: "Please provide an image" });
    }

    // // Get the file path of the uploaded image
    const image = req.file.path;
    // console.log(req.file,".............................");
    
    // Create a new product instance with image path
    const newProduct = new productModel({
      name,
      product_code,
      image: image // Assuming 'image' is the field name for image in the product model
    });

    // Save the product to the database
    const product = await newProduct.save();

    // Respond with success message and added product details
    res.status(200).json({ message: "Product added successfully", product });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, product_code } = req.body;

    // Check if required fields are provided
    if (!name || !product_code) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Find the product by ID and update its fields
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      { name, product_code },
      { new: true } // To return the updated product
    );

    // Check if the product exists
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Respond with success message and updated product details
    res
      .status(200)
      .json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product by ID and delete it
    const deletedProduct = await productModel.findByIdAndDelete(id);

    // Check if the product exists
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Respond with success message and deleted product details
    res
      .status(200)
      .json({
        message: "Product deleted successfully",
        product: deletedProduct,
      });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await productModel.find();

    // Check if any products were found
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Respond with success message and the list of products
    res.status(200).json({ message: "Products found", products });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
