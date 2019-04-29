const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const productSchema = new Schema(
  {
    owner: {
      type: ObjectId,
      ref: 'Place',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: String,
    photoURL: String,
    price: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
