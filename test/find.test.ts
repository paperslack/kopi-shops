import { event } from './__mocks__/request.event'
import { event as eventWithFeatureFlag } from './__mocks__/request.with-feature-flag.event'
import { find } from '../shops/find'
import { logger } from '../shops/log';

const sinon = require('sinon')

interface KopiResponse {
  body: string
  statusCode: number
}

describe('find.endpoint.test', () => {

  beforeAll(() => {
    sinon.stub(logger, 'error').returns();
    sinon.stub(logger, 'info').returns();
  })

  afterAll(() => {
    (logger.error as any).restore();
    (logger.info as any).restore();
  })

  it('should return an array without test data', () => {
    find(event, null, (e, resp: KopiResponse) => {
      const actual = JSON.parse(resp.body)

      expect(resp.statusCode).toEqual(200)
      expect(actual.length).toEqual(2)
    })
  })

  it('should return an array with test data', () => {
    find(eventWithFeatureFlag, null, (e, resp: KopiResponse) => {
      const actual = JSON.parse(resp.body)

      expect(resp.statusCode).toEqual(200)
      expect(actual.length).toEqual(4)
    })
  })
})
