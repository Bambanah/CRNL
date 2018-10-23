# QUT Compass

## Introduction
QUT Compass aims to unify the current methods of team formation within the IFB398/IFB399 units provided by QUT into a cohesive, functional platform. The current tools available for this process are an official Facebook group, and official icebreaker sessions held in the first week of semester. Academics were then forced to keep track of ~350 students with spreadsheets, while gathering information from multiple sources. 
The end result will be a platform akin to a small-scale social network, with students able to create personalised profiles, create posts describing their ideal group members, as well as create and manage teams, and communicate with other students and tutors. This report documents the intended process to be used by the CRNL team in the development of our proposed system to aid in the forming of teams for students enrolled in IFB398/IFB399. There also exists potential future expansion for use in other subjects.

## Client Requirements
The project in question was supplied to us as an academic project by QUT. Our point of contact has provided us with a list of requirements which must be met for the project to be of satisfactory completion. These requirements are being considered as a guideline to effectively structure our planned implementation and ensure our efforts are being appropriately directed.
- Should work as a restricted social network, in which students can post their requests/offers, but should be tailored to the task at hand, so that open requests don’t disappear down the list, and it is evident at a glance how many offers are out there, from who, what skills are available/needed, etc.
- Frontend must react appropriately to different sized viewing screens (eg. Mobiles, Tablets, Laptops etc.)
- Dashboard for the teaching staff to monitor the number of teams, communicate informally with the students, suggest possible matches, and offer feedback on team formation
- Optionally, explore an intelligent agent (similar to Amazon’s book recommendation system) to help students find a match based on skills, interests, availability etc.

## Getting Started

A step by step series of examples that tell you how to get a development env running

- Install Node.js
- Install MongoDB

Once installed, clone this repository.
Run 'npm install' in folder to install node modules

```
Screenshot of console after running npm install
```

Once installed, run 'npm start' to compile the angular frontend and start the node backend. *Note, any changes made to the frontend will not be visible without restarting the node server.*

To track live updates to the angular frontend, run 'ng serve' as well.

- Access the node server via [http://localhost:3000/](http://localhost:3000/)
- Access the angular server via [http://localhost:4200/](http://localhost:4200/)

## Deployment

This app is live deployed at [this place](#). The site will automatically update when pushes are made to the master branch.

## Built With

QUT Compass is a MEAN full stack app, built with:

* [MongoDB](https://www.mongodb.com/) - Backend Database Management
* [Express.js](https://expressjs.com/) - Backend
* [Angular 6](https://angular.io/) - Frontend
* [Node.js](https://nodejs.org/en/) - Backend
* [Karma](https://karma-runner.github.io/latest/index.html) - Unit Testing

## Authors

* Nik Sirhan - *Project Lead* - 
* Ranne Sanedrin - *SCRUM Master* - 
* Lachlan Underhill - *Developer* - n9692941
* Cameron Short - *Developer* - 
