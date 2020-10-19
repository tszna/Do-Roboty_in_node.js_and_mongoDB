const Group = require('../Config/Models/Group');
const Item = require('../Config/Models/Item');
async function saveGroup(group, userId) {
    let alreadyExists = await checkIfAlreadyExists(group, userId);
    if (!alreadyExists) {
        let obj = new Group({
            name: group,
            userId: userId
        });
        await obj.save();
    }
}
async function checkIfAlreadyExists(groupName, userId) {
    let group = await Group.findOne({ name: groupName, userId: userId }).exec();
    if (group) {
        return true;
    }
    return false;
}
async function getGroupByName(groupName) {
    let group = await Group.findOne({ name: groupName }).exec();
    return group;
}
async function getGroupById(groupId) {
    let group = await Group.findOne({ _id: groupId }).exec();
    return group;
}
async function embeddGroupNameIntoItem(item) {
    let group = await getGroupById(item.groupId);
    item.parent = group.name;
    return item;
}
async function GetAllGroups(userId) {
    let groups = await Group.find({ userId: userId }).exec();
    return groups;
}
async function DeleteGroup(id) {
    await Item.deleteMany({ groupId: id }).exec();
    await Group.deleteOne({ _id: id }).exec();
}
async function UpdateGroup(newName,id) {
    let obj = {
        name: newName
    };
    const filter = { _id:id };
    let r = await Group.findOneAndUpdate(filter, obj);
    console.log(r);
}
module.exports = {
    embeddGroupNameIntoItem,
    getGroupById,
    getGroupByName,
    saveGroup,
    GetAllGroups,
    DeleteGroup,
    UpdateGroup
}