const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const board_longSchema = new Schema({
  // writer: {
  //   type: ObjectId,
  //   required: true,
  //   ref: "User"
  // },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imgPath: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  clickCnt: {
      type: Number,
      default: 0
  },
  likeCnt: {
      type: Number,
      default: 0
  },
  tags: {
      type: String
  }
});

module.exports = mongoose.model("Board_long", board_longSchema);
