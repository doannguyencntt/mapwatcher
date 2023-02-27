import toggleClasses from '@/shared/toggle-classes'

describe('toggle-classes.js', () => {
  it('should use fn toggleClass', () => {
    toggleClasses('classA', ['ClassA', 'ClassB'])
  })
})
