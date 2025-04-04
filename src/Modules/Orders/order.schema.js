const { z } = require('zod');

const createOrderValidation = z.object({
  shippingAddress: z.object({
    name: z.string()
      .trim()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(100, { message: "Name cannot exceed 100 characters" })
      .optional(),
    
    address: z.string()
      .trim()
      .min(3, { message: "Address must be at least 3 characters long" })
      .max(250, { message: "Address cannot exceed 250 characters" })
      .optional(),
    
    phone: z.string()
      .trim()
      .regex(/^[0-9]{10,15}$/, "Invalid phone number")
      .optional()
  }).optional(),
  
  products: z.array(
    z.object({
      productId: z.string()
        .trim()
        .min(1, { message: "Product ID cannot be empty" }),
      
      quantity: z.number()
        .int()
        .min(1, { message: "Quantity must be at least 1" })
        .max(100, { message: "Quantity cannot exceed 100" })
    })
  ).min(1, { message: "At least one product is required" }),
  
  paymentMethod: z.enum(["Credit Card", "Cash on Delivery"])
    .default("Cash on Delivery")
});


module.exports = {
  createOrderValidation,
};