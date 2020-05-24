#!/bin/bash
cd "$(dirname "${BASH_SOURCE[0]}")/.."

# This script differs from redb.sh
# It does NOT ask for a prompt, 
# and it does NOT run db:seed:all.

yarn sly.test db:create;
yarn sly.test db:drop && yarn sly.test db:create;
# Create UUID extension, which requires superuser
PGPASSWORD=password psql -U postgres -d mintbean_test -h 0.0.0.0 -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"';
yarn sly.test db:migrate;