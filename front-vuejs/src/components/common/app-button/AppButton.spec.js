import AppButton from './AppButton.vue'

describe('AppButton.vue', () => {
  it('should match snapshot', () => {
    // When
    const wrapper = shallowMount(AppButton)

    // Then
    expect(wrapper.element).toMatchSnapshot()
  })
})
