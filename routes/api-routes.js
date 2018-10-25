var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Student = require('../models/Student');
var Post = require('../models/Post');

// EXCLUSIVELY FOR TESTING
router.get('/', function(res) {
  res.send('API Test');
});

/* GET ALL STUDENTS */
router.get('/students/', function(req, res, next) {
  Student.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE STUDENT BY ID */
router.get('/students/:id', function(req, res, next) {
  Student.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE STUDENT */
router.post('/students/', function(req, res, next) {
  const student = new Student(req.body);
  student.save();
  res.status(201).json({
    id: student._id
  });
});

/* UPDATE STUDENT */
router.put('/students/:id', function(req, res, next) {
  Student.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE STUDENT */
router.delete('/students/:id', function(req, res, next) {
  Student.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET ALL POSTS */
router.get('/posts/', function(req, res, next) {
  Post.find({}).sort('-updatedAt').exec(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE POST BY ID */
router.get('/posts/:id', function(req, res, next) {
  Post.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* CREATE POST */
router.post('/posts/', function(req, res, next) {
  Post.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE POST */
router.put('/posts/:id', function(req, res, next) {
  Post.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE POST */
router.delete('/posts/:id', function(req, res, next) {
  Post.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
