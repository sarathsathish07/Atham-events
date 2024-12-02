import mongoose from 'mongoose';

const selectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  selections: [
    {
      category: { type: String, required: true },
      items: [{ type: String, required: true }]
    }
  ],
}, {
  timestamps: true,
});

const Selection = mongoose.model('Selection', selectionSchema);

export default Selection;
