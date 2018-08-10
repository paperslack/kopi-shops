import { configLogger, IKopiLogger, IKopiLoggerOptions } from '@kopi/commons'

const config: IKopiLoggerOptions = {
  name: 'basket-api',
  level: 'info',
}

export const logger: IKopiLogger = configLogger(config)
