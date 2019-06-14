const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    list: {type: String, required: true}
});

module.exports = mongoose.model('List', listSchema);
