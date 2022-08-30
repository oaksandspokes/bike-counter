const ROW_NAMES = require('../../constants').ROW_NAMES;
const DATABASE_NAME = require('../../constants').DATABASE_NAME;

async function getCount(req, res, pool) {
    try {
        // TODO: Convert TS to UTC
        const fromTime = req.query.fromTime;
        const lat   = req.query.lat;
        const long  = req.query.long;
        const name  = req.params.name;

        let whereClause;

        if (!!lat && !!long) {
            whereClause = `WHERE ${ROW_NAMES.latLong} = ST_PointFromText('point(${lat} ${long})')`;
        } else if (!!name) {
            whereClause = `WHERE ${ROW_NAMES.name} = '${name}'`;
        } else {
            res.send("Error: lat_long or name is required.");
            return;
        }

        // TODO: validate fromTime is a timestamp.
        if (!!fromTime) {
            whereClause += ` AND ${ROW_NAMES.createdDate} >= timestamp ${fromTime}`;
        }

        // TODO: SQL injection? https://www.npmjs.com/package/pg-format
        const client = await pool.connect();
        const query = `SELECT (${ROW_NAMES.count, ROW_NAMES.name}) FROM ${DATABASE_NAME} ${whereClause}`;
        const result = await client.query(query);
        console.log(result);
        res.send(result[0]);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
};

module.exports = getCount;