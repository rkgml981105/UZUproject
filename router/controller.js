const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const User = require("../schemas/user");
const Board = require("../schemas/board");
const session = require("express-session");

    router.get('/', function(req,res){
        let session = req.session;
        res.render('main.ejs', {
            session : session
        });
    });
    router.get('/register', function (req,res) {
        res.render('register.ejs');
    })
    router.get("/parameter", function(req,res){
        const render_data = {
            data1: req.query.data1,
            data2: req.query.data2,
        };
        res.render('parameter.ejs', render_data)
    });
    router.get("/login",function(req,res){
       
        res.render('login.ejs');
    });

    router.get("/logout",function(req,res){
        req.session.destory(); 
        
    });

module.exports = router;