const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customer_name: { type: String, trim: true },
    customer_mobNo: { type: String, trim: true },
    table_no: { type: Number, trim: true },
    waiter_name: { type: String, trim: true },
    items: [
      {
        item_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Items',
        },
        order_type: {
          type: String,
          enum: ['dinein', 'takeaway'],
          default: 'dinein',
        },
        item_name: { type: String, trim: true },
        item_price: { type: String, trim: true },
        qty: { type: Number, trim: true },
        parcelQty: { type: Number, trim: true },
        item_status: {
          type: String,
          enum: ['Processing', 'Cooking', 'Ready'],
          default: 'Processing',
        },
      },
    ],
    total_bill: { type: Number },
    final_bill: { type: Number }, //After deiscount
    is_completed: { type: Boolean, default: false },
    cooking_status: {
      type: String,
      enum: ['Processing', 'Cooking', 'Ready'],
      default: 'Processing',
    },
    order_status: {
      type: String,
      enum: ['running', 'closed'],
      default: 'running',
    },

    payment_method: {
      type: String,
      enum: ['cash', 'digital', 'none'],
      default: 'none',
    },

    remarks: { type: String },
  },
  { timestamps: true }
);

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;
