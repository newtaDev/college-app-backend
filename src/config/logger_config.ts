import { createLogger, format, Logger, transports } from 'winston';
import { AppKeys } from './keys/app_keys';

const prodLogger= () =>
  createLogger({
    level: 'warn',
    // format: winston.format.simple(),
    format: format.combine(format.timestamp(), format.json()),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),
      new transports.File({
        filename: 'errors.log',
      }),
    ],
  });

const devLoger = () => {
  const myFormat = format.printf(({ level, message, timestamp }) =>
    typeof message == 'object'
      ? `${timestamp} [ ${level} ]:  ${JSON.stringify(message)}`
      : `${timestamp} [ ${level} ]:  ${message}`
  );

  return createLogger({
    level: 'debug',
    format: format.combine(
      format.colorize({ colors: { info: 'blue', debug: 'white' } }),
      format.prettyPrint(),
      format.timestamp({ format: 'HH:mm:ss - a' }),
      myFormat,
      format.splat()
    ),
    transports: [new transports.Console()],
  });
};

let logger: Logger;

if (AppKeys.env == 'production') {
  logger = prodLogger();
} else {
  logger = devLoger();
}

export default logger;