import asyncHandler from "express-async-handler";
import generateAdminToken from "../utils/generateAdminToken.js";
import Category from "../models/categorySchema.js";
import Item from "../models/itemsSchema.js";

const credentials = {
  email: "admin@gmail.com",
  password: "12345",
  _id: "61024896"
};

const authAdmin = asyncHandler(async (req, res) => {
  
  if ( req.body.email == credentials.email &&
    req.body.password == credentials.password) {
      console.log("token creation");
      const adminToken=generateAdminToken(res, credentials._id);
      res.status(201).json({
        _id: credentials._id,
        email: credentials.email,
      });
    }
   else {
    
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});


const logoutAdmin = asyncHandler(async (req, res) => {
  console.log("444");
  res.cookie("jwtAdmin", "", {
    httpOnly: true,
    expires: new Date(),
  });
  res.status(200).json({ message: "Admin logged out" });
});

const getCategories  = asyncHandler(async(req,res)=>{
  try {
    const categories = await Category.find({});
    res.json(categories);
} catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
}
})

const addCategories = asyncHandler(async(req,res)=>{
  const { name } = req.body;

  if (!name) {
      res.status(400).json({ message: "Category name is required" });
      return;
  }

  try {
      const category = new Category({ name });
      const createdCategory = await category.save();
      res.status(201).json(createdCategory);
  } catch (error) {
      res.status(500).json({ message: "Error creating category" });
  }
})
const addItems = asyncHandler(async(req,res)=>{
  console.log("1");
  
  const { name, categoryId } = req.body;

  const existingCategory = await Category.findById(categoryId);
  if (!existingCategory) {
      return res.status(400).json({ message: "Invalid category" });
  }

  try {
      const newItem = new Item({
          itemName:name,
        
          category:categoryId,
      });

      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
  } catch (error) {
      res.status(500).json({ message: "Failed to add item", error: error.message });
  }

})







export { authAdmin, logoutAdmin,getCategories,addCategories,addItems };