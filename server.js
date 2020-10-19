const express = require("express");
const bodyParser = require("body-parser");
const dbserv = require('./Config/dbconfig');
let session = require('express-session');
const userRoutes = require('./Routes/UserRoutes');
const routes = require('./routes');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
app.use(routes);
app.use(userRoutes);
dbserv.configureDatabase();
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
