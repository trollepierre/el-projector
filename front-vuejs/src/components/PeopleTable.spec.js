import Vue from 'vue'
import TaskTable from './TaskTable.vue'
import Task from './task/Task.vue'
import CreateTask from './create-task/CreateTask.vue'
import EditTask from './edit-task/EditTask.vue'
import tasksApi from '../api/tasks'
import { dummyTask } from '../utils/test/dummy-task'
import meetingApi from '../api/meeting'

describe('TaskTable.vue', () => {
  const firstTask = dummyTask()
  const tasks = [firstTask]

  beforeEach(() => {
    // TODO remove it
    Vue.config.silent = true
    tasksApi.fetch = jest.fn()
  })

  describe('template', () => {
    it('should contain a row to create new task', () => {
      // When
      const wrapper = shallowMount(TaskTable, { data: () => ({ tasks }) })

      // Then
      expect(wrapper.find(CreateTask).props()).toEqual({ newTask: {} })
    })

    describe('when tasks contain one task', () => {
      it('should match snapshot', () => {
        // When
        const wrapper = shallowMount(TaskTable, { data: () => ({ tasks }) })

        // Then
        expect(wrapper.element).toMatchSnapshot()
      })

      it('should contain a row with a task', () => {
        // When
        const wrapper = shallowMount(TaskTable, { data: () => ({ tasks }) })

        // Then
        expect(wrapper.find(Task).props()).toEqual({ birthday: '', task: firstTask })
      })
    })

    describe('when one task is being edited', () => {
      it('should match snapshot', () => {
        // Given
        const editTask = dummyTask()

        // When
        const wrapper = shallowMount(TaskTable, { data: () => ({ tasks: [editTask], editTask }) })

        // Then
        expect(wrapper.element).toMatchSnapshot()
      })

      it('should contain a row with an editable task', () => {
        // Given
        const editTask = dummyTask()

        // When
        const wrapper = shallowMount(TaskTable, { data: () => ({ tasks: [editTask], editTask }) })

        // Then
        expect(wrapper.find(EditTask).props()).toEqual({ task: firstTask })
      })
    })
  })

  describe('event', () => {
    describe('Task', () => {
      describe('on click on seen button', () => {
        it('should add meeting to api', () => {
          // Given
          const wrapper = shallowMount(TaskTable, { data: () => ({ tasks }) })
          meetingApi.meet = jest.fn()

          // When
          wrapper.find(Task).vm.$emit('meet', firstTask)

          // Then
          expect(meetingApi.meet).toHaveBeenCalledWith(firstTask)
        })
      })
      describe('on click on later button', () => {
        it('should differ meeting to api', () => {
          // Given
          const wrapper = shallowMount(TaskTable, { data: () => ({ tasks }) })
          meetingApi.differ = jest.fn()

          // When
          wrapper.find(Task).vm.$emit('differ', firstTask)

          // Then
          expect(meetingApi.differ).toHaveBeenCalledWith(firstTask)
        })
      })
      describe('on click on nope button', () => {
        it('should reject meeting to api', () => {
          // Given
          const wrapper = shallowMount(TaskTable, { data: () => ({ tasks }) })
          meetingApi.reject = jest.fn()

          // When
          wrapper.find(Task).vm.$emit('reject', firstTask)

          // Then
          expect(meetingApi.reject).toHaveBeenCalledWith(firstTask)
        })
      })
    })
  })
})
