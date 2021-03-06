const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../../config/database');
const Post = require('../_models/Post');
const User = require('../_models/users/User');
const Student = require('../_models/users/Student');
const Team = require('../_models/Team');
const Skill = require('../_models/Skill');

// EXCLUSIVELY FOR TESTING
router.get('/', function(res) {
  res.send('API Test');
});

//
// Students
//

// Get all students
router.get('/students/', function(req, res, next) {
  Student.find()
    .populate('skills')
    .populate('team')
    .exec(function(err, students) {
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
  Student.findById(req.params.id)
    .populate('skills')
    .populate('team')
    .exec(function(err, user) {
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

router.put('/users/:id/skills/add', function(req, res, next) {
  Student.findById(req.params.id, function(err, student) {
    if (err) return next(err);

    const skillToAdd = req.body;

    // Get count of documents matching provided type and name.
    // If document is found, add it. Otherwise create a new one and add that.
    Skill.countDocuments(
      { name: skillToAdd.name, type: skillToAdd.type },
      function(err, count) {
        if (err) return next(err);

        if (count == 0) {
          // If no existing skills are found, create new
          Skill.create(skillToAdd, function(err, skill) {
            if (err) return next(err);
            if (!student.skills.includes(skill._id)) {
              student.skills.push(skill._id);
              student.save();

              if (!skill.members.includes(student._id)) {
                skill.members.push(student._id);
                skill.save();
              }

              res.json(skill);
            } else {
              console.warn('Skill already added to student');
            }
          });
        } else {
          // If existing skill is found, add that skill
          Skill.findOne({ name: skillToAdd.name }, function(err, skill) {
            if (err) return next(err);

            if (!student.skills.includes(skill._id)) {
              student.skills.push(skill._id);
              student.save();

              if (!skill.members.includes(student._id)) {
                skill.members.push(student._id);
                skill.save();
              }

              res.json(skill);
            } else {
              console.warn('Skill already added to student');
            }
          });
        }
      }
    );
  });
});

router.put('/users/:id/skills/remove', function(req, res, next) {
  Student.findById(req.params.id, function(err, student) {
    if (err) return next(err);

    const skillIdToRemove = req.body._id;

    Skill.findById(skillIdToRemove, function(err, skill) {
      if (err) return next(err);

      // Remove skill from student document
      student.skills = student.skills.filter(function(skillId) {
        return !skillId.equals(skillIdToRemove);
      });
      student.save();

      // Remove student as an owner of this skill
      skill.members = skill.members.filter(function(studentId) {
        return !studentId.equals(student._id);
      });
      skill.save();
    });
  });
});

router.put('/users/:id/industry/add', function(req, res, next) {
  Student.findById(req.params.id, function(err, student) {
    if (err) return next(err);
    student.industries.push(req.body.name);
    student.save();

    res.status(200).end();
  });
});

router.put('/users/:id/industry/remove', function(req, res, next) {
  Student.findById(req.params.id, function(err, student) {
    if (err) return next(err);

    console.log(req.body);
    const industryToRemove = req.body.name;

    student.industries.filter(arrIndustry => {
      return arrIndustry != industryToRemove;
    });

    student.save();

    res.status(200).end();
  });
});

router.post('/invite/send', function(req, res, next) {
  const { hostId, guestId, invitationType } = req.body;

  if (invitationType == 'create' || invitationType == 'add') {
    // Invite student to create a team

    Student.findById(guestId, function(err, student) {
      if (err) return next(err);

      if (
        student.invitations.filter(x =>
          x.invitedById.toString().includes(hostId)
        ).length > 0
      ) {
        res.status(300).json('Student already has an identical invitation');
      } else {
        student.inviteTeam(invitationType, hostId);
        res.status(201).json('User invited to create team');
      }
    });
  } else {
    res.status(300).json('No invitation type specified');
  }
});

router.post('/invite/dismiss', function(req, res, next) {
  const { invitedId, invitedById } = req.body;

  Student.findById(invitedId, function(err, student) {
    if (err) return next(err);
    student.invitations = student.invitations.filter(
      x => x.invitedById != invitedById
    );
    student.save();

    res.status(200).json('Dismissed invitation');
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
  Team.find()
    .populate('members')
    .exec(function(err, teams) {
      if (err) return next(err);

      res.status(202).json(teams);
    });
});

// Create Team with two members
router.post('/teams/', function(req, res) {
  // Create new team
  const newTeam = new Team();

  // Add student IDs to team document
  const { studentId1, studentId2 } = req.body;
  let studentName1;
  let studentName2;

  newTeam.members.push(studentId1);
  newTeam.members.push(studentId2);

  // Add team id to student documents
  Student.findById(studentId1, function(err, student) {
    if (err) return next(err);
    student.team = newTeam._id;
    student.save();

    if (student.name !== undefined) {
      studentName1 = student.name.first;
    }

    Student.findById(studentId2, function(err, student) {
      if (err) return next(err);
      student.team = newTeam._id;
      student.save();

      if (student.name !== undefined) {
        studentName2 = student.name.first;
      }

      // Set default name as names of first two members
      newTeam.name = `${studentName1}, ${studentName2}`;

      // Save team
      newTeam.save();

      res.status(201).json(newTeam);
    });
  });
});

// Get Team
router.get('/teams/:id', function(req, res, next) {
  Team.findById(req.params.id)
    .populate('members')
    .exec(function(err, team) {
      if (err) return next(err);

      if (team != null) {
        res.status(202).json(team);
      } else {
        res.status(404).json("Team doesn't exist");
      }
    });
});

// Update single user
router.put('/teams/:id', function(req, res, next) {
  Team.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(
    err,
    Team
  ) {
    if (err) return next(err);
    res.json(Team);
  });
});

// Add member to team
router.post('/teams/add/', function(req, res, next) {
  const hostId = req.body.hostId;
  const guestId = req.body.guestId;

  User.findById(hostId, function(err, host) {
    if (err) return next(err);

    Team.findById(host.team, function(err, team) {
      if (err) return next(err);

      User.findById(guestId, function(err, guest) {
        if (err) return next(err);

        if (guest.team != undefined) {
          Team.countDocuments({ _id: guest.team }).exec(function(err, count) {
            if (count > 0) {
              res.status(300).json('This user is already in a team');
            } else {
              team.addMember(guestId);
              guest.team = team._id;
              guest.save();
              res.status(202).json(team);
            }
          });
        } else {
          team.addMember(guestId);
          guest.team = team._id;
          guest.save();
          res.status(202).json(team);
        }
      });
    });
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

    Team.findOneAndDelete(req.params.id, function(err) {
      if (err) return next(err);
      res.status(202);
    });
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
      res.status(300);
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
        res.status(300);
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
    .populate({ path: 'author', populate: { path: 'skills' } })
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
  Post.create(
    {
      title: req.body[0].title,
      content: req.body[0].content,
      author: req.body[1]
    },
    function(err, post) {
      if (err) return next(err);
      res.status(201).end();
    }
  );
});

// Update post
router.put('/posts/:id', function(req, res, next) {
  Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.status(201).end();
  });
});

// Delete post
router.delete('/posts/:id', function(req, res, next) {
  Post.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.status(201).end();
  });
});

module.exports = router;
