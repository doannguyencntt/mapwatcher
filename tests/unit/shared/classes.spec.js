import { sidebarCssClasses, asideMenuCssClasses, validBreakpoints, checkBreakpoint } from '@/shared/classes'
describe('classes.js', () => {
  it('should use fn checkBreakpoint', () => {
    checkBreakpoint(1, [1])
  })
})
