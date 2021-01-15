const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({

  name: { type: String, trim: true },
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  price: { type: Number },
  remarks: { type: String },

});

const Items = mongoose.model('Items', itemSchema);

module.exports = Items;