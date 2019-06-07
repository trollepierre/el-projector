import EditTask from './EditTask.vue'
import { dummyTask } from '../../utils/test/dummy-task'

describe('EditTask.vue', () => {
  it('should match snapshot', () => {
    // When
    const wrapper = shallowMount(EditTask, { propsData: { task: dummyTask() } })

    // Then
    expect(wrapper.element).toMatchSnapshot()
  })
})
