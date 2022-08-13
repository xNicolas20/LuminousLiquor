import mongoose from "mongoose";

const messagesSchema = mongoose.Schema({
    conversationId: {
        type: String,
      },
      sender: {
        type: String,
      },
      text: {
        type: String,
      },
    },
    { timestamps: true }
);

export default mongoose.model("Message", messagesSchema);