const express = require("express");
const router = express.Router();
const Board = require("../schemas/board");
const Board_long = require("../schemas/board_long");
const session = require("express-session");
const util = require('../public/js/util');



/* boardlist */
router.get('/long', async function (req, res) {
  var searchQuery = createSearchQuery(req.query); // 1
  var count = await Board.countDocuments(searchQuery); // 1-1
  var boards = await Board_long.find(searchQuery) // 1-2
  .populate("writer")
  .sort('-createdAt')            // 최신 날짜 순으로 내림차순
  .exec(function (err, boards) {
    if(err) return res.json(err);
    res.render('board/long/boardlist.ejs', { 
      boards: boards,
      searchType:req.query.searchType,
      searchText:req.query.searchText 
    });
  });
});

router.get('/short', async function (req, res) {
  var searchQuery = createSearchQuery(req.query); // 1
  var count = await Board.countDocuments(searchQuery); // 1-1
  var boards = await Board.find(searchQuery) // 1-2
  .populate("writer")
  .sort('-createdAt')   // 최신 날짜 순으로 내림차순
  .exec(function (err, boards) {
    if(err) return res.json(err);
    res.render('board/short/boardlist.ejs', { 
      boards: boards, 
      searchType:req.query.searchType,
      searchText:req.query.searchText 
    });
  })
})

router.get('/best', async function (req, res) {
  // Board.find({})
  // .sort('likeCnt')    // 좋아요 순으로 내림차순
  var searchQuery = createSearchQuery(req.query); // 1
  var count = await Board.countDocuments(searchQuery); // 1-1
  var boards = await Board.find(searchQuery) // 1-2
  .populate("writer")
  .sort('-createdAt')   // 최신 날짜 순으로 내림차순
  .exec(function (err, boards) {
    if(err) return res.json(err);
    res.render('board/best/boardlist.ejs', { 
      boards: boards, 
      searchType:req.query.searchType,
      searchText:req.query.searchText 
    });
  })
})


/* write(new)  */
//전체 글쓰기
router.get('/write', function (req, res) {
  if(req.session.email) {
    res.render('board/write.ejs')}
  //로그인하지 않은 사용자 접근 차단
  else{res.send('<script type="text/javascript">alert("로그인한 사용자만 작성할 수 있습니다."); window.location="/login"; </script>')}
})


router.get('/long/write', function(req, res) {
  if(req.session.email) {
    res.render('board/long/write.ejs')}
  //로그인하지 않은 사용자 접근 차단
  else{res.send('<script type="text/javascript">alert("로그인한 사용자만 작성할 수 있습니다."); window.location="/login"; </script>')}
});
 

router.get('/short/write', function(req, res) {
  if(req.session.email) {
    res.render('board/short/write.ejs')}
  //로그인하지 않은 사용자 접근 차단
  else{res.send('<script type="text/javascript">alert("로그인한 사용자만 작성할 수 있습니다."); window.location="/login"; </script>')}
});


router.post('/long/write', function(req, res){
  const board_long = new Board_long({
    writer: req.session._id,
    title: req.body.title,
    content: req.body.content
  });
  board_long
  .save()
  .then(result => {
    console.log(result);
    res.redirect('/board/long'+res.locals.getPostQueryString(false, { searchText:'' })) // 3
    // res.redirect & send는 동시에 쓸 수 없음
    // res.send('<script type="text/javascript">alert("게시글이 업로드되었습니다"); window.location="/board/long"; </script>');
})
  .catch(err => {
      console.log(err);
      res.send('<script type="text/javascript">alert("작성이 실패하였습니다."); window.location="/board/long/write"; </script>');
  });
 });

 router.post('/long/write/alert', async (req, res) => {
  res.jsonp({success : true});
})


router.post('/short/write', util.getPostQueryString, function(req, res){
  const board = new Board({
    writer: req.session._id,
    title: req.body.title,
    content: req.body.content
  });
  board
  .save()
  .then(result => {
    console.log(result);
    res.redirect('/board/short'+res.locals.getPostQueryString(false, { searchText:'' })) // 3
    // res.redirect & send는 동시에 쓸 수 없음
    // res.send('<script type="text/javascript">alert("게시글이 업로드되었습니다"); window.location="/board/short"; </script>');
})
  .catch(err => {
      console.log(err);
      res.send('<script type="text/javascript">alert("작성이 실패하였습니다."); window.location="/board/short/write"; </script>');
  })
  
});

router.post('/short/write/alert', async (req, res) => {
  res.jsonp({success : true});
})



/* board find by board id - show */  
router.get('/long/:id', function (req, res) {
  Board_long.findOne({_id: req.params.id})
    .populate('writer')             // 3
    .exec(function(err, board_longs){
      if(err) return res.json(err);
      res.render('board/long/show', {board_longs: board_longs});
  })
});



router.get('/short/:id', function (req, res) {
  Board.findOne({_id: req.params.id})
    .populate('writer')
    .exec(function (err, boards) {
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
  Board_long.findOne({_id:req.params.id})
  .populate('writer')
  .exec(function(err, board_longs){
    if(err) return res.json(err);
    res.render('board/long/edit', {board_longs: board_longs});
  });
});


router.get('/short/:id/edit', function(req, res){
  Board.findOne({_id:req.params.id})
  .populate('writer')
  .exec(function(err, boards){
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