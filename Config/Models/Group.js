const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    userId: {
        type: String,
        required: [true, 'groupId is required']
    }
});
let Group = mongoose.model('Group', groupSchema);

module.exports = Group;
