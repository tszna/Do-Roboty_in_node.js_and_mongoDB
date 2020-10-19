const mongoose = require('mongoose');
let db;
function configureDatabase() {
    mongoose.connect("mongodb+srv://tomasz:123xxx@cluster0.hwzjk.mongodb.net/todolistDB", { useNewUrlParser: true, useFindAndModify: false });
    db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('connection opened');
    });
}

module.exports = {
    configureDatabase: configureDatabase,
};