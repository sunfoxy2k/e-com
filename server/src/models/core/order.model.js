export function createOrderModel(mongoose) {
  const orderSchema = mongoose.Schema(
    {
      OrderContent: {
        itemList: {
          type: [{
            _id: false,
            ProductId: { type: String },
            ProductName: { type: String },
            Quantity: { type: Number },
          }],
          default: []
        },
        TotalPrice: { type: Number, default: 0 },
      },
      ClientId: { type: String, index: true, default: "" },
      CustomerName: { type: String, default: "" },
      RecipientName: { type: String, default: "" },
      Address: { type: String, default: "" },
      ContactNumber: { type: String, default: "" },
      OrderDate: { type: Date, default: Date.now() },
      OrderStatus: {
        type: String,
        enum: ["Processing", "Packaging", "Delivering", "Complete"],
        default: "Processing",
      },
      PaymentInfo: {
        deliveryFee: { type: Number, default: 0 },
        status: {
          type: Boolean,
          default: false,
        },
        info: {
          type: String,
          default: "",
        }
      },
    }
  );

  return mongoose.model('order', orderSchema, 'Order')
}