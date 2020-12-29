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

app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true})); // 3
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
  res.locals.nickname = req.session.nickname;
  res.locals._id = req.session._id;
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