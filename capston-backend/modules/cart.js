import mongoose from "mongoose"

const cartSchema = new mongoose.Schema ({
    prodId: {
        type: String,
        required: true,
     },
     userId: {
         type: String,
        required: true,
     },
     name: {
         type: String,
        required: false,
     },
     description: {
         type: String,
        required: false,
     },
     price: {
         type: Number,
        required: false,
     },
     sale: {
         type: Number,
        required: false,
     },
     size: {
         type: Number,
        required: false,
     },
     stock: {
         type: Boolean,
        required: false,
     },
     quantites: {
         type: Number,
        required: false,
     },

     subTotal: {
        type: Number,
       required: false,
    },
});


// const Capstone = mongoose.model("Capo", cartSchema, "myCart")
// module.exports = Capstone;

export default mongoose.model("cart", cartSchema);