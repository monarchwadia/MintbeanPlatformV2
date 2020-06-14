# Getting started

## Architectural overview

* Major frameworks: Express, Passport, Sequelize, Jest
* Database: Postgres

## Starting the dev database

The fastest way to get your dev DB setup is to start the dev database using docker.

```bash
cd devtools/db
docker-compose up -d
```

### Credentials:

You probably won't need this. But just in case you do:

### Application client user

```
# MUST BE SUPERUSER
Username: mintbean
Password: password
Database: mintbean_development
```

### Admin user

```
Username: postgres
Password: password
Database: postgres
```

## Starting the API server

```bash
yarn install
yarn dev
```

## Unit testing

Unit tests are done on a live DB and depend on a DB in order to run. (namely, the `mintbean_development` database on postgres)

### Commands

`yarn test` to run unit tests once

`yarn tdd` to run in TDD mode

Also see the [CLI commands](#cli-commands) section

## Environment Variables

| Name        | Default    | Description | Environment |
| ---- |          --- | ----------- | ----------- |
| DB_DATABASE | None | Database to connect to | Production |
| DB_USERNAME | None | DB username | Production |
| DB_PASSWORD | None | Database to connect to | Production |
| DB_HOST     | None | Database to connect to | Production |
| DB_PORT     | None | Database to connect to | Production |

## Dev Tools

### CLI commands

Test-environment variants of a command have `test` somewhere in their name.

`yarn sly` and `yarn sly.test` give you access to the CLI tool in development mode

`./bin/psql.sh` and `./bin/psql.test` connect you to the DB

`./bin/redb.sh` and `./bin/redb-test.sh` drop the current DB and redo it from scratch