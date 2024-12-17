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
const saveSelection = async (req, res) => {
  const { name, phone, email, selections } = req.body;
  console.log("Selections Data:", selections);
  
  // Log the items inside the selections array to inspect their structure
  selections.forEach((selection, index) => {
    console.log(`Items in selection ${index + 1}:`, selection.items);
    selection.items.forEach(item => {
      console.log(`Item: ${item.itemName}, Quantity: ${item.quantity}`);
    });
  });

  try {
    const newSelection = new Selection({ name, phone, email, selections });
    const savedSelection = await newSelection.save();
    res.status(201).json(savedSelection);
  } catch (error) {
    res.status(400).json({ message: 'Error saving selection', error });
  }
};
const getAllItems = async (req, res) => {
  try {
    // Fetch all categories and populate their items
    const categoriesWithItems = await Category.find({})
      .lean() // Lean improves performance for reads
      .exec();

    // Attach items to each category
    const populatedCategories = await Promise.all(
      categoriesWithItems.map(async (category) => {
        const items = await Item.find({ category: category._id }).lean();
        return {
          categoryId: category._id,
          categoryName: category.name,
          items: items.map((item) => ({
            itemId: item._id,
            itemName: item.itemName,
            amount: item.amount,
          })),
        };
      })
    );

    res.status(200).json(populatedCategories);
  } catch (error) {
    console.error("Error fetching categories with items:", error);
    res.status(500).json({ message: "Server Error" });
  }
}



export {
  getCategory,
  getItemsByCategory,
  saveSelection ,
  getAllItems
}