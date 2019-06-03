# QUT Compass

## Authors

- Nik Sirhan - _Project Lead_ - n10275363
- Ranne Sanedrin ([impulsifier](https://github.com/impulsifier/)) - _SCRUM Master_ - n8817596
- Lachlan Underhill ([Bambanah](https://github.com/Bambanah/)) - _Developer_ - n9692941
- Cameron Short ([cshor24](https://github.com/cshor24/)) - _Developer_ - n9450106
- 
## Introduction

QUT Compass aims to unify the current methods of team formation within the IFB398/IFB399 units
provided by QUT into a cohesive, functional platform. The current tools available for this process
are an official Facebook group and official icebreaker sessions held in the first week of semester.
Teaching Staff were then forced to keep track of ~350 students with spreadsheets, while gathering
information from multiple sources. The resulting platform will be akin to a small-scale social
network, with students able to create personalised profiles, create posts describing their ideal
team members, create and manage teams, as well as communicate with other students and tutors.

**This repository contains the implementation of the desired application by Team CRNL.**

## Deployment

Heroku is used to automatically access the master and develop branches on github and deploy two individual versions of the app from there.
This allows us to have a production version of the app ready at all times (master branch) as well as having a test environment (develop branch)
for added convenience when user testing the app, as it allows us to access the app without having to actually run the server.

**[Production Branch](https://crnl-compass.herokuapp.com/)**

**[Development Branch](https://crnl-compass-dev.herokuapp.com/)**

## Getting Started

If you wish to run a development version of this app to track updates to the code etc., first:

- Install Node.js
- Clone this project repository
- Run `npm install` in project directory to install node modules

## Starting and Accessing the Dev Server

### `npm run dev`

If changes are being made to any of the angular code.
This will start the express backend and run the angular frontend at the same time using the [concurrently](https://www.npmjs.com/package/concurrently) package

### `npm run prod`

For testing the complete system with no updates to the angular code.
Angular code is built in production mode and accessed directly from the express server.

### Accessing

**[http://localhost:4200/](http://localhost:4200/)**

Access the angular server via _(Use this one if the code is being modified)_

**[http://localhost:3000/](http://localhost:3000/)**

Access the node server via _(Use this one for API call tests or if the code is not changing)_

## Built With

QUT Compass is a MEAN full stack app, built with:

- [MongoDB](https://www.mongodb.com/) - Backend Database Management
- [Express.js](https://expressjs.com/) - Backend
- [Angular 6](https://angular.io/) - Frontend
- [Node.js](https://nodejs.org/en/) - Backend
- [Karma](https://karma-runner.github.io/latest/index.html) and [Jasmine](https://jasmine.github.io/) - Unit Testing
