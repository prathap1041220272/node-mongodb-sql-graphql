const { createLogger, transports, format } = require('winston');
const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
    format: combine(timestamp(), prettyPrint()),
    transports: [
        new transports.File({
            filename: 'combined.log', level: 'warn'
        }),
        new transports.File({
            filename: 'combined.log', level: 'info',
            timestamp: true,
            colorize: true,
            handleExceptions: true,
            humanReadableUnhandledException: true,
            prettyPrint: true,
            json: true
        }),
        new transports.File({
            filename: 'error.log', level: 'error',
            timestamp: true,
            colorize: true,
            handleExceptions: true,
            humanReadableUnhandledException: true,
            prettyPrint: true,
            json: true
        })
    ],
});

logger.stream = {
    write: function (message) {
        logger.debug(message);
    }
};

module.exports = { logger };