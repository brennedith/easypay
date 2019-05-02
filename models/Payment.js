const mongoose = require('mongoose');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const paymentModel = new Schema({
  tap: {
    type: Number,
    required: true
  },
  products: [
    {
      type: ObjectId,
      ref: 'Product'
    }
  ],
  amount: {
    type: Number,
    required: true
  },
  complete: {
    type: Boolean,
    default: false
  },
  orderId: String
});

module.exports = mongoose.model('Payment', paymentModel);
