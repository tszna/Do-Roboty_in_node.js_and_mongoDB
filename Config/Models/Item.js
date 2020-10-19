const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    userId: {
        type: String,
        required: [true, 'userId is required']
    },
    groupId: {
        type: String,
        required: [true, 'groupId is required']
    },

});
let Item = mongoose.model('Item', itemSchema);

module.exports = Item;
