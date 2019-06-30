[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

Cagusabi Image Hosting API
==========================

Connected Sites
---------------

-   Front-End Repo: <https://github.com/cagusabi/cagusabi-client>
-   Application: <https://cagusabi.github.io/cagusabi-client>
-   Heroku Site: <https://agile-wave-91156.herokuapp.com>

Technologies Used (Back End)
-----------------
-   Atom
    -   open-source text and source code editor
-   Amazon Web Services (AWS) - Simple Storage Service (S3)
-   Heroku
-   Express.js
-   Curl
-   Javascript
-   JSon
-   MongoDB
-   Mongoose
-   Node.js

About the Back-End
------------------
The back-end of this application is built in JavaScript utilizing Express.js and the Mongoose object modeling tool on top of MongoDB. Libraries from Amazon Web Services (AWS) were also utilized in creating the image store using their Simple Storage Service (S3).

Upon upload, the images are placed in a temporary location. Upon successful upload to the S3 bucket, meta-information (see Models below) is stored in MongoDB hosted by Heroku. Updates of meta-information are also stored in the MongoDB collections. Deletions do not destroy objects in S3 - only the meta-data in MongoDB is deleted.

_This back-end was developed on Ubuntu 18.04.2 LTS and Mac OS X/macOS (El Capitan and later). No Microsoft developers were harmed during the making of this back end._

Development Process
-------------------
This project was our second experince creating a full-stack website, with a backend and front end built by ourselves, but our first type working as a team to collaboratively create the site together.

We were able to take a lot of what we have learned from our past project, and our own individual knowledges to create this application together

As this was our first time building something like this from the ground up, using express, node.js, mongoDB, mongoose and AWS so our primary goal was to make sure the calls to my api, the api itself, and the database were running correctly, before we went too depep into building the front end. The difficulty we encounted was realizing we needed a basic front end form to properly test the uploading of files. After having been able to CRUD my database, we then began to build the same calls but now incorporating ownership. Following that, we started to build out our jquery and api calls on our front end. We hit a few road blocks, when implementing handlebars, to help with preventing XSS, and when working on update/patch requests, and working with modals. We knew going in that these could cause the most trouble, but with the help of documentation, team work, and brainstorming, some instructor help, and reviewing past tickets from prior engineers, we was able to move past these issues. Once we were able to finally was able to CRUD through the front end, our final goal was to work on making sure the proper messaging appear for the users, and then working on the CSS for the site.

As my web page progressed and problems were encountered, we found that utilizing past issues, in the project's issue cue, google, working with one another, and even just taking a step back, helped us push through many of the problems.

Throughout this project, we were able to experience several different types of team work and team programming. Most often we utilized peer progamming, which allowd us to put two heads together, but we also utilized mob programming for difficult issues, and towards the end, we utilized working together remotely. We all leared a lot about the value of group promgramming by the end.

Entity-Relationship Diagram
---------------------------
The basic entity-relationship diagram is provided below:

![Cagusabi API ERD](./images/cagusabi-api-ERD.png)

Models
------
Below are the basic structure of both the USER and UPLOAD models used in the back-end:

#### USER
| Field          | Type      | Required | Unique | Notes                                  |
|----------------|-----------|----------|--------|----------------------------------------|
| email          | String    | true     | true   |                                        |
| hashedPassword | String    | true     | true   |                                        |
| token          | String    | true     |        |                                        |
| timestamps     | timestamp |          |        | Populated automatically                |
| toObject       | Object    |          |        | Removes hashed password upon retrieval |

#### UPLOAD
| Field       | Type                           | Required | Notes                   |
|-------------|--------------------------------|----------|-------------------------|
| name        | String                         | false    |                         |
| url         | String                         | true     |                         |
| description | String                         | false    |                         |
| owner       | mongoose.Schema.Types.ObjectId | true     | References User         |
| email       | String                         | true     |                         |
| tags        | String                         | false    |                         |
| timestamps  | timestamp                      |          | Populated automatically |

_No fields in the UPLOAD model are unique._

Routes
------
The RESTful routes are described below.
#### USER
| Verb   | URI Pattern      | Method/Action               |
|--------|------------------|-----------------------------|
| POST   | /sign-up         | app.post()/sign-up          |
| POST   | /sign-in         | app.post()/sign-in          |
| PATCH  | /change-password | app.patch()/change-password |
| DELETE | /sign-out        | app.delete()/sign-out       |

#### UPLOAD
| Verb   | URI Pattern      | Method/Action               |
|--------|------------------|-----------------------------|
| POST   | /uploads         | app.post()/create           |
| GET    | /uploads         | app.post()/index            |
| PATCH  | /uploads/:id     | app.patch()/update          |
| DELETE | /uploads/:id     | app.delete()/destroy        |

Basic Directory Structure
-------------------------
Below are listed the _relevant_ directories and files for the application - not all objects are listed.
```
app/models
```
-   ```user.js``` - the model for the USER object
-   ```upload.js``` - the model for the UPLOAD object

```
app/routes
```
-   ```user_routes.js``` - contains the application code for USER routes
-   ```upload_routes.js``` - contains the application code for UPLOAD routes

```
config
```
-   ```db.js``` - the basic MongoDB database configuration

```
curl-scripts/auth
```
-   ```change-password.sh``` - script for testing change password
-   ```sign-in.sh``` - script for testing sign in
-   ```sign-out.sh``` - script for testing sign out
-   ```sign-up.sh``` - script for testing sign in

```
curl-scripts/upoads
```
-   ```create.sh``` - script for testing meta-data create
-   ```destroy.sh``` - script for testing meta-data deletion
-   ```index.sh``` - script for testing meta-data index
-   ```update.sh``` - script for testing meta-data update

```
images
```
This directory stores the images used in this document.
```
lib
```
-   ```auth.js``` - application library for authentication functionaity
-   ```custom_errors.js``` - application library for error functionality
-   ```error_handler.js``` - application library for error functionality
-   ```promiseS3Upload.js``` - application library for Upload/AWS

```
tempFiles
```
This directory stores the basic images before upload to AWS S3.

### Reflections
 Looking back on the project, we are able to take away several reflections and learnings that we believe will help  with our future endeavors.

 - We found that we hit a big road block when it came to the upate feature on the front-end website. As a team, using some great brainstorming and team working, we were able to push past it.

 - We have seen a large improvement on our comfort, understanding, and coding skill since our last project. We know that the learning path is never ending, but are proud of the improvements on our abilities since last project.

### Future Goals
 As we continue to work on and update this project, we have the below goals we would like to accomplish:

 - Refactoring code to produce more DRY code, and reduce repeition
 - Working on improving modularity, and the usage of handlebars
 - Improving the mobile design of the site, to allow better use on smaller  screens
 - Allow a user to view only their photos
 - Implement geo tagging of photos
 - Implement a database of tags to allow users to view images with specific tags
