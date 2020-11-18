var express  = require('express');
var router = express.Router();
const Board = require("../schemas/board");

// Index 
router.get('/', function(req, res){
    Post.find({})                  // 1
    .sort('-createdAt')            // 1
    .exec(function(err, posts){    // 1
      if(err) return res.json(err);
      res.render('posts/index', {posts:posts});
    });
  });
  
  // New
  router.get('/new', function(req, res){
    res.render('posts/new');
  });
  
  // create
  router.post('/', function(req, res){
    Post.create(req.body, function(err, post){
      if(err) return res.json(err);
      res.redirect('/posts');
    });
  });
  
  // show
  router.get('/:id', function(req, res){
    Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      res.render('posts/show', {post:post});
    });
  });
  
  // edit
  router.get('/:id/edit', function(req, res){
    Post.findOne({_id:req.params.id}, function(err, post){
      if(err) return res.json(err);
      res.render('posts/edit', {post:post});
    });
  });
  
  // update
  router.put('/:id', function(req, res){
    req.body.updatedAt = Date.now(); //2
    Post.findOneAndUpdate({_id:req.params.id}, req.body, function(err, post){
      if(err) return res.json(err);
      res.redirect("/posts/"+req.params.id);
    });
  });
  
  // destroy
  router.delete('/:id', function(req, res){
    Post.deleteOne({_id:req.params.id}, function(err){
      if(err) return res.json(err);
      res.redirect('/posts');
    });
  });


  

//board-long boardlist
app.get('/board/long', async(req, res) => {
    try{
      let obj;
  
      obj = {
        writer: req.body._id,
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags
      };
  
      const board = new Board(obj);
      await board.save();
      res.render('board/long/boardlist', {})
  
    } catch(err) {
      console.log(err);
      res.json({ message: false });
    }
  });
  
  // write
  app.post('/board/long/new', function(req, res){
    Contact.create(req.body, function(err, contact){
      if(err) return res.json(err);
      res.redirect('/board/long/new');
    });
  });
  
  
  module.exports = router;