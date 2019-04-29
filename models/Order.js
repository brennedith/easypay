const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const orderSchema = new Schema({
  owner: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      type: ObjectId,
      ref: 'Product'
    }
  ],
  productsQty: [Number], // TODO: Find a better approach
  price: {
    type: Number,
    default: 0
  },
  payments: [Number],
  complete: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Order', orderSchema);
