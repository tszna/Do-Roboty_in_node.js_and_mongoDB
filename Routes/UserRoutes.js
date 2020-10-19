const express = require("express");
const router = express.Router({ mergeParams: true });
const userService = require("../Services/UsersService");
const itemsService = require("../Services/ItemsService");
const groupService = require("../Services/GroupsService");

router.get("/login", async (req, res) => {
    try {
        if (req.session.userId) {
            res.redirect("/");
        }
        else {
            res.render("login", { listTitle: "Login" });
        }
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
});

router.post("/login", async (req, res) => {
    let auth = await userService.AuthUser(req.body.username, req.body.password);
    console.log(auth);
    if (auth) {
        req.session.userId = auth._id;
        res.redirect("/");
    }
    else {
        res.render("error", { error: "You can not be authenticated." });

    }
});
router.get("/signup", async (req, res) => {
    try {
        res.render("signup", { listTitle: "Sign Up" });
    }
    catch (error) {
        console.error(error);
        res.send(error);
    }
});
router.post("/signup", async (req, res) => {
    try {
        let check= await userService.CheckIfEmailExist(req.body.username);
        if(check){
            res.render("error", { error: "Your account can not be created. Email already in use." });
        }
        else{
            let user = await userService.SaveUser(req.body.name, req.body.username, req.body.password);
            res.redirect('/login');
        }
    }
    catch (error) {
        console.error(error);
        res.render("error", { error: "Your account can not be created." });

    }
});
router.get("/", async (req, res) => {
    console.log(req.session.userId);
    if (req.session.userId) {
        try {
            let foundItems = await itemsService.GetAllItems(req.session.userId);
            if (foundItems.length === 0) {
                await itemsService.SeedItems(req.session.userId);
            }
            let groups=await groupService.GetAllGroups(req.session.userId);
            if(groups.length>1){
                res.redirect("/list/"+groups[(groups.length-1)].name);
            }
            else{
            res.redirect("/list/default");
            }
        }
        catch (error) {
            console.error(error);
            res.send(error);
        }
    }
    else {
        res.redirect("login");
    }
});
router.get('/signout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});
module.exports = router;