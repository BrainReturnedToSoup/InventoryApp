const express = require("express");
const router = express.Router();

const mainPagePipeLine = Require(
  "../middleware/MainPageMiddleware.js"
).mainPagePipeLine;

router.get("/", mainPagePipeLine);

module.exports = router;
