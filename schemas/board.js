const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId }
} = Schema;
const boardSchema = new Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user"
  },
  title: {
    type: String,
    required: [true,'제목을 입력해주세요.']
  },
  content: {
    type: String,
    required: [true,'내용을 입력해주세요.']
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

module.exports = mongoose.model("Board", boardSchema);
