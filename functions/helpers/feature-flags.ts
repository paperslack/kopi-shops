import { APIGatewayEvent } from 'aws-lambda'
import { reduce, split } from 'ramda'
import { FeatureFlags } from './definitions'

const X_FEATURE_FLAG = 'X-Feature-Flag'

export const getFeatureFlags = (event: APIGatewayEvent): FeatureFlags => {
  const flags = split(',', event.headers[X_FEATURE_FLAG] || '')

  const fromArrayToObject = (memo, el) => {
    memo[el] = true
    return memo
  }

  return reduce(fromArrayToObject, {}, flags)
}
