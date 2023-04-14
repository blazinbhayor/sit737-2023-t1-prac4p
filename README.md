# sit737-2023-t1-prac4p
 Task 4.1P

# Configuration
Started with "npm init -y' to get all the dependencies, initialize the project, and include the package.json file
install express, JSON Web Token, and dotenv 'npm i express jsonwebtoken dotenv' Dotenv will contain the secret token

Create a new file '.env' where your environmental variables will go. e.g. secret token

install a development dependency Nodemon 'npm i --save-dev nodemon' This will automatically restart the server when a change is made.

Create the server file 'server.js'
Add "devStart": "nodemon server.js" to "scripts" in package.json file.
"npm run devStart" to start the server

Create a '.gitignore' file to include the files that you don't want shared
node_modules

# Define routes
Create a listening port

Create a 'views' folder, and create a index.ejs, login, and register files in it.
Your frontend html codes will be in these files.

Create the endpoints for these pages in the server.js file

Create the html file for register and login pages, and the simple calculator in the index.ejs file.

Create POST routes for register and login pages.

# Password & Modules
Install Bcrypt to handle password hashing 'npm i bcrypt'

Install Passport.js 'npm i passport passport-local express-session express-flash'
Passport-local is to use the local version of passport.
Express-session will be used to ensure login across pages, and express flash is for authentication error messages.
Flash, bodyParser and session

Define local-strategy for authentication
# Middleware
Setup middlewares for flash, passport, and session management


