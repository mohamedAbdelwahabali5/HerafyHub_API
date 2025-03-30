const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingAddress: {
      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["In-Progress", "Confirmed", "Processing", "Shipping", "Out for Delivery", "Delivered", "Cancelled"],
      default: "In-Progress",
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card","Cash on Delivery"],
      required: true,
      default: "Cash on Delivery"
    },
    IsCancelled: {
      type: Boolean,
      default: false,
    }
  },
  { 
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

// Virtual to populate order items
orderSchema.virtual('orderItems', {
  ref: 'OrderItem',
  localField: '_id',
  foreignField: 'order'
});

module.exports = mongoose.model("Order", orderSchema);
