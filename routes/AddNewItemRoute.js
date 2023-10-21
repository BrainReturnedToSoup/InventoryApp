const express = require("express");
const router = express.Router();

const {
  addNewItemChangePipeline,
  addNewItemPagePipeline,
} = require("../middleware/AddNewItemMiddleware.js");

router.get("/add-new-item", addNewItemPagePipeline); //for the web page with the form

router.post("./add-new-item", addNewItemChangePipeline); //end point for actually making said change

module.exports = router;
