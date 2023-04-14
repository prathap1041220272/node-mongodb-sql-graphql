require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const { Configurations } = require('./app/config/configurations');
const { loadConnections } = require('./app/connections');
const { UserContext } = require('./app/helpers/user-context.helper');
// eslint-disable-next-line no-undef
const serverEnvironment = Configurations.server;

loadConnections();

app.use(cors());
app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true, parameterLimit: 5000 }));
app.use(compression());

app.use(UserContext);

require('./app/routes')(app);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// error handler middleware
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});

app.listen(serverEnvironment.port, () => {
    console.log(`Server started at port ${serverEnvironment.port}, environment: ${serverEnvironment.environment}`);
});