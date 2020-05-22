CREATE USER mintbean WITH PASSWORD 'password';
ALTER USER mintbean CREATEDB;

CREATE DATABASE mintbean_development;
ALTER DATABASE mintbean_development OWNER TO mintbean;
GRANT ALL PRIVILEGES ON DATABASE mintbean_development TO mintbean;

CREATE DATABASE mintbean_test;
ALTER DATABASE mintbean_test OWNER TO mintbean;
GRANT ALL PRIVILEGES ON DATABASE mintbean_test TO mintbean;
