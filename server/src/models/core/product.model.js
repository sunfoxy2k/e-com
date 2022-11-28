export function createProductModel(mongoose) {
    const Product = mongoose.model(
        "product",
        mongoose.Schema(
            {
                name: { type: String, required: [true, "Why no name"], index: true},
                price: { type: Number, required: true},
                stock: { type: Number, required: true, min: 0, default: 0},
                ingredients: { type: String, required: true, default: "salmon" },
                quantity: { type: Number, required: true, min: 0, default: 0 },
                image: { type: String, required: true, default: "black.png" },
                disable: {type: Boolean, required: true, default: false},
            }//,{ timestamps: true }
        ), 'Products'
    );

    return Product;
};
