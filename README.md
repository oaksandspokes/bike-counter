# bike-counter
Open Source Bike Counter Project

create table locations_table (lat_long point, name text, bike_count int, batch_time_start timestamp, batch_time_end timestamp, created_date timestamp not null default current_timestamp);