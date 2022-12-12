import winston from 'winston';

const {
    format: { json, combine, colorize, simple },
    transports: { File, Console },
    createLogger,
} = winston;
const logger = createLogger({
    level: process.env.WINSTON || 'debug',
    format: json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        new File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});
// const levels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6,
// };

logger.add(
    new Console({
        format: combine(colorize(), simple()),
    }),
);

export default logger;
