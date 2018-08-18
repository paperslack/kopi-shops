import { configLogger, IKopiLogger, IKopiLoggerOptions } from '@kopi/commons'

const {
  AWS_REGION,
  AWS_DEFAULT_REGION,
  AWS_LAMBDA_FUNCTION_NAME,
  AWS_LAMBDA_FUNCTION_VERSION,
  AWS_EXECUTION_ENV,
  AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
} = process.env

const config: IKopiLoggerOptions = {
  name: 'basket-api',
  level: 'info',
  meta: {
    awsRegion: AWS_REGION || AWS_DEFAULT_REGION,
    functionName: AWS_LAMBDA_FUNCTION_NAME,
    functionVersion: AWS_LAMBDA_FUNCTION_VERSION,
    functionMemorySize: AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
    executionEnv: AWS_EXECUTION_ENV,
  },
}

export const logger: IKopiLogger = configLogger(config)
