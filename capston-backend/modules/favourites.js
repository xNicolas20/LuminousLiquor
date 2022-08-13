import mongoose from "mongoose"

const favouritesSchema = new mongoose.Schema ({
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
});



// const Capstone1 = mongoose.model("Capstone", favouritesSchema, "favourites")
// module.exports = Capstone1;

export default mongoose.model("favourites", favouritesSchema);