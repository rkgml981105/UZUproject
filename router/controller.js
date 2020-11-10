const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app){
    app.get('/', function(req,res){
        res.render('main.ejs');
    });
    app.get("/parameter", function(req,res){
        const render_data = {
            data1: req.query.data1,
            data2: req.query.data2,
        };
        res.render('parameter.ejs', render_data)
    });
    app.post("/login",function(req,res){
        const login_data = {
            id: req.query.id,
            pw: req.query.pw,
        };
        res.render('login.ejs',login_data)
    });
};