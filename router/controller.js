const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });


    router.get('/', function(req,res){
        res.render('main.ejs');
    });
    router.get('/register', function (req,res) {
        res.render('register.ejs')
    })
    router.get("/parameter", function(req,res){
        const render_data = {
            data1: req.query.data1,
            data2: req.query.data2,
        };
        res.render('parameter.ejs', render_data)
    });
    router.post("/login",function(req,res){
        const login_data = {
            id: req.query.id,
            pw: req.query.pw,
        };
        res.render('login.ejs',login_data)
    });


module.exports = router