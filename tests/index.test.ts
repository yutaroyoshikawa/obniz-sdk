import { helloWorld } from '../src/index'

test('basic', () => {
  expect(helloWorld('John')).toBe('Hello John')
})

test('Failed', () => {
  expect(helloWorld('')).toBe('Hello ')
})
