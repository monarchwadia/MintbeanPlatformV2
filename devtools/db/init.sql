CREATE DATABASE mintbean_development;


CREATE USER mintbean WITH PASSWORD 'password';


ALTER USER mintbean CREATEDB;

GRANT ALL PRIVILEGES ON DATABASE mintbean_development TO mintbean;

