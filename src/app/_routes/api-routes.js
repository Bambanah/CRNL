const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../../config/database');
const Post = require('../_models/Post');
const User = require('../_models/User');
const Student = require('../_models/Student');
const Team = require('../_models/Team');

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

router.get('/teams/', function(req, res, next) {
  Team.find(function(err, products) {
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
            const token = jwt.sign(user.toJSON(), config.secret);
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

router.post('/students/', function(req, res) {
  const newStudent = new Student(req.body);
  newStudent.save();
  res.status(202);
});

router.post('/users/', function(req, res) {
  const newUser = new User(req.body);
  newUser.save();
  res.status(202);
});

router.post('/teams/', function(req, res) {
  // Create new team
  const newTeam = new Team();

  // Add student IDs to team document
  const studentId1 = req.body[0];
  const studentId2 = req.body[1];
  newTeam.members.push(student_id1);
  newTeam.members.push(student_id2);
  const user1 = User.findById(req.body[0]);
  const user2 = User.findById(req.body[1]);
  user1.team = newTeam._id;
  user2.team = newTeam._id;
  // newTeam.save();
  // user1.save();
  // user2.save();
  res.status(202);
});

router.get('/teams/:id', function(req, res, next) {
  Team.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/teams/add/', function(req, res, next) {
  const teamId = User.findById(req.body.host_id).getTeamId();

  const team = Team.findById(team_id, function(err) {
    if (err) return next(err);
  });

  team.addMember(req.body.guest_id);

  res.status(202);
});

router.delete('/teams/:id', function(req, res, next) {
  Team.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
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
