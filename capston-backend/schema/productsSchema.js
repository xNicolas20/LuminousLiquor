import mongoose from "mongoose"


const productSchema = mongoose.Schema({

    id: { type: Number, required: true},

    category: { type: String, required: true},

    name: { type: String, required: true},

    description: { type: String, required: true},

    stock: { type: Boolean, required: true},

    size: { type: Number, required: true},

    image: { type: String},

    prodId: { type: Number, required: true},

    quantities: { type: Number, required: true},

    price: { type: Number, required: true},

    recent: { type: Boolean}

})

export default mongoose.model("productinfos", productSchema);