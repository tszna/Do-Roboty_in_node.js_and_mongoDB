const express = require("express");
const router = express.Router({ mergeParams: true });
const itemsService = require("./Services/ItemsService");
const groupsService = require("./Services/GroupsService");
router.get("/list/:parent", async (req, res) => {
    if (req.session.userId) {
        try {
            let foundItems = await itemsService.GetAllItems(req.session.userId);
            if (foundItems.length === 0) {
                await itemsService.SeedItems(req.session.userId);
                return res.redirect("/list/"+req.params.parent);
            }
            let distinctParents = await groupsService.GetAllGroups(req.session.userId);
            foundItems = foundItems.filter(item => item.parent == req.params.parent);
            res.render("list", { listTitle: req.params.parent, newListItems: foundItems, parents: distinctParents });

        }
        catch (error) {
            console.error(error);
            res.send(error);
        }
    }
    else {
        res.redirect("/login");
    }

});

router.post("/list/add", async (req, res) => {
    const itemName = req.body.newItem;
    const parent = req.body.parent;
    if (req.body.itemId == 0) {
        await itemsService.SaveItem(itemName, req.session.userId, parent);
    }
    else{
        await itemsService.UpdateItem(itemName,req.body.itemId);
    }
    res.redirect(`/list/${parent}`);
});

router.post("/list/delete/:group", async (req, res) => {
    const checkedItemId = req.body.checkbox;
    await itemsService.DeleteItem(checkedItemId);
    console.log("Successfully deleted checked item.");
    res.redirect(`/list/${req.params.group}`);
});

router.get("/about", function (req, res) {
    res.render("about");
});
router.post("/group/add", async (req, res) => {
    const groupName = req.body.newGroup;
    await groupsService.saveGroup(groupName, req.session.userId);
    res.redirect(`/list/${groupName}`);
});
router.get("/group/delete/:groupId", async (req, res) => {
    await groupsService.DeleteGroup(req.params.groupId);
    res.redirect(`/`);
});
router.get("/group/edit/:groupId", async (req, res) => {
    try {
        if (req.session.userId) {
            res.render('EditGroup', { groupId: req.params.groupId });
        }
        else {
            res.redirect("/");
        }
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
});

router.post("/group/edit", async (req, res) => {
    await groupsService.UpdateGroup(req.body.newName, req.body.groupId);
    res.redirect('/');
});


module.exports = router;