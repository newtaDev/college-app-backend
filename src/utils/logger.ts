import { createLogger, format, Logger, transports } from 'winston';
import { AppKeys } from '../config/keys/app_keys';
import _ from 'lodash';
const prodLogger = () =>
  createLogger({
    level: 'warn',
    // format: winston.format.simple(),
    format: format.combine(format.timestamp(), format.json()),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),
      new transports.File({
        filename: AppKeys.error_log_path,
      }),
    ],
  });

const devLoger = () => {
  const myFormat = format.printf(({ level, message, ...others }) => {
    // removes `timestamp` filed from `object`
    const rawMessage = _.omit(others, ['timestamp']);
    const _msgAsObject: object = JSON.parse(JSON.stringify(rawMessage));
    if (!_.isEmpty(_msgAsObject)) console.log(_msgAsObject);

    return typeof message == 'object'
      ? `[ ${level} ]:  ${JSON.stringify(message)}`
      : `[ ${level} ]:  ${message}`;
  });

  return createLogger({
    level: 'debug',
    format: format.combine(
      format.colorize({ colors: { info: 'blue', debug: 'green' } }),
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
