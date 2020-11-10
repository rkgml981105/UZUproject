const express = require('express');
const ejs = require("ejs");
const app = express();

app.set("views",__dirname + "/views");
app.set("view engine", "ejs");
app.engine('ejs', ejs.renderFile);


const router = require('./router/controller')(app);
const server = app.listen(3000, function(){
    console.log("서버 가동");
});
