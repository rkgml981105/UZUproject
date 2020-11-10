const express = require('express');
const app = express();
const port = 8697;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User } = require('./models/User');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:6789/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/signup',(req,res)=> {
  const user = new user(req.body);
  user.save((err,userInfo) => {
    if (err) return res.json({success: false, err});
    return res.status(200).json({success: true});
    });
});

app.get('/',(req,res)=> res.send("hello world!!"));
app.listen(port, ()=> console.log(`listening on port ${port}`));