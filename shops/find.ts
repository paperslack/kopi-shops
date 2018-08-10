import { APIGatewayEvent, Callback, Context } from 'aws-lambda'
import middy = require('middy')
import { ok, internalError } from '@kopi/commons'
import { eventLogger, httpErrorHandler } from '@kopi/middy-middleware';
const { httpHeaderNormalizer, httpEventNormalizer } = require('middy/middlewares')

import { getFeatureFlags, filterTestData } from './helpers'
import { shops, findShop, Shop } from './shops'
import { logger } from './log'
import { notFound } from '../../kopi-commons/src/http';

const find = middy(async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  const { test_data } = getFeatureFlags(event)
  const { id } = event.queryStringParameters
  const availableShops = filterTestData(test_data, shops) as Shop[]

  if (!id) {
    return ok(availableShops)
  }

  const shop = findShop(id, availableShops)
  if (!!shop) {
    return ok(shop)
  }

  return notFound({id})
})



find
  .use(httpHeaderNormalizer())
  .use(httpEventNormalizer())
  .before(eventLogger({logger, error: internalError}))
  .use(httpErrorHandler({logger, error: internalError}))

export { find }
