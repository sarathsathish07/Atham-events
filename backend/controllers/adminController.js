import asyncHandler from "express-async-handler";
import generateAdminToken from "../utils/generateAdminToken.js";
import Category from "../models/categorySchema.js";
import Item from "../models/itemsSchema.js";
import Selection from "../models/selectionSchema.js";
import mongoose from "mongoose";
import PDFDocument from "pdfkit";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


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
  
  const { name, categoryId,amount } = req.body;

  const existingCategory = await Category.findById(categoryId);
  if (!existingCategory) {
      return res.status(400).json({ message: "Invalid category" });
  }

  try {
      const newItem = new Item({
          itemName:name,
          amount:amount,
          category:categoryId,
      });

      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
  } catch (error) {
      res.status(500).json({ message: "Failed to add item", error: error.message });
  }

})
const getAllSelections = async (req, res) => {
  try {
      const selections = await Selection.find({});
      res.status(200).json(selections);
  } catch (error) {
      res.status(500).json({ message: "Failed to fetch selections", error: error.message });
  }
};

const getSelectionById = async (req, res) => {
  const { id } = req.params;
  try {
      const selection = await Selection.findById(id);
      if (!selection) {
          return res.status(404).json({ message: "Selection not found" });
      }
      res.status(200).json(selection);
  } catch (error) {
      res.status(500).json({ message: "Failed to fetch selection", error: error.message });
  }
};

const downloadSelectionPDF = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const selection = await Selection.findById(id);
    if (!selection) {
      return res.status(404).json({ message: "Selection not found" });
    }

    const { name, phone, email, selections } = selection;

    const doc = new PDFDocument({ autoFirstPage: false });
    const logoPath = path.resolve('backend/public/Atham_Logo2.png');

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${name}_selections.pdf`);

    doc.pipe(res);

    const addPageWithWatermark = () => {
      doc.addPage();
      const { width, height } = doc.page;
      doc.image(logoPath, width / 2 - 100, height / 2 - 100, { width: 200, opacity: 0.8 });
    };

    addPageWithWatermark();

    doc.fontSize(14).text(`Client Name: ${name}`, 50, 50);
    doc.text(`Phone: ${phone}`, 50, 70);
    doc.text(`Email: ${email}`, 50, 90);
    doc.moveDown(2);

    selections.forEach((item, index) => {
      if (doc.y > doc.page.height - 100) {
        addPageWithWatermark();
      }
      doc.fontSize(12).text(`${index + 1}. ${item.category}`);
      item.items.forEach((subItem) => {
        doc.fontSize(10).text(`    • ${subItem.itemName} (Quantity: ${subItem.quantity})`);
      });
      doc.moveDown(1);
    });

    doc.end();
  } catch (error) {
    console.error("Error generating PDF:", error.message);
  }
};











export { authAdmin, logoutAdmin,getCategories,addCategories,addItems,getAllSelections,getSelectionById,downloadSelectionPDF};