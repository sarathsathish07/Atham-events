import expressAsyncHandler from "express-async-handler"
import Category from "../models/categorySchema.js";
import Item from "../models/itemsSchema.js";
import Selection from "../models/selectionSchema.js";

const getCategory = expressAsyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
} catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error: error.message });
}
});
const getItemsByCategory = expressAsyncHandler(async (req, res) => {
  try {
    const items = await Item.find({ category: req.params.categoryId });
    res.json(items);
} catch (error) {
    res.status(500).json({ message: "Failed to fetch items", error: error.message });
}
});
const saveSelection  = expressAsyncHandler(async (req, res) => {
  const { name, phone, email, selections } = req.body;

  try {
    const newSelection = await Selection.create({
      name,
      phone,
      email,
      selections,
    });
    res.status(201).json(newSelection);
  } catch (error) {
    res.status(500).json({ message: 'Error saving selection', error });
  }
});


export {
  getCategory,
  getItemsByCategory,
  saveSelection 
}