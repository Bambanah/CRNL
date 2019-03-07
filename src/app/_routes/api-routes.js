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

//
// Students
//

// Get all students
router.get('/students/', function(req, res, next) {
  Student.find(function(err, students) {
    if (err) return next(err);
    res.json(students);
  });
});

//
//  Users
//

// Get all users
router.get('/users/', function(req, res, next) {
  User.find(function(err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

// Get single user
router.get('/users/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
});

//
//  Authentication
//

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

// Sign up new student
router.post('/students/', function(req, res) {
  const newStudent = new Student(req.body);
  newStudent.save();
  res.status(202);
});

// Sign up new user
router.post('/users/', function(req, res) {
  const newUser = new User(req.body);
  newUser.save();
  res.status(202);
});

//
// Teams
//

// Get all teams
router.get('/teams/', function(req, res, next) {
  Team.find(function(err, teams) {
    if (err) return next(err);
    res.json(teams);
  });
});

// Get single team
router.get('/teams/:id', function(req, res, next) {
  Team.findById(req.params.id, function(err, team) {
    if (err) return next(err);
    res.json(team);
  });
});

// Create Team with two members
router.post('/teams/', function(req, res) {
  // Create new team
  const newTeam = new Team();

  // Add student IDs to team document
  const studentId1 = req.body[0];
  const studentId2 = req.body[1];
  newTeam.members.push(studentId1);
  newTeam.members.push(studentId2);

  // Add team id to student documents
  User.findById(req.body[0], function(err, user) {
    user.team = newTeam._id;
    user.save();
  });
  User.findById(req.body[1], function(err, user) {
    user.team = newTeam._id;
    user.save();
  });

  // Save team
  newTeam.save();

  res.status(202);
});

// Get Team
router.get('/teams/:id', function(req, res, next) {
  Team.findById(req.params.id, function(err, team) {
    if (err) return next(err);
    res.json(team);
  });
});

// Add member to team
router.put('/teams/add/', function(req, res, next) {
  const hostId = req.body.hostId;
  const guestId = req.body.guestId;

  const teamId = User.findById(hostId).getTeamId();

  const team = Team.findById(teamId, function(err) {
    if (err) return next(err);
  });

  team.addMember(guestId);

  res.status(202);
});

// Remove member from team
router.put('/teams/remove/', function(req, res, next) {
  // TODO: Implement
  res.status(202);
});

// Delete Team
router.delete('/teams/:id', function(req, res, next) {
  Team.findByIdAndRemove(req.params.id, function(err, team) {
    if (err) return next(err);
    res.json(team);
  });
});

// Get team ID of user
router.get('/users/:userId/team/', function(req, res, next) {
  User.findById(req.params.userId, function(err, user) {
    if (err) return next(err);
    res.json(user.team);
  });
});

//
// Posts
//

// Get all posts
router.get('/posts/', function(req, res, next) {
  Post.find({})
    .sort('-updatedAt')
    .exec(function(err, posts) {
      if (err) return next(err);
      res.json(posts);
    });
});

// Get single post
router.get('/posts/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Create post
router.post('/posts/', function(req, res, next) {
  Post.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Update post
router.put('/posts/:id', function(req, res, next) {
  Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// Delete post
router.delete('/posts/:id', function(req, res, next) {
  Post.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

//
//  Helper Functions
//

// Under Construction

module.exports = router;
