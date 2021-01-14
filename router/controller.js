const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { route } = require("./memberRouter");
const session = require("express-session");
const util = require('../public/js/util');

const Board = require("../schemas/board");
const Board_long = require("../schemas/board_long");

    router.get('/', async function(req,res){
        let session = req.session;

        var searchQuery = createSearchQuery(req.query); // 1
  
        var count = await Board.countDocuments(searchQuery); // 1-1
        var boards = await Board.find(searchQuery) // 1-2
        
        .populate("writer")
        .sort('-createdAt')  // 최신 날짜 순으로 내림차순
        .exec(function (err, boards) {
            if(err) return res.json(err);
            res.render('main.ejs', {
              session : session,
              boards: boards, 
              searchType:req.query.searchType,
              searchText:req.query.searchText 
            });
          })
        
        // res.render('main.ejs', {
        //     session : session
        // });
    });

    router.get('/register', function (req,res) {
        var user = req.flash('user')[0] || {};
        var errors = req.flash('errors')[0] || {};
        res.render('register.ejs', { user:user, errors:errors });
    })

    router.get("/login",function(req,res){
        res.render('login.ejs');
    });
    router.get("/mypage", async function (req,res) {
        let session = req.session;

        var searchQuery = createSearchQuery(req.query); // 1
  
        var count = await Board.countDocuments(searchQuery); // 1-1
        var boards = await Board.find(searchQuery) // 1-2
        
        .populate("writer")
        .sort('-createdAt')  // 최신 날짜 순으로 내림차순
        .exec(function (err, boards) {
            if(err) return res.json(err);
            res.render('user/mypage.ejs', {
              session : session,
              boards: boards, 
              searchType:req.query.searchType,
              searchText:req.query.searchText 
            });
          })
        // res.render('user/mypage.ejs');
    })

    router.get("/logout",function(req,res){
        req.session.destory(); 
        
    });

module.exports = router;

function createSearchQuery(queries){ // 4
    var searchQuery = {};
    if(queries.searchType && queries.searchText && queries.searchText.length >= 1){
      var searchTypes = queries.searchType.toLowerCase().split(',');
      var postQueries = [];
      if(searchTypes.indexOf('title')>=0){
        postQueries.push({ title: { $regex: new RegExp(queries.searchText, 'i') } });
      }
      if(searchTypes.indexOf('content')>=0){
        postQueries.push({ content: { $regex: new RegExp(queries.searchText, 'i') } });
      }
      if(postQueries.length > 0) searchQuery = {$or:postQueries};
    }
    return searchQuery;
  }