import mongoose from "mongoose"


const productInfo = new mongoose.Schema ({
    prodId: {
       type: Number,
       required: true,
    },
    name: {
        type: String,
       required: true,
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
    quantities: {
        type: Number,
       required:false,
    },
    category: {
        type: String,
        required: false,
    },
    image:{
        type: String,
        required: false,
    },
    recent:{
        type: Boolean,
        required: false,

    }

});

export default mongoose.model("productInfo" , productInfo);

