// user schema

const mongoose = require("mongoose");


const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,'유효한 이메일이 아닙니다'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: [true,'비밀번호를 입력하세요'],
  //   validate: {
  //     validator: function(v) {
  //         var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //         return (v == null) || regex.test(v)
  //     },
  //     message: '올바른 패스워드 형식이 아닙니다'
  // }
  },
  salt: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  loginCnt: {
    type: Number,
    default: 0
  },
  lockYn: {
    type: Boolean,
    default: false
  },
  dateOfBirth: {
      type: Date,
      required: true
  },
  address: {
    type: [String],
    required: true
  },
  role: {
    type: Number,
    default: 0
    }
  });

// var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/; // 2-1
// var passwordRegexErrorMessage = '8자 이상이어야 하고, 숫자와 문자를 혼용해야 합니다'; // 2-2
// userSchema.path('password').validate(function(v) {
//   var user = this;

//   if(!passwordRegex.test(user.password)){ // 2-3
//       user.invalidate('password', passwordRegexErrorMessage); // 2-4
//   }

// });

module.exports = mongoose.model("User", userSchema);






