import mongoose from "mongoose"


const productSchema = mongoose.Schema({
    id: { type: Number, required: true},
    category: { type: String, required: true},
    newPrice: { type: Number, required: true},
    oldPrice: { type: Number, required: false},
    name: { type: String, required: true},
    description: { type: String, required: true},
    availability: { type: String, required: true},
    size: { type: String, required: true},
    country: { type: String, required: true},
    image: { type: String, required: true},
    productId: {type: String, required: true}
})


// const Capstone1 = mongoose.model("Cap12", productSchema, "Product")
// module.exports = Capstone1;

// export default mongoose.model("productModel",productSchema);
