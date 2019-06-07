import { createLocalVue, shallowMount, mount, RouterLinkStub } from '@vue/test-utils'

// Export vue-test-utils methods globally
global.RouterLinkStub = RouterLinkStub
global.createLocalVue = createLocalVue
global.shallowMount = shallowMount
global.mount = mount

expect.extend({
  toHaveBeenCalledOnceWith(received, ...args) {
    expect(received).toHaveBeenCalledTimes(1)
    expect(received).toHaveBeenCalledWith(...args)
    return { pass: true }
  },
})
