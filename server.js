const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
const connect = require("./schemas");
const { signedCookie } = require("cookie-parser");
const bodyParser = require('body-parser'); // 1
const methodOverride = require('method-override'); // delete, update
const flash = require('connect-flash'); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true})); 
app.use(methodOverride('_method')); // delete, update 

connect();

const corsOptions = {
  origin: true,
  credentials: true
};

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "uzu",
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
    }
  })
);

app.use(flash());
app.locals.moment = require('moment');
app.locals.moment.locale('ko');

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("views",__dirname + "/views");
app.set("view engine", "ejs");
app.engine('ejs', ejs.renderFile);

// Custom Middlewares // 
app.use(function(req, res, next){
  res.locals.active = req.path; // [0] will be empty since routes start with '/'
  res.locals.session = req.session;
  res.locals.password = req.password;
  res.locals.email = req.session.email;
  res.locals.nickname = req.session.nickname;
  res.locals.validator = req.validator;
  res.locals.address = req.address;
  res.locals.isDuplicated = req.isDuplicated;
  res.locals.flash = req.flash('flash');
  next()
});

app.use(express.static(__dirname + "/public"));

app.use("/member", require("./router/memberRouter"));
app.use("/board", require("./router/boardRouter"));
app.use("/", require('./router/controller'));

app.listen(3000, () => {
  console.log("서버 가동합니당");
  setTimeout(() => console.log("서버 살아 있지롱"), 5000)
});