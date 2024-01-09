// DEPENDENCIES
const express = require("express");
const router = express.Router();

// Bring in our controller
const propertyController = require("../controllers/properties");

/**
 * Routes INDUCESS
 */
router.get("/", propertyController.index);
router.get("/new", propertyController.newForm);
router.delete("/:id", propertyController.destroy);
router.put("/:id", propertyController.update);
router.post("/", propertyController.create);
router.get("/edit/:id", propertyController.edit);
router.get("/seed", propertyController.seed);
router.get("/:id", propertyController.show);

// Export our router
module.exports = router;
