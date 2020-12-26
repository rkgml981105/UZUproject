let user_email = req.body.email;

  //메일 발송 함수
  let transporter = nodemailer.createTransport({
    service : 'gmail'
    , prot : 587
    , host : 'smtp.gmail.com'
    , secure : false
    , requireTLS : true
    , auth : {
        user : 'bje1703@gmail.com'
        , pass : 'b081200.'
    }
  });

  let info = await transporter.sendMail({
    from : 'uzu@gmail.com',
    to : user_email,
    subject : '안녕하세요',
    text : '테스트 메일입니다'
  });
})