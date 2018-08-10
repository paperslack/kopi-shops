import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda'
import middy = require('middy')
import { ok, internalError } from '@kopi/commons'
import { eventLogger, httpErrorHandler } from '@kopi/middy-middleware';
const { httpHeaderNormalizer } = require('middy/middlewares')

import { getFeatureFlags, filterTestData } from './helpers'
import { shops } from './shops'
import { logger } from './log'

const find = middy((event: APIGatewayEvent, context: Context, cb: Callback) => {
  const { test_data } = getFeatureFlags(event)
  const response = ok(filterTestData(test_data, shops))

  cb(null, response)
})

find
  .use(httpHeaderNormalizer())
  .before(eventLogger({logger, error: internalError}))
  .use(httpErrorHandler({logger, error: internalError}))

export { find }
