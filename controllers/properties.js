// DEPENDENCIES
module.exports = {
    index,
    newForm,
    destroy,
    update,
    create,
    edit,
    show,
    seed
}

/**
 * Route Controllers
 */

// Find all of the properties and render to index.ejs
async function index(req, res) {
    let properties = await req.model.Property.find({});
    res.render("index.ejs", {
        properties: properties.reverse(),
        currentPage: 'index' // Added to hide redundant navigation link on index page
    });
}


// Find a property by ID and render the edit page
async function edit(req, res) {
    try {
        let foundProperty = await req.model.Property.findById(req.params.id);
        res.render("edit.ejs", {
            property: foundProperty,
            currentPage: 'edit'
        });
    } catch (error) {
        res.send("Error during editing");
    }
}

// Render the create form for property
async function newForm(req, res) {
    res.render("new.ejs", {
        currentPage: 'new' // Added to hide redundant navigation link on new page
    });
}

// Find a property by ID and delete it
async function destroy(req, res) {
    try {
        await req.model.Property.findByIdAndDelete(req.params.id);
        res.redirect("/properties");
    } catch (error) {
        res.status(500).send("something went wrong when deleting");
    }
}

// Find a property by ID and update it
async function update(req, res) {
    try {
        req.body.completed = req.body.completed ? true : false;
        let updatedProperty = await req.model.Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect(`/properties/${updatedProperty._id}`);
    } catch (error) {
        res.status(500).send("Error updating property: " + error.message);
    }
}

// Create a new property
async function create(req, res) {
    try {
        req.body.completed = req.body.completed ? true : false;
        await req.model.Property.create(req.body);
        res.redirect("/properties");
    } catch (err) {
        res.status(500).send("Error creating property: " + err.message);
    }
}


// Seed the database with initial data
async function seed(req, res) {
    try {
        await req.model.Property.deleteMany({});
        await req.model.Property.create(req.model.seedData);
        res.redirect("/properties"); // This should invoke the index function
    } catch (error) {
        res.send("Something went wrong with your seeds");
    }
}


// Find a property by ID and render its details
async function show(req, res) {
    try {
        let foundProperty = await req.model.Property.findById(req.params.id);

        // Set headers to prevent caching
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        res.render("show.ejs", {
            property: foundProperty,
            currentPage: 'show'
        });
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
}