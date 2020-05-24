#!/bin/bash
cd "$(dirname "${BASH_SOURCE[0]}")/.."

echo "WARNING: This is a destructive action that will drop, create, migrate and seed your db. YOU WILL LOSE ALL YOUR DATA. Proceed? y/n"
read go_ahead

if [ $go_ahead == "y" ]
then
  yarn sly db:create;
  yarn sly db:drop && yarn sly db:create;
  # Create UUID extension, which requires superuser
  PGPASSWORD=password psql -U postgres -d mintbean_development -h 0.0.0.0 -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"';
  yarn sly db:migrate && yarn sly db:seed:all;
else
  echo 'Aborted.'
fi
