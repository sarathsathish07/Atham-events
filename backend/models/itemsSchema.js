import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", 
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
