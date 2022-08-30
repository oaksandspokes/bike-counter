# bike-counter
Open Source Bike Counter Project


## How to setup
This will help you set up your local to push to remote branch for heroku
git push heroku main - this will trigger a rebuild.
https://devcenter.heroku.com/articles/getting-started-with-nodejs

This will setup your local database to be able to connect to the remote
Note: I was unable to get the DB to work locally but postgres was able to connect to the remote database to allow for modification.
https://devcenter.heroku.com/categories/heroku-postgres

This is the extension we are using for storing the geometric point for lat_long
https://postgis.net/ 


## Endpoints

### GET
https://bike-counter.herokuapp.com/v1/location/:name 
Will return the count of all bikes under that name.

### POST
https://bike-counter.herokuapp.com/v1/location 
{
    "lat": 30.4415,
    "long": -98.7680,
    "name": "End of the rainbow batched",
    "count": 2,
    "batchTimeStart": "2022-08-30T18:10:04.726Z",
    "batchTimeEnd": "2022-08-30T18:12:04.726Z"
}

Will add the new location with its count.
If count is null it defaults to 0. 
batchTimeStart and batchTimeEnd are optional.

## TODO
* Fix inputs to block sql injections: https://www.npmjs.com/package/pg-format
* Fix security to not allow everything thing to submit data
* Fix name having a '. It currently breaks the insert query.
* Use a timeframe from request to determine when to start count for location
* Use lat_long OR name for querying, we currently only worry about name
* Use a specific granularity for lat_long, I.E. 6 digits.
* Write some tests :D

## Current table
create table locations_table (lat_long geometry, name text, bike_count int, batch_time_start timestampz, batch_time_end timestampz, created_date timestampz not null default current_timestamp);