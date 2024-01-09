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

async function index(req, res) {
    // Find all of the properties
    let properties = await req.model.Property.find({});

    // Render all of the properties to index.ejs
    res.render("index.ejs", {
        properties: properties.reverse()
    });
}

async function newForm(req, res) {
    // Render the create form for property
    res.render("new.ejs");
}

async function destroy(req, res) {
    try {
        // Find a property and then delete
        let deletedProperty = await req.model.Property.findByIdAndDelete(req.params.id);
        // Redirect back to the index
        res.redirect("/properties");
    } catch (error) {
        res.status(500).send("something went wrong when deleting");
    }
}

async function update(req, res) {
    try {
        // Convert 'completed' checkbox value to boolean
        // If the checkbox is unchecked, it won't be included in the req.body
        req.body.completed = req.body.completed ? true : false;

        let updatedProperty = await req.model.Property.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        // Redirect to the show route with the updated property
        res.redirect(`/properties/${updatedProperty._id}`);
    } catch (error) {
        res.status(500).send("Error updating property: " + error.message);
    }
}




async function create(req, res) {
    try {
        // If the checkbox is not checked, 'completed' will not be in 'req.body'
        req.body.completed = req.body.completed ? true : false;

        let newProperty = await req.model.Property.create(req.body);

        res.redirect("/properties");
    } catch (err) {
        res.status(500).send("Error creating property: " + err.message);
    }
}


async function edit(req, res) {
    try {
        // Find the property to edit
        let foundProperty = await req.model.Property.findById(req.params.id);
        res.render("edit.ejs", {
            property: foundProperty
        });
    } catch (error) {
        res.send("Error during editing");
    }
}

async function seed(req, res) {
    try {
        // Delete everything in the database
        await req.model.Property.deleteMany({});
        // Create data in the database
        await req.model.Property.create(req.model.seedData);

        // Redirect back to the index
        res.redirect("/properties");
    } catch (error) {
        res.send("Something went wrong with your seeds");
    }
}

async function show(req, res) {
    try {
        let foundProperty = await req.model.Property.findById(req.params.id);

        // Set headers to prevent caching
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        res.render("show.ejs", {
            property: foundProperty
        });
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
}


