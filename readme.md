# SEAL Project 2

** Roman Larionov **

** App Name: Properties development **

** Description: This project is a full-stack web application designed for managing property development. Utilizing technologies like Express, MongoDB, and Mongoose, it offers a comprehensive platform for tracking and updating property details. Users can add new properties, edit existing ones, and view a detailed list of properties, including address, owner, and completion status. The application is equipped with an intuitive interface, featuring seamless navigation and interactive forms for data entry. It's an ideal tool for property developers and managers seeking an efficient and organized way to oversee their property portfolios.**

**GitHub URL: https://github.com/rocknrome/Project-2-RE-Properties/tree/master

** Deployed Website: https://project-2-full-crud-app.onrender.com

** Trello Board link: https://trello.com/invite/b/ZauMLzRa/ATTIa8ec683321bb4ecea4b0224a61c01687AA1271C3/project-2-board


## List of Node dependencies

Express / Mongoose / dotenv / .env / Morgan / method-override / ejs / nodemon


## Node dependencies (package.json)

bcrypt, connect-mongo, dotenv, ejs, express, express-session, method-override, mongoose, morgan



## Frontend dependencies (jquery, ex, alpine, bootstrap, htmx, etc.)



## Route Map

| Route Name   | Endpoint               | Method | Description                                                      |
|--------------|------------------------|--------|------------------------------------------------------------------|
| Index        | `/`                    | GET    | Renders the main page with a list of all properties.             |
| New Form     | `/properties/new`      | GET    | Displays a form to add a new property.                           |
| Create       | `/properties`          | POST   | Processes the form data and adds a new property to the database. |
| Show         | `/properties/:id`      | GET    | Displays detailed information for a specific property.           |
| Edit Form    | `/properties/edit/:id` | GET    | Shows a form to edit an existing property.                       |
| Update       | `/properties/:id`      | PUT    | Updates a specific property's details in the database.           |
| Delete       | `/properties/:id`      | DELETE | Removes a specific property from the database.                   |
| Seed         | `/seed`                | GET    | Seeds the database with predefined property data.                |


## Design Mockups (Desktop + Mobile)
** Wireframes **


## ERD Diagram (Entity Relationship Diagram)

Entity:

Property
- _id: ObjectId
- address: String
- owner: String
- completedStatus: Boolean








