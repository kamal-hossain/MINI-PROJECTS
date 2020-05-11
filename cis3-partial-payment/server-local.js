'use strict';

const app = require('./functions/server');

app.listen(process.env.PORT_EXPRESS_LAMBDA, () =>
  console.log(`Local app listening on port ${process.env.PORT_EXPRESS_LAMBDA}!`)
);
