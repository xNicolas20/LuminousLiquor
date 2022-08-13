import mongoose from "mongoose"

const orderSchema = new mongoose.Schema ({
    userId: {
        type: String,
       required: true,
    },
    name: {
        type: String,
       required: false,
    },
   amount: {
       type: Number,
       required: true,
   },

   address: {
    type: String,
    required: false,
   },
   
   postal:{
       type: String,
   }

});



// const Capstone1 = mongoose.model("Capstone", favouritesSchema, "favourites")
// module.exports = Capstone1;

export default mongoose.model("order", orderSchema);