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
  status: {
    type: String,
    enum: ['processing', 'successful'],
    default: 'processing'
  }
});

module.exports = mongoose.model('Payment', paymentModel);
