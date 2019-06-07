import Page from './Page.vue'

describe('Page.vue', () => {
  it('should match snapshot', () => {
    // When
    const wrapper = shallowMount(Page)

    // Then
    expect(wrapper.element).toMatchSnapshot()
  })
})
