const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNo: { type: Number, trim: true, unique: true },
    lastDigit: { type: Number, trim: true, default: 10000 },
    discount: { type: Number, trim: true, default: 0 },
    beforeDis: { type: Number, trim: true },
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
      },
    ],
    total: { type: Number },
    customer: { type: String },
    customerMob: { type: String },
    remarks: { type: String },
  },
  {
    timestamps: true,
  }
);

const invoices = mongoose.model('invoices', invoiceSchema);

module.exports = invoices;
