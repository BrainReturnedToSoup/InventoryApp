const pool = require("../MysqlPool");

async function getInventoryItems(req, res, next) {
  let connection,
    querySucceeded = false;
  //use of flag in order to enable the next transition in the middleware chain
  //this is to let the connection release before moving on

  try {
    connection = pool.getConnection();
    const [rows] = await connection.execute("SELECT * FROM item");

    req.rows = rows;
    querySucceeded = true;
  } catch (error) {
    next(error); //supplies error to error handling middleware
  } finally {
    if (connection) {
      connection.release();
    }
  }

  querySucceeded ? next() : null;
}

function returnCustomView(req, res) {
  const { rows } = req;

  res.render("main-page.ejs", { rows });
}

const mainPagePipeLine = [getInventoryItems, returnCustomView];

module.exports = { getInventoryItems, returnCustomView, mainPagePipeLine };
