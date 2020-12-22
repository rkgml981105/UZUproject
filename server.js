const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const ejs = require("ejs");
const connect = require("./schemas");
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
      secure: false
    }
  })
);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views",__dirname + "/views");
app.set("view engine", "ejs");
app.engine('ejs', ejs.renderFile);

app.use(express.static(__dirname + "/public"));

app.use("/member", require("./router/memberRouter"));
app.use("/board", require("./router/boardRouter"));

app.use("/", require('./router/controller'));

app.listen(3000, () => {
  console.log("서버 가동합니당");
});
