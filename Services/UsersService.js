const User = require('../Config/Models/User');
async function SaveUser(name, username, password) {
    let obj = new User({
        name: name,
        username: username,
        password: password
    });
    await obj.save();
}
async function AuthUser(username, password) {
    try {
        let item = await User.findOne({ username: username, password: password }).exec();
        return item;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}
async function GetAllItems() {
    let items = await User.find({}).exec();
    return items;
}
async function DeleteItem(id) {
    await User.deleteOne({ _id: id }).exec();
}
async function UpdateItem(item) {
    let obj = {
        name: item
    };
    const filter = { _id: item._id };
    let r = await User.findOneAndUpdate(filter, obj);
    console.log(r);
}
async function CheckIfEmailExist(email){
    try {
        let item = await User.findOne({ username: email}).exec();
        if(item){
            console.log(item);
            return true;
        }
        else{
            return false;
        }
    }
    catch (err) {
        console.log(err);
        return true;
    }
}

module.exports = {
    SaveUser,
    AuthUser,
    CheckIfEmailExist
};