const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const User = require("../schemas/user");
const Board = require("../schemas/board");
const { route } = require("./memberRouter");

    router.get('/', function(req,res){
        let session = req.session;
        res.render('main.ejs', {
            session : session
        });
    });
    router.get('/register', function (req,res) {
        res.render('register.ejs');
    })
    router.get("/login",function(req,res){
       
        res.render('login.ejs');
    });
    router.get("/mypage", function (req,res) {
        res.render('user/mypage.ejs')
    })

module.exports = router