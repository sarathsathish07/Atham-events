import mongoose from 'mongoose';

const selectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  selections: [
    {
      category: { type: String, required: true },
      items: [
        {
          itemName: { type: String, required: true },
          quantity: { type: Number, required: true, default: 1 },
        }
      ]
    }
  ],
}, {
  timestamps: true,
});

const Selection = mongoose.model('Selection', selectionSchema);

export default Selection;
