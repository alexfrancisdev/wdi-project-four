const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./config/router');
const { port, dbUri } = require('./config/environment');
const errorHandler = require('./lib/errorHandler');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbUri);

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(errorHandler);

app.use('/api', router);
// Not in original

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.listen(port, () => console.log(`Express is listening on port ${port}`));

module.exports = app;
