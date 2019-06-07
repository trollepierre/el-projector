import CreateTask from './CreateTask.vue'
import { dummyTask } from '../../utils/test/dummy-task'

describe('CreateTask.vue', () => {
  it('should match snapshot', () => {
    // When
    const wrapper = shallowMount(CreateTask, { propsData: { newTask: dummyTask() } })

    // Then
    expect(wrapper.element).toMatchSnapshot()
  })
})
