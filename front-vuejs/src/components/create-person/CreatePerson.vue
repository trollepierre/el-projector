<template>
  <tr>
    <form id="create-task" />
    <td class="next">
      <input
        form="create-task"
        value="NEXT"
      >
    </td>
    <td class="first-name">
      <input
        v-model="taskToCreate.firstName"
        form="create-task"
      >
    </td>
    <td class="last-name">
      <input
        v-model="taskToCreate.lastName"
        form="create-task"
      >
    </td>
    <td class="points">
      <input
        v-model="taskToCreate.points"
        form="create-task"
      >
    </td>
    <td class="adjusted-points">
      <input
        v-model="taskToCreate.adjustedPoints"
        form="create-task"
      >
    </td>
    <td class="last-date">
      <input
        v-model="taskToCreate.lastDate"
        form="create-task"
      >
    </td>
    <td class="impact" />
    <td class="birth-date">
      <input
        v-model="taskToCreate.birthDate"
        form="create-task"
      >
    </td>
    <td class="origin">
      <input
        v-model="taskToCreate.origin"
        form="create-task"
      >
    </td>
    <td>
      <AppButton
        :text="'save'"
        @click="create"
      />
    </td>
  </tr>
</template>
<script>
  import AppButton from '../common/app-button/AppButton.vue'

  export default {
    name: 'CreateTask',
    components: { AppButton },
    props: {
      newTask: {
        type: Object, default: () => {
        },
      },
    },
    data() {
      return {
        taskToCreate: {
          ...this.newTask,
        },
      }
    },
    methods: {
      create() {
        this.$emit('createNewTask', this.taskToCreate)
      },
    },
  }
</script>
<style scoped>

  tr {
    display: flex;
    height: 40px;
    width: 100%;
  }

  td {
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  td & input {
    width: 80%;
  }

  input {
    text-align: center;
    flex-shrink: 0;
    width: 80%;
  }

  .impact, .origin {
    flex-grow: 2;
  }

  form {
    display: flex;
    width: 100%;
  }

</style>
