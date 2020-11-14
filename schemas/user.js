// user schema

const mongoose = require("mongoose");

const { Schema } = mongoose;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
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
    required: true
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
      default: Date.now,
      required: true
  },
  role: {
    type: Number,
    default: 0
    },
});

module.exports = mongoose.model("User", userSchema);



// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// const userSchema = mongoose.Schema({
//     name: {
//         type: String,
//         maxlength: 50,
//     },
//     email: {
//         type: String,
//         trim: true, //rkgml 981105 @gmail.com을 rkgml981105@gmail.com으로 trim
//         unique: 1,
//     },
//     password: {
//         type: String,
//         validate:[
//             function(password){
//              return password&&password.length>6;
//             },'비밀번호를 입력하거나 길이가 6보다커야합니다.'
//         ]
//     },
//     role: {
//         type: Number,
//         default: 0,
//     },
//     image: String,
//     token: String,
//     tokenExp: Number,
// });

// //save 메소드가 실행되기 전에 비밀번호를 암호화하는 로직을 짜야함
// userSchema.pre("save", function(next){
//     let user = this;
   
//     //model 안의 password가 변환될때만 암호화
//     if (user.isModified("password")){
//         bcrypt.genSalt(saltRounds,function(err,salt){
//             if (err) return next(err);
//             bcrypt.hash(user.password,salt,function(er,hash){
//                 if (err) return next(err);
//                 user.password=hash;
//                 next();
//             });
//         });
//     } else {
//         next();
//     }
// });

// const User = mongoose.model("User", userSchema);

// module.exports = { User };