const app = require("./src/app");

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  console.dir(error.stack);
  // application specific logging, throwing an error, or other logic here
});

const listener = app.listen(process.env.PORT || 3001, () => {
  console.log("App listening on port:", listener.address().port);
});