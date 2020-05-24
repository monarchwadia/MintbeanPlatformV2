CREATE USER mintbean WITH PASSWORD 'password';
ALTER USER mintbean CREATEDB;

CREATE DATABASE mintbean_development;
\c mintbean_development;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
ALTER DATABASE mintbean_development OWNER TO mintbean;
GRANT ALL PRIVILEGES ON DATABASE mintbean_development TO mintbean;

CREATE DATABASE mintbean_test;
\c mintbean_test;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
ALTER DATABASE mintbean_test OWNER TO mintbean;
GRANT ALL PRIVILEGES ON DATABASE mintbean_test TO mintbean;
