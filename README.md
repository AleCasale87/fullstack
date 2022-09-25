This project allows to create REST APIs for:
- basic authentication and authorization using JWT (JSON Web Token),
- user registration
- listing existing users

The project files are divided into a 'backend' and 'frontend' folder.

INSTALLATION GUIDE:

1) Setting up the MySql database
In order to run this code, you first have to create a MySql database called 'authentication_db' with a table called 'users' with the following columns:
- id INT(11) AUTO_INCREMENT not null PRIMARY KEY
- username VARCHAR(256) not null
- email VARCHAR(256) not null
- password VARCHAR(256) not null
- subscription DATE not null
- refresh_token TEXT
- createdAt DATE not null
- updatedAt DATE not null

If you have an existing database, you can instead link to it, by modifying the following configuration files:
- backend/config/database.js
- backend/models/userModels.js


2) Setting up the backend
To install all the backend packages run the following command from inside the 'backend' folder:
`npm install`

and the following command to run the server:
`nodemon index` 

3) Setting up the frontend
To install all the frontend packages run the following command from inside the 'frontend' folder:
`npm install`

and the following command to run the nodejs hosting the frontend:
`npm start`

4) Open the frontend at the url http://localhost:3000
