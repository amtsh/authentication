DROP DATABASE IF EXISTS gamico;
CREATE DATABASE gamico;

\c gamico;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR,
  email VARCHAR,
  password VARCHAR
);
