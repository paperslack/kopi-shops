import { event } from './__mocks__/request.event'
import { event as eventByShopID } from './__mocks__/request-by-id.event'
import { event as eventShopNotFound } from './__mocks__/request-by-id.event.not-found'
import { event as eventWithFeatureFlag } from './__mocks__/request.with-feature-flag.event'
import { find } from '../shops/find'

const sinon = require('sinon')

process.on('unhandledRejection', (reason) => {
	console.log('REJECTION', reason)
})

interface KopiResponse {
  body: string
  statusCode: number
}

describe('find.endpoint.test', () => {
  beforeAll(() => {
    // sinon.stub(logger, 'error').returns();
    // sinon.stub(logger, 'info').returns();
  })

  afterAll(() => {
    // (logger.error as any).restore();
    // (logger.info as any).restore();
  })

  it('should return an array without test data', async () => {
    return find(event, null, (e, resp: KopiResponse) => {
      const actual = JSON.parse(resp.body)

      expect(resp.statusCode).toEqual(200)
      expect(actual.length).toEqual(2)
    })
  })

  it('should return shop', async () => {
    return find(eventByShopID, null, (e, resp: KopiResponse) => {
      const actual = JSON.parse(resp.body)

      expect(resp.statusCode).toEqual(200)
      expect(actual.id).toEqual(1)
    })
  })

  it('should return a 404 not found reponse',  async () => {
    return find(eventShopNotFound, null, (e, resp: KopiResponse) => {
      expect(resp.statusCode).toEqual(404)
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
