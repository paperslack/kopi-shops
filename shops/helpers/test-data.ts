import { filter } from 'rambda'
import { TestData } from './definitions'

export const filterTestData = (testDataFlag: boolean, coll: TestData[]) =>
  filter(el => el.test || testDataFlag, coll)
