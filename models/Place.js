const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const placeSchema = new Schema(
  {
    owner: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['Restaurant']
    },
    location: {
      address: {
        type: String,
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    orders: [
      {
        type: Object,
        ref: 'Order'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Place', placeSchema);
