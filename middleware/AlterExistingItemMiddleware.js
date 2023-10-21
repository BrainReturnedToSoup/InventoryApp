const pool = require("../MysqlPool");

const validAttributes = [
  "item_name",
  "item_desc",
  "category",
  "brand",
  "price",
  "num_in_stock",
];

async function updateItemAttributeVal(req, res, next) {
  const { itemID, targetAttribute, newVal } = req;

  if (!validAttributes.includes(targetAttribute)) {
    return next(new Error("Invalid attribute"));
  } //valid attribute validation

  let connection,
    querySucceeded = false;
  //flag for making sure 'next()' executes after the connection is released

  try {
    connection = await pool.getConnection();
    await connection.execute(
      `UPDATE item SET ${targetAttribute} = ? WHERE id = ?`,
      [newVal, itemID]
    ); //input sanitization

    querySucceeded = true;
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }

  querySucceeded ? next() : null;
}

function itemNameEntryPoint(req, res, next) {
  req.targetAttribute = validAttributes[0];
  req.newVal = req.body; //add property reference after the view has been made

  next();
}

function itemDescEntryPoint(req, res, next) {
  req.targetAttribute = validAttributes[1];
  req.newVal = req.body; //add property reference after the view has been made

  next();
}

function categoryEntryPoint(req, res, next) {
  req.targetAttribute = validAttributes[2];
  req.newVal = req.body; //add property reference after the view has been made

  next();
}

function brandEntryPoint(req, res, next) {
  req.targetAttribute = validAttributes[3];
  req.newVal = req.body; //add property reference after the view has been made

  next();
}

function priceEntryPoint(req, res, next) {
  req.targetAttribute = validAttributes[4];
  req.newVal = req.body; //add property reference after the view has been made

  next();
}

function numInStockEntryPoint(req, res, next) {
  req.targetAttribute = validAttributes[5];
  req.newVal = req.body; //add property reference after the view has been made

  next();
}

const pipelines = {
  itemNamePipeline: [itemNameEntryPoint, updateItemAttributeVal],
  itemDescPipeline: [itemDescEntryPoint, updateItemAttributeVal],
  categoryPipeline: [categoryEntryPoint, updateItemAttributeVal],
  brandPipeline: [brandEntryPoint, updateItemAttributeVal],
  pricePipeline: [priceEntryPoint, updateItemAttributeVal],
  numInStockPipeline: [numInStockEntryPoint, updateItemAttributeVal],
};

module.exports = pipelines;
