import App from './App.vue'

describe('App.vue', () => {
  it('should match snapshot', () => {
    // When
    const wrapper = shallowMount(App)

    // Then
    expect(wrapper.element).toMatchSnapshot()
  })
})
