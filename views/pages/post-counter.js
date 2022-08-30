const ROW_NAMES = require('../../constants').ROW_NAMES;
const DATABASE_NAME = require('../../constants').DATABASE_NAME;

async function postCounter(req, res, pool) {
  try {
    // Convert TS to UTC
    // Validate lat long
    // Grab existing location
    // Add to location count
    // insert into locations_table (lat_long, name) values (ST_PointFromText('point(31.0528 -99.7185)'), 'test location');
    const lat   = req.body.lat;
    const long  = req.body.long;
    const count = req.body.count || 1;
    const name  = req.body.name;

    // TODO: convert to UTC
    const batchTimeStart = req.body.batchTimeStart;
    const batchTimeEnd   = req.body.batchTimeEnd;

    if (!lat || !long || !name) {
      res.send("Error: Lat, Long, and name have to be provided.");
      return;
    }

    // TODO: SQL injection? https://www.npmjs.com/package/pg-format
    const insert = 
      `INSERT INTO ${DATABASE_NAME} (${ROW_NAMES.latLong}, ${ROW_NAMES.name}, ${ROW_NAMES.count}, ${ROW_NAMES.batchTimeStart}, ${ROW_NAMES.batchTimeEnd}) 
      VALUES (ST_PointFromText('point(${lat} ${long})'), '${name}', ${count}, ${batchTimeStart}, ${batchTimeEnd}) RETURNING *`;
    console.log(insert);
    const client = await pool.connect();
    const insertResult = await client.query(insert);
    res.send(insertResult[0]);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
};

module.exports = postCounter;