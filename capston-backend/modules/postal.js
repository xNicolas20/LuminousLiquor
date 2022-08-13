import mongoose from "mongoose"

const postalSchema = new mongoose.Schema ({
    postal: {
       type: String,
       required: true,
    },

    time: {
        type: String,
        required: true,
     },

   
});



// const Capstone1 = mongoose.model("Capstone", favouritesSchema, "favourites")
// module.exports = Capstone1;

export default mongoose.model("postals", postalSchema);