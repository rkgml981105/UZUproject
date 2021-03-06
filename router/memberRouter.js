const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
var appDir = path.dirname(require.main.filename);

//회원가입 이메일 인증
router.post('/sendEmail', async (req, res) => {
  let user_email = req.body.email;
  let number = req.body.number;

  //ejs 렌더
  let emailTemplete;
  ejs.renderFile(appDir+'/views/emailtemplete.ejs', {code : number}, (err, data) => {
      if(err){console.log('ejs.renderFile err')};
      emailTemplete = data;
  });

  let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
      user : 'k2h0395@gmail.com',
      pass : 'dnjswjd2@'
    }
  });

  let mailOptions = {
    from : 'k2h0395@gmail.com',
    to : user_email,
    subject : 'UZU 회원가입 인증번호입니다.',
    html : emailTemplete
  };
  
  //메일 발송 함수
  transporter.sendMail(mailOptions, function(error, info){
    if (error){
      //emailvalidate.js으로 데이터 전달
      res.jsonp({success : false})
    }
    else {
      res.jsonp({success : true})
    }
  });
})


//회원가입
router.post("/register", async (req, res) => {
  try {
    let obj = { email: req.body.email };

    let user = await User.findOne(obj);
    console.log(user);

    if (user) {
      req.flash('user', req.body);
      res.json({
        message: "이메일이 중복되었습니다. 새로운 이메일을 입력해주세요.",
        dupYn: "1"
      });
    } else {
      crypto.randomBytes(64, (err, buf) => {
        if (err) {
          console.log(err);
          req.flash('user', req.body);
          // req.flash('errors', parseError(err));
          return res.redirect('register.ejs');
        } else {
          crypto.pbkdf2(
            req.body.password,
            buf.toString("base64"),
            100000,
            64,
            "sha512",
            async (err, key) => {
              if (err) {
                console.log(err);
              } else {
                console.log(key.toString("base64"));
                buf.toString("base64");
                obj = {
                  email: req.body.email,
                  name: req.body.name,
                  nickname: req.body.nickname,
                  dateOfBirth: req.body.dateOfBirth,
                  roadAddress: req.body.roadAddress,
                  password: key.toString("base64"),
                  salt: buf.toString("base64")
                };
                user = new User(obj);
                await user.save();
                res.render('register-success.ejs')
              }
            }
          );
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

  
// 로그인
router.post("/login", async (req, res) => {
  try {
    //이메일 값으로 아이디가 존재하는지 확인
    await User.findOne({ email: req.body.email }, async (err, user) => {
      if (err) {
        console.log(err);
      } else {
        console.log(user);
        if (user) {
          //아이디가 존재할 경우 이메일과 패스워드가 일치하는 회원이 있는지 확인
          console.log(req.body.password);
          console.log(user.salt);
          crypto.pbkdf2(
            req.body.password,
            user.salt,
            100000,
            64,
            "sha512",
            async (err, key) => {
              if (err) {
                console.log(err);
              } else {
                // console.log(key.toString('base64')); // 'dWhPkH6c4X1Y71A/DrAHhML3DyKQdEkUOIaSmYCI7xZkD5bLZhPF0dOSs2YZA/Y4B8XNfWd3DHIqR5234RtHzw=='

                const obj = {
                  email: req.body.email,
                  password: key.toString("base64")
                };

                const user2 = await User.findOne(obj);
                console.log(user2);
                if (user2) {
                  // 있으면 로그인 처리
                  console.log(req.body._id);
                  await User.updateOne(
                    {
                      email: req.body.email
                    },
                    { $set: { loginCnt: 0 } }
                  );
                  //세션설정
                  req.session.email = user.email;
                  req.session.nickname = user.nickname;
                  req.session._id = user._id;
                  res.redirect('/');
                } else {
                  //없으면 로그인 실패횟수 추가
                  if (user.loginCnt > 4) {
                    res.json({
                      message:
                        "아이디나 패스워드가 5회 이상 일치하지 않아 잠겼습니다.\n고객센터에 문의 바랍니다."
                    });
                  } else {
                    await User.updateOne(
                      {
                        email: req.body.email
                      },
                      { $set: { loginCnt: user.loginCnt + 1 } }
                    );
                    if (user.loginCnt >= 5) {
                      await User.updateOne(
                        {
                          email: req.body.email
                        },
                        { $set: { lockYn: true } }
                      );
                      res.json({
                        message:
                          "아이디나 패스워드가 5회 이상 일치하지 않아 잠겼습니다.\n고객센터에 문의 바랍니다."
                      });
                    } else {
                      res.render('login.ejs', {title: '비밀번호 조회', password: false});
                    }
                  }
                }
              }
            }
          );
        } else {
          res.render('login.ejs', {title: '비밀번호 조회', password: false});
        }
      }
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "로그인 실패" });
  }
});

router.get("/logout", (req, res) => {
  console.log("/logout" + req.sessionID);
  req.session.destroy(() => {
    res.redirect('/');
  });
});

router.post("/delete", async (req, res) => {
  try {
    await User.remove({
      _id: req.body._id
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/update", async (req, res) => {
  try {
    await User.update({
      _id: req.body._id,
      name: req.body.name
    });
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/add", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/getAllMember", async (req, res) => {
  try {
    const user = await User.find({});
    res.json({ message: user });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;

// functions
// function parseError(errors){
//   var parsed = {};
//   if(errors.name == 'ValidationError'){
//     for(var name in errors.errors){
//       var validationError = errors.errors[name];
//       parsed[name] = { message:validationError.message };
//     }
//   }
//   else {
//     parsed.unhandled = JSON.stringify(errors);
//   }
//   return parsed;
// }