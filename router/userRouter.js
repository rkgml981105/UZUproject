// const express = require("express");
// const router = express.Router();
// const User = require("../schemas/user");


//   // show
//   router.get('/user/:id', function(req, res){
//     User.findOne({_id: req.params.id}, function(err, user){
//       if(err) return res.json(err);
//       res.render('user/show.ejs', {user:user});
//     });
//   });
  
//   // edit
//   router.get('//:id/edit', function(req, res){
//     User.findOne({_id: req.params.id}, function(err, user){
//       if(err) return res.json(err);
//       res.render('users/edit.ejs', {user:user});
//     });
//   });
  
//   // update // 2
//   router.put('/user/:id', function(req, res, next){
//     User.findOne({username:req.params.username}) // 2-1
//       .select('password') // 2-2
//       .exec(function(err, user){
//         if(err) return res.json(err);
  
//         // update user object
//         user.originalPassword = user.password;
//         user.password = req.body.newPassword? req.body.newPassword : user.password; // 2-3
//         for(var p in req.body){ // 2-4
//           user[p] = req.body[p];
//         }
  
//         // save updated user
//         user.save(function(err, user){
//           if(err) return res.json(err);
//           res.redirect('/users/'+user.username);
//         });
//     });
//   });
  
//   // destroy
//   router.delete('/:username', function(req, res){
//     User.deleteOne({username:req.params.username}, function(err){
//       if(err) return res.json(err);
//       res.redirect('/users');
//     });
//   });
  
//   module.exports = router;