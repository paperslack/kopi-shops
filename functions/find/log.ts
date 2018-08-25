import { configLogger, IKopiLogger, IKopiLoggerOptions } from '@kopi/commons'

export let logger: IKopiLogger

export const getLogger = () => logger

const DEFAULT_CONFIG: IKopiLoggerOptions = {
  name: 'basket-api',
  level: 'info',
  meta: {},
}

export const initLogger = (options: any = {}): IKopiLogger => {
  const config = Object.assign(DEFAULT_CONFIG, options)
  logger = configLogger(config)

  return logger
}
