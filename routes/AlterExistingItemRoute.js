const express = require("express");
const router = express.Router();

const {
  itemNamePipeline,
  itemDescPipeline,
  categoryPipeline,
  brandPipeline,
  pricePipeline,
  numInStockPipeline,
} = require("../middleware/AlterExistingItemMiddleware");

const baseRoute = "/alter";

router.post(`${baseRoute}/item-name/:itemID`, itemNamePipeline);

router.post(`${baseRoute}/item-desc/:itemID`, itemDescPipeline);

router.post(`${baseRoute}/category/:itemID`, categoryPipeline);

router.post(`${baseRoute}/brand/:itemID`, brandPipeline);

router.post(`${baseRoute}/price/:itemID`, pricePipeline);

router.post(`${baseRoute}/num-in-stock/:itemID`, numInStockPipeline);

module.exports = router;
