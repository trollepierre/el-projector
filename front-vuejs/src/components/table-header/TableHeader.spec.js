import TableHeader from './TableHeader.vue'

describe('TableHeader.vue', () => {
  it('should match snapshot', () => {
    // When
    const wrapper = shallowMount(TableHeader)

    // Then
    expect(wrapper.element).toMatchSnapshot()
  })
})
