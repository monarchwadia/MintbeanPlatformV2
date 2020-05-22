# Getting started

## Starting the dev database

The fastest way to get your dev DB setup is to start the dev database using docker.

```bash
cd devtools/db
docker-compose up -d
```

### CLI commands:

`yarn sly` gives you access to the CLI tool

`yarn psql` logs into the database with the application client user

### Credentials:

### Application client user

```
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

