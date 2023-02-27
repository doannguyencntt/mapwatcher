import { random, shuffleArray, buildUrlQueryString } from '@/shared/utils'

describe('util.js', () => {
  it('should use fn of "utils', () => {
    random(1, 10)
    shuffleArray([1, 2, 3, 4, 5])
  })

  it('should build correct query string', () => {
    // setup
    const obj = {
      id: 1,
      test: 'test'
    }
    // exec
    const result = buildUrlQueryString(obj)
    // validate
    expect(result).toBe('id=1&test=test')
  })
})
