var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var config = require('../config/database');
var Student = require("../models/Student");
var Post = require("../models/Post");
var User = require("../src/app/_models/User");

// EXCLUSIVELY FOR TESTING
router.get("/", function (res) {
  res.send("API Test");
});

/* GET ALL STUDENTS */
router.get("/students/", function (req, res, next) {
  Student.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE STUDENT BY ID */
router.get("/students/:id", function (req, res, next) {
  Student.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get("/users/", function (req, res, next) {
  User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

// Sign in user
router.post("/users/authenticate/", function (req, res) {

  User.findOne({
      email: req.body.email
    },
    function (err, user) {
      if (err) throw err;

      if (!user) {
        res.status(404).send({
          success: false,
          msg: "Authentication failed. User not found."
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), config.secret);
            // return the information including token as JSON
            res.json({
              success: true,
              token: "JWT " + token
            });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password."
            });
          }
        });
      }
    }
  );
});

router.post("/users/", function (req, res, next) {
  var newUser = new User(req.body);
  newUser.save();
  res.status(202);
});

/* UPDATE STUDENT */
router.put("/students/:id", function (req, res, next) {
  Student.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE STUDENT */
router.delete("/students/:id", function (req, res, next) {
  Student.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET ALL POSTS */
router.get("/posts/", function (req, res, next) {
  Post.find({})
    .sort("-updatedAt")
    .exec(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
});

/* GET SINGLE POST BY ID */
router.get("/posts/:id", function (req, res, next) {
  Post.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* CREATE POST */
router.post("/posts/", function (req, res, next) {
  Post.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE POST */
router.put("/posts/:id", function (req, res, next) {
  Post.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE POST */
router.delete("/posts/:id", function (req, res, next) {
  Post.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// API Route for user signup
router.post("/students", function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({
      success: false,
      msg: "Please pass email and password."
    });
  } else {
    var newStudent = new Student({
      email: req.body.email,
      password: req.body.password
    });
    // save the student
    newStudent.save(function (err) {
      if (err) {
        return res.json({
          success: false,
          msg: "Email already exists."
        });
      }
      res.json({
        success: true,
        msg: "Successful created new user."
      });
    });
  }
});

module.exports = router;
