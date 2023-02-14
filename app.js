const express = require("express");
const app = express();

const router = require("./routes/routes.js");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(router);

app.listen(8042, function() {
    console.log("Ich lausche auf http://localhost:8042");
});