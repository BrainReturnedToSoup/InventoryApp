const pool = require("../MysqlPool");

async function addNewItem(req, res, next) {
  let connection,
    querySucceeded = false;

  try {
    const {} = req.body;

    connection = await pool.getConnection();
    await connection.execute(
      `INSERT INTO item (item_name, item_desc, category, brand, price, num_in_stock)
      SET item_name = ?, item_desc = ?, category = ?, brand = ?, price = ?, num_in_stock = ?`,
      [] //corresponding form field variables go here
    );
  } catch (error) {
    next(error);
  } finally {
    connection.release();
  }

  querySucceeded ? next() : null;
}

const addNewItemChangePipeline = [addNewItem];

//page middleware here


const addNewItemPagePipeline = []

module.exports = { addNewItemChangePipeline, addNewItemPagePipeline};
