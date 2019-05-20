const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../../config/database');
const Post = require('../_models/Post');
const User = require('../_models/users/User');
const Student = require('../_models/users/Student');
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

// Update single user
router.put('/users/:id', function(req, res, next) {
  Student.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    Student
  ) {
    if (err) return next(err);
    res.json(Student);
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
  const studentData = req.body;
  studentData.name = { first: String, last: String };
  studentData.name.first = studentData.first_name;
  delete studentData.first_name;
  studentData.name.last = studentData.last_name;
  delete studentData.last_name;
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
  Team.find()
    .populate('members', 'full_name')
    .exec(function(err, teams) {
      if (err) return next(err);

      teams.forEach(team => {
        nameBackup = team.members.map(a => a.full_name);
        team.name_backup = nameBackup.join(', ');
      });

      res.status(202).json(teams);
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
    if (err) return next(err);
    user.team = newTeam._id;
    user.save();
  });
  User.findById(req.body[1], function(err, user) {
    if (err) return next(err);
    user.team = newTeam._id;
    user.save();
  });

  // Save team
  newTeam.save();

  res.status(201).json(newTeam);
});

// Get Team
router.get('/teams/:id', function(req, res, next) {
  Team.findById(req.params.id)
    .populate('members')
    .exec(function(err, team) {
      if (err) return next(err);

      if (team != null) {
        nameBackup = team.members.map(a => a.full_name);
        team.name_backup = nameBackup.join(', ');

        res.status(202).json(team);
      } else {
        res.status(404).json("Team doesn't exist");
      }
    });
});

// Add member to team
router.post('/teams/add/', function(req, res, next) {
  const hostId = req.body.hostId;
  const guestId = req.body.guestId;
  let teamId;

  User.findById(hostId, function(err, user) {
    if (err) return next(err);

    Team.findById(user.team, function(err, team) {
      if (err) return next(err);

      teamId = team._id;
      team.addMember(guestId);
    });
  });

  User.findById(guestId, function(err, user) {
    if (err) return next(err);

    user.team = teamId;
  });

  res.status(202);
});

// Remove member from team
router.post('/teams/:teamId/remove/:userId', function(req, res, next) {
  Team.findById(req.params.teamId, function(err, team) {
    if (err) return next(err);
    team.removeMember(req.params.userId);
  });

  User.findById(req.params.userId, function(err, user) {
    if (err) return next(err);
    user.team = undefined;
    user.save();
  });
  res.status(202);
});

// Delete Team
router.delete('/teams/:id', function(req, res, next) {
  Team.findById(req.params.id, function(err, team) {
    if (err) return next(err);

    team.members.forEach(user => {
      User.findById(user, function(err, user) {
        if (user != null) {
          user.team = undefined;
          user.save();
        }
      });
    });
  });

  Team.findOneAndDelete(req.params.id, function(err) {
    if (err) return next(err);
    res.status(202);
  });
});

// Get team ID of user
router.get('/users/:userId/team/', function(req, res, next) {
  User.findById(req.params.userId, function(err, user) {
    if (err) return next(err);
    if (!user.isStudent()) console.warn('User is not a student');
    if (user.team) {
      res.status(202).send(user.team);
    } else {
      res.status(300); // TODO: Figure out which code to use
    }
  });
});

// Get members of team
router.get('/teams/:teamId/members', function(req, res, next) {
  Team.findById(req.params.teamId, function(err, team) {
    if (err) return next(err);
    if (team == null) {
      res.status(404).json("Team doesn't exist in database");
    } else {
      if (team.members === undefined || team.members.length === 0) {
        console.warn('Team has no members');
        res.status(300); // TODO: Figure out which code to use
      } else {
        Team.findOne({ _id: req.params.teamId })
          .populate('members')
          .exec(function(err, team) {
            if (err) return next(err);

            res.status(202).json(team.members);
          });
      }
    }
  });
});

//
// Posts
//

// Get all posts
router.get('/posts/', function(req, res, next) {
  Post.find({})
    .populate('author', 'full_name')
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
  console.log(req.body);
  Post.create(
    {
      title: req.body[0].title,
      content: req.body[0].content,
      author: req.body[1]
    },
    function(err, post) {
      if (err) return next(err);
      post.populate('author');
      post.save();
      res.json(post);
    }
  );
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
