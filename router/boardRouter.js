const express = require("express");
const router = express.Router();
const Board = require("../schemas/board");
const Board_long = require("../schemas/board_long");
const session = require("express-session");
var islogin = require('islogin');

/* boardlist */
router.get('/', (req, res) => {
  if(req.session.email) {
      res.render('board',{isLogin:"Logout"})}
  else{res.render('board',{isLogin:"Login"})}
});

router.get('/long', function (req, res) {
  Board_long.find({})
  .populate("writer", { _id:0, nickname: 1 })
  .sort('-createdAt')            // 최신 날짜 순으로 내림차순
  .exec(function (err, boards) {
    if(err) return res.json(err);
    res.render('board/long/boardlist.ejs', { boards: boards });
  });
});

router.get('/short', function (req, res) {
  Board.find({})
  .populate("writer", { _id:0, nickname: 1 })
  .sort('-createdAt')   // 최신 날짜 순으로 내림차순
  .exec(function (err, boards) {
    if(err) return res.json(err);
    res.render('board/short/boardlist.ejs', { boards: boards });
  })
})

router.get('/best', function (req, res,next) {
  Board.find({})
  .sort('likeCnt')    // 좋아요 순으로 내림차순
  .exec(function (err, boards) {
      res.render('board/best/boardlist.ejs', { title: 'Board', boards: boards });
  })
})


/* write(new)  */
//전체 글쓰기
router.get('/write', function (req, res) {
  if(req.session.email) {
    res.render('board/write.ejs',{isLogin:"Logout"})}
  //로그인하지 않은 사용자 접근 차단
  else{res.send('<script type="text/javascript">alert("로그인한 사용자만 작성할 수 있습니다."); window.location="/login"; </script>')}
})


router.get('/long/write', function(req, res) {
  if(req.session.email) {
    res.render('board/long/write.ejs',{isLogin:"Logout"})}
  //로그인하지 않은 사용자 접근 차단
  else{res.send('<script type="text/javascript">alert("로그인한 사용자만 작성할 수 있습니다."); window.location="/board/long"; </script>')}
});
 
router.get('/short/write', function(req, res) {
  if(req.session.email) {
    res.render('board/short/write.ejs')}
  //로그인하지 않은 사용자 접근 차단
  else{res.send('<script type="text/javascript">alert("로그인한 사용자만 작성할 수 있습니다."); window.location="/board/short"; </script>')}
});


router.post('/long/write', function(req, res){
  Board_long.create(req.body, function(err, board){
    if(err) return res.json(err);
    res.redirect('/board/long');
  });
});


router.post('/short/write', function(req, res){
  req.body.writer = req.user.nickname;
  Board.create(req.body, function(err, board){
    if(err) return res.json(err);
    res.redirect('/board/short');
  });
});



/* board find by board id - show */  
router.get('/long/:id', function (req, res) {
  Board_long.findOne({_id: req.params.id}, function (err, board_longs) {
      if(err) return res.json(err);
      res.render('board/long/show', {board_longs: board_longs});
  })
});


router.get('/short/:id', function (req, res) {
  Board.findOne({_id: req.params.id}, function (err, boards) {
      if(err) return res.json(err);
      res.render('board/short/show', {boards: boards });
  })
});


router.get('/best/:id', function (req, res) {
  Board.findOne({_id: req.params.id}, function (err, boards) {
      if(err) return res.json(err);
      res.render('board/best/show', {boards: boards });
  })
});


//원경 사이트 https://www.a-mean-blog.com/ko/blog/Node-JS-%EC%B2%AB%EA%B1%B8%EC%9D%8C/%EC%A3%BC%EC%86%8C%EB%A1%9D-%EB%A7%8C%EB%93%A4%EA%B8%B0/%EC%A3%BC%EC%86%8C%EB%A1%9D-Show-Edit-Update-Destroy
//edit(&mongo에 update),  destroy(삭제)
/* edit */
router.get('/long/:id/edit', function(req, res){
  Board_long.findOne({_id:req.params.id}, function(err, board_longs){
    if(err) return res.json(err);
    res.render('board/long/edit', {board_longs: board_longs});
  });
});


router.get('/short/:id/edit', function(req, res){
  Board.findOne({_id:req.params.id}, function(err, boards){
    if(err) return res.json(err);
    res.render('board/short/edit', {boards: boards});
  });
});

//update insert mongo  //  
router.put('/long/:id', function(req, res){
  Board_long.findOneAndUpdate({_id:req.params.id}, req.body, function(err, boards){
    if(err) return res.json(err);
    res.redirect('/board/long/'+req.params.id);
  });
});

router.put('/short/:id', function(req, res){
  Board.findOneAndUpdate({_id:req.params.id}, req.body, function(err, boards){
    if(err) return res.json(err);
    res.redirect('/board/short/'+req.params.id);
  });
});

// destroy //
router.delete('/long/:id', function(req, res){
  Board_long.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/board/long');
  });
});

router.delete('/short/:id', function(req, res){
  Board.deleteOne({_id:req.params.id}, function(err){
    if(err) return res.json(err);
    res.redirect('/board/short');
  });
});


module.exports = router;