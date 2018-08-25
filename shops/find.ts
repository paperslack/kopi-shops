import { APIGatewayEvent, Context } from 'aws-lambda'
import middy = require('middy')
import { ok, notFound } from '@kopi/commons'
import {
  httpErrorHandler,
  captureCorrelationData,
  captureSampleLogDebugRate,
  loggerInitialization,
  eventLogger
} from '@kopi/middy-middleware';

const { httpHeaderNormalizer, httpEventNormalizer } = require('middy/middlewares')

import { getFeatureFlags, filterTestData } from './helpers'
import { shops, findShop, Shop } from './shops'
import { getLogger, initLogger } from './log';

const find = middy(async (event: APIGatewayEvent, context: Context) => {
  const logger = getLogger()
  const { test_data } = getFeatureFlags(event)
  const { id } = event.queryStringParameters
  const availableShops = filterTestData(test_data, shops) as Shop[]

  if (!id) {
    logger.info({availableShops}, 'available shops')
    return ok(availableShops)
  }

  const shop = findShop(id, availableShops)
  if (shop) {
    logger.info({shop}, 'shop found')
    return ok(shop)
  }

  logger.info({id, availableShops}, 'shop not found')
  return notFound({id})
})

find
  .use(captureCorrelationData({logger: getLogger()}))
  .use(captureSampleLogDebugRate({}))
  .use(loggerInitialization({ initLogger }))
  .use(httpHeaderNormalizer())
  .use(httpEventNormalizer())
  .before(eventLogger({logger: getLogger()}))
  .use(httpErrorHandler({logger: getLogger()}))

export { find }
