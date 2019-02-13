var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../../../config/database');
var Post = require('../_models/Post');
var User = require('../_models/User');
var Student = require('../_models/Student');

// EXCLUSIVELY FOR TESTING
router.get('/', function(res) {
  res.send('API Test');
});

/* GET ALL STUDENTS */
router.get('/students/', function(req, res, next) {
  Student.find(function(err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

router.get('/users/', function(req, res, next) {
  User.find(function(err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE USER BY ID */
router.get('/users/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Sign in user
router.post('/users/authenticate/', function(req, res) {
  User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(404).json({
          success: false,
          msg: 'Authentication failed. User not found.'
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), config.secret);
            // return the information including token as JSON
            res.json({
              success: true,
              token: 'JWT ' + token
            });
          } else {
            res.status(401).send({
              success: false,
              msg: 'Authentication failed. Wrong password.'
            });
          }
        });
      }
    }
  );
});

router.post('/users/', function(req, res, next) {
  var newStudent = new Student(req.body);
  newStudent.save();
  res.status(202);
});

//
// POSTS
//

/* GET ALL POSTS */
router.get('/posts/', function(req, res, next) {
  Post.find({})
    .sort('-updatedAt')
    .exec(function(err, products) {
      if (err) return next(err);
      res.json(products);
    });
});

/* GET SINGLE POST BY ID */
router.get('/posts/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* CREATE POST */
router.post('/posts/', function(req, res, next) {
  Post.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE POST */
router.put('/posts/:id', function(req, res, next) {
  Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE POST */
router.delete('/posts/:id', function(req, res, next) {
  Post.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
