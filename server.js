const express = require("express");
const app = express();

const PORT = 8080;

app.set("view engine", "ejs");

///////////////////////////////////////////

const mainPageRoute = require("./routes/main-page/MainPageRoute");
const addNewItemRoute = require("./routes/add-new-item/AddNewItemRoute");
const alterExistingItemRoute = require("./routes/alter-existing-item/AlterExistingItemRoute");

app.use("/", mainPageRoute);
//for displaying the current inventory and providing buttons, as
//well as a link to add another item to said inventory

app.use("/add-new-item", addNewItemRoute);
//page for adding new items to the inventory

app.use("/alter-existing-item/:item-id", alterExistingItemRoute);
//page for altering existing items from the inventory
//includes updates and deletes

//catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).send("Error 404: Not Found");
});

///////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server is on and listening on port ${PORT}`);
});
