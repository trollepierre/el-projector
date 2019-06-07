import Task from './Task.vue'
import AppButton from '../common/app-button/AppButton.vue'
import { dummyTask } from '../../utils/test/dummy-task'

describe('Task.vue', () => {
  const task = dummyTask()

  it('should match snapshot', () => {
    // When
    const wrapper = shallowMount(Task, { propsData: { task } })

    // Then
    expect(wrapper.element).toMatchSnapshot()
  })

  describe('events', () => {
    it('should meet on click on seen button', () => {
      // Given
      const wrapper = shallowMount(Task, { propsData: { task } })

      // When
      wrapper.findAll(AppButton).at(0).vm.$emit('click')

      // Then
      expect(wrapper.emitted('meet')[0][0]).toEqual(task)
    })

    it('should differ meeting on click on later button', () => {
      // Given
      const wrapper = shallowMount(Task, { propsData: { task } })

      // When
      wrapper.findAll(AppButton).at(1).vm.$emit('click')

      // Then
      expect(wrapper.emitted('differ')[0][0]).toEqual(task)
    })

    it('should reject meeting on click on nope button', () => {
      // Given
      const wrapper = shallowMount(Task, { propsData: { task } })

      // When
      wrapper.findAll(AppButton).at(2).vm.$emit('click')

      // Then
      expect(wrapper.emitted('reject')[0][0]).toEqual(task)
    })
  })
})
