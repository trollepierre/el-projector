import apiService from '../services/api-service'
import tasksSorter from '../services/tasks-sorter'

const TaskApi = {

  async fetch() {
    const tasks = await apiService.get('tasks')
    return tasksSorter.next(tasks)
  },

  delete({ id }) {
    return apiService.delete(`tasks/${id}`)
  },

  update(task) {
    return apiService.put(`tasks/${task.id}`, task)
  },

  create(task) {
    return apiService.post('tasks', task)
  },
}

export default TaskApi
