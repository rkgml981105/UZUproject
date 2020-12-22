const express = require("express");
const router = express.Router();
const Board = require("../schemas/board");
const LongBoard = require("../schemas/board_long");

//지은 사이트  https://supdev.tistory.com/37  - boardlist, show, new(&mongo에 insert)
/* boardlist */


router.get('/long', function (req, res) {
  LongBoard.find({})
  .sort('-createdAt')            // 1
  .exec(function (err, boards) {
    if(err) return res.json(err);
    res.render('board/long/boardlist.ejs', { boards: boards });
  });
});

router.get('/short', function (req, res) {
  Board.find({})
  .sort('-createdAt')
  .exec(function (err, boards) {
    if(err) return res.json(err);
    res.render('board/short/boardlist.ejs', { boards: boards });
  })
})

router.get('/best', function (req, res,next) {
  Board.find({})
  .sort('likeCnt')
  .exec(function (err, boards) {
      res.render('board/best/boardlist.ejs', { title: 'Board', boards: boards });
  })
})


/* board find by id - show */
router.get('/long/show/:id', function (req, res) {
  LongBoard.findOne({_id: req.params.id}, function (err, boards) {
      if(err) return res.json(err);
      res.render('board/long/show', { title: 'Board', boards: boards });
  })
});


router.get('/short/show/:id', function (req, res) {
  Board.findOne({_id: req.params.id}, function (err, boards) {
      if(err) return res.json(err);
      res.render('board/short/show', { title: 'Board', boards: boards });
  })
});


/*show board*/
router.get('/best/boardlist', function(req, res) {
  res.render('board/best/boardlist.ejs', { title: '글쓰기' });
});


/* write(new)  */
router.get('/long/write', function(req, res) {
    res.render('board/long/write.ejs');
});
 
router.get('/short/write', function(req, res) {
  res.render('board/short/write.ejs');
});


router.post('/long/write', function(req, res){
  LongBoard.create(req.body, function(err, board){
    if(err) return res.json(err);
    res.redirect('/board/long');
  });
});


router.post('/short/write', function(req, res){
  Board.create(req.body, function(err, board){
    if(err) return res.json(err);
    res.redirect('/board/short');
  });
});



//원경 사이트 https://www.a-mean-blog.com/ko/blog/Node-JS-%EC%B2%AB%EA%B1%B8%EC%9D%8C/%EC%A3%BC%EC%86%8C%EB%A1%9D-%EB%A7%8C%EB%93%A4%EA%B8%B0/%EC%A3%BC%EC%86%8C%EB%A1%9D-Show-Edit-Update-Destroy
//edit(&mongo에 update),  destroy(삭제)

/* edit */
router.get('/long/:id/edit', function(req, res){
  LongBoard.findOne({_id:req.params.id}, function(err, boards){
    if(err) return res.json(err);
    res.render('/board/long/edit', {boards: boards});
  });
});

router.get('/short/:id/edit', function(req, res){
  Board.findOne({_id:req.params.id}, function(err, boards){
    if(err) return res.json(err);
    res.render('/board/short/edit', {boards: boards});
  });
});

//update insert mongo  //  
router.put('/long/:id', function(req, res){
  LongBoard.findOneAndUpdate({_id:req.params.id}, req.body, function(err, boards){
    if(err) return res.json(err);
    res.redirect('/board/long'+req.params.id);
  });
});

router.put('/short/:id', function(req, res){
  Board.findOneAndUpdate({_id:req.params.id}, req.body, function(err, boards){
    if(err) return res.json(err);
    res.redirect('/board/short'+req.params.id);
  });
});

// destroy //
router.delete('/long/:id', function(req, res){
  LongBoard.deleteOne({_id:req.params.id}, function(err){
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