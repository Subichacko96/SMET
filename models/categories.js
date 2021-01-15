const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, trim: true },
  remarks: { type: String, trim: true },
  items: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Items',
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
