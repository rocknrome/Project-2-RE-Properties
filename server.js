// R'N'R December 31, 2023

// DEPENDENCIES
require("dotenv").config(); // this is how we make use of our .env variables
require("./config/db"); // bring in our db config
const express = require("express");
const morgan = require("morgan"); // logger
const methodOverride = require("method-override");
const propertyRouter = require("./routes/properties"); // Importing property routes

const app = express();
const { PORT = 3013 } = process.env;
const seedData = require("./models/seed"); // Update seed data to property-specific

// Bring in our Property model
const Property = require("./models/property"); // Importing Property model

/**
 * Middleware
 */
app.use((req, res, next) => {
    req.model = {
        Property, // Updated to Property model
        seedData
    };
    console.log("this is middleware");

    // go to the next app method
    next();
});
app.use(morgan("dev")); // logging
app.use(express.urlencoded({ extended: true })); // body parser this is how we get access to req.body
app.use(methodOverride("_method")); // Lets us use DELETE PUT HTTP verbs
app.use("/public", express.static("public")); // serve up our public directory with the url prefix of /public/styles.css
// Set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public')); //styling file access
app.use('/utils', express.static('utils')); //usage of exporting function into CSV and PDF



/**
 * Routes & Router
 */

// Root Route
app.get('/', async (req, res) => {
    try {
        const properties = await req.model.Property.find({});
        res.render('index', { properties });
    } catch (error) {
        res.status(500).send('Error occurred: ' + error.message);
    }
});

// Seeding Route
app.get('/seed', async (req, res) => {
    try {
        // Clear the existing data
        await Property.deleteMany({});

        // Insert the seed data
        await Property.create(seedData);

        // Send a response or redirect
        res.send('Database has been seeded!');
    } catch (error) {
        res.status(500).send('Error occurred during seeding: ' + error.message);
    }
});


// app.use(prefix url, router to execute)
app.use("/properties", propertyRouter); // property Router

/**
 * Server listener
 */
app.listen(PORT, () => console.log(`I am alive on port ${PORT}`));
