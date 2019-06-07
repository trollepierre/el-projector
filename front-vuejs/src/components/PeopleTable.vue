<template>
  <div class="my-table">
    <table>
      <TableHeader
        @sortBirthday="sortBirthday"
        @sortByFirstName="sortByFirstName"
        @sortByLastDate="sortByLastDate"
        @sortByLastName="sortByLastName"
        @sortByNext="sortByNext"
        @sortByOrigin="sortByOrigin"
        @sortByPoints="sortByPoints"
      />
      <tbody>
        <CreateTask
          :new-task="newTask"
          @createNewTask="create"
        />
        <div
          v-for="task in sortedTask"
          :key="task.id"
        >
          <template v-if="isEditable(task)">
            <EditTask
              :task="task"
              @deleteItem="deleteItem"
              @save="save"
            />
          </template>
          <template v-else>
            <Task
              :birthday="isBirthday(task)"
              :task="task"
              @meet="meet"
              @differ="differ"
              @reject="reject"
              @editItem="editItem"
              @deleteItem="deleteItem"
            />
          </template>
        </div>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { equals } from 'ramda'
  import tasksApi from '../api/tasks'
  import meetingApi from '../api/meeting'
  import tasksSorter from '../services/tasks-sorter'
  import TableHeader from './table-header/TableHeader.vue'
  import CreateTask from './create-task/CreateTask.vue'
  import EditTask from './edit-task/EditTask.vue'
  import Task from './task/Task.vue'

  export default {
    name: 'TaskTable',
    components: { Task, EditTask, CreateTask, TableHeader },
    data() {
      return {
        tasks: [],
        editTask: {},
        newTask: {},
      }
    },
    computed: {
      sortedTask() {
        return this.tasks
      },
    },
    mounted() {
      this.fetchTask()
    },
    methods: {
      isEditable(task) {
        return equals(task, this.editTask)
      },
      async fetchTask() {
        this.tasks = await tasksApi.fetch()
      },
      async meet(metTask) {
        const updatedInformations = await meetingApi.meet(metTask)
        this.updateInformation(updatedInformations, metTask.id)
      },
      async differ(task) {
        const updatedInformations = await meetingApi.differ(task)
        this.updateInformation(updatedInformations, task.id)
      },
      async reject(task) {
        const updatedInformations = await meetingApi.reject(task)
        this.updateInformation(updatedInformations, task.id)
      },
      async deleteItem(task) {
        if (confirm('Are you sure you want to delete this item?')) {
          await tasksApi.delete(task)
          this.tasks = this.tasks.filter(({ id }) => id !== task.id)
        }
      },
      editItem(task) {
        this.editTask = task
      },
      async save(task) {
        const updatedInformations = await tasksApi.update(task)
        this.updateInformation(updatedInformations, task.id)
        this.sortByNext()
        this.reset()
      },
      reset() {
        this.newTask = {}
        this.editTask = {}
      },
      async create(task) {
        const createdTask = await tasksApi.create(task)
        this.tasks.push(createdTask)
        this.reset()
        this.sortByNext()
      },
      // TODO refacto this - updateInformation (updatedInformations, idTask, tasks) {
      updateInformation(updatedInformations, id) {
        this.tasks = this.tasks.map(task => {
          if (task.id === id) {
            return { ...task, ...updatedInformations }
          }
          return task
        })
      },
      sortByNext() {
        this.tasks = tasksSorter.next(this.tasks)
      },
      sortByFirstName() {
        this.tasks = tasksSorter.firstName(this.tasks)
      },
      sortByLastName() {
        this.tasks = tasksSorter.lastName(this.tasks)
      },
      sortByPoints() {
        this.tasks = tasksSorter.points(this.tasks)
      },
      sortByLastDate() {
        this.tasks = tasksSorter.lastDate(this.tasks)
      },
      sortByOrigin() {
        this.tasks = tasksSorter.origin(this.tasks)
      },
      sortBirthday() {
        this.tasks = tasksSorter.birthday(this.tasks)
      },
      isBirthday(task) {
        return task.next === task.nextBirthday ? 'birthday' : ''
      },
    },
  }
</script>

<style scoped>
  .my-table {
    padding-top: 30px;
  }

  table {
    width: 100%;
  }
</style>
