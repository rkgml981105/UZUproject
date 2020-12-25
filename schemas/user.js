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
  // nickname: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
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

// virtuals // 2
userSchema.virtual('passwordConfirmation')
  .get(function(){ return this._passwordConfirmation; })
  .set(function(value){ this._passwordConfirmation=value; });

userSchema.virtual('originalPassword')
  .get(function(){ return this._originalPassword; })
  .set(function(value){ this._originalPassword=value; });

userSchema.virtual('currentPassword')
  .get(function(){ return this._currentPassword; })
  .set(function(value){ this._currentPassword=value; });

userSchema.virtual('newPassword')
  .get(function(){ return this._newPassword; })
  .set(function(value){ this._newPassword=value; });

// password validation // 
userSchema.path('password').validate(function(v) {
  var user = this; 

  // create user // 회원가입 단계
  if(user.isNew){ // password validation이 '회원가입' 단계인지, 아니면 '회원 정보 수정'단계인지
    if(!user.passwordConfirmation){
      user.invalidate('passwordConfirmation', 'Password Confirmation is required.');
    }

    if(user.password !== user.passwordConfirmation) {
      user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
    }
  }

  // update user // 회원 정보 수정 단계
  if(!user.isNew){
    if(!user.currentPassword){ //current password값이 없는 경우
      user.invalidate('currentPassword', 'Current Password is required!');
    }
    else if(user.currentPassword != user.originalPassword){ //current password값이 original password값과 다른 경우
      user.invalidate('currentPassword', 'Current Password is invalid!');
    }

    if(user.newPassword !== user.passwordConfirmation) {  //new password값과 password confirmation값이 다른 경우
      user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
    }
  }
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