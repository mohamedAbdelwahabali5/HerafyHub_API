const { z } = require("zod");

// Order schema validation
const orderSchemaValidation = z.object({
  user: z.string().min(1, "User ID is required."), // Ensuring a valid user ID
  products: z
    .array(
      z.object({
        product: z.string().min(1, "Product ID is required."),
        quantity: z
          .number()
          .min(1, "Quantity must be at least 1.")
          .max(100, "Quantity cannot exceed 100."),
      })
    )
    .nonempty("At least one product is required."),
  totalPrice: z
    .number()
    .min(0, "Total price cannot be negative.")
    .max(100000, "Total price exceeds the limit."),
  status: z.enum(["In-Progress", "delivered", "cancelled"], {
    errorMap: () => ({ message: "Invalid status value." }),
  }),
  paymentMethod: z.enum(
    ["Credit Card", "PayPal", "Cash on Delivery"],
    {
      errorMap: () => ({ message: "Invalid payment method." }),
    }
  ),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deliveredAt: z.date().nullable().optional(),
  cancelledAt: z.date().nullable().optional(),
  IsCancelled: z.boolean().default(false),
});

// Exporting the validation schema
module.exports = {
  orderSchemaValidation,
};
