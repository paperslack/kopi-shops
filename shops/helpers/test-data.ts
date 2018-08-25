import { filter } from 'ramda'
import { TestData } from './definitions'

export const filterTestData = (testDataFlag: boolean, coll: TestData[]): TestData[] =>
  filter(el => el.test || testDataFlag, coll)
