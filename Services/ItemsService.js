const Item = require('../Config/Models/Item');
const groupService = require('../Services/GroupsService');
async function SaveItem(item, userId, parent) {
    await groupService.saveGroup(parent,userId);
    let group = await groupService.getGroupByName(parent);
    let obj = new Item({
        name: item,
        userId: userId,
        groupId: group._id
    });
    await obj.save();
}

async function GetItem(id) {
    let item = await Item.findOne({ _id: id }).exec();
    item = await groupService.embeddGroupNameIntoItem(item);
    return item;
}
async function GetAllItems(userId) {
    let items = await Item.find({ userId: userId }).exec();

    for (let item of items) {
        item = await groupService.embeddGroupNameIntoItem(item);
    }
    return items;
}
async function DeleteItem(id) {
    await Item.deleteOne({ _id: id }).exec();
}
async function UpdateItem(item,id) {
    let obj = {
        name: item
    };
    const filter = { _id: id };
    let r = await Item.findOneAndUpdate(filter, obj);
    console.log(r);
}
async function SeedItems(userId) {
    const defaultItems = [
        "Welcome to your todolist!",
        "Hit the + button to add a new item.",
        "<-- Hit this to delete an item.",
        "Double click on an item to edit"
    ];
    for (let item of defaultItems) {
        await SaveItem(item, userId, "default");
    }
}
function getUniqueParents(foundItems) {
    let parents = foundItems.map(x => x.parent);
    let distinctParents = parents.filter(onlyUnique);
    return distinctParents;
}
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
module.exports = {
    SaveItem,
    GetItem,
    GetAllItems,
    DeleteItem,
    UpdateItem,
    SeedItems,
    getUniqueParents
};