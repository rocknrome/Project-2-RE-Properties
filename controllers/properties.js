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
        // Find by id and update with the req.body
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
        // Create a new property with req.body
        let newProperty = await req.model.Property.create(req.body);

        res.redirect("/properties");
    } catch (err) {
        res.send("Error creating property: " + err.message);
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
    // Find a property by _id
    let foundProperty = await req.model.Property.findById(req.params.id);

    // Render show.ejs with the foundProperty
    res.render("show.ejs", {
        property: foundProperty
    });
}
