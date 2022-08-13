import mongoose from "mongoose";

const convoSchema = mongoose.Schema({
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("conversation", convoSchema);