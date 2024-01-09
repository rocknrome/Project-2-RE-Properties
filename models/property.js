const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    address: { type: String, required: true },
    owner: { type: String, required: true },
    completed: { type: Boolean, required: true }
});

module.exports = mongoose.model('Property', propertySchema);
