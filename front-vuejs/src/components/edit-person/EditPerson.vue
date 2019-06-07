<template>
  <tr>
    <td class="next">
      <input v-model="taskToEdit.next">
    </td>
    <td class="first-name">
      <input v-model="taskToEdit.firstName">
    </td>
    <td class="last-name">
      <input v-model="taskToEdit.lastName">
    </td>
    <td class="points">
      <input v-model="taskToEdit.points">
    </td>
    <td class="adjusted-points">
      <input v-model="taskToEdit.adjustedPoints">
    </td>
    <td class="last-date">
      <input v-model="taskToEdit.lastDate">
    </td>
    <td class="impact" />
    <td class="birth-date">
      <input v-model="taskToEdit.birthDate">
    </td>
    <td class="origin">
      <input v-model="taskToEdit.origin">
    </td>
    <td>
      <AppButton
        :background-color="'blue'"
        :color="'white'"
        :text="'save'"
        @click="save"
      />
      <AppButton
        :text="'delete'"
        @click="deleteItem"
      />
    </td>
  </tr>
</template>
<script>
  import AppButton from '../common/app-button/AppButton.vue'

  export default {
    name: 'EditTask',
    components: { AppButton },
    props: {
      task: {
        type: Object, default: () => {},
      },
    },
    data() {
      return {
        taskToEdit: {
          ...this.task,
        },
      }
    },
    methods: {
      save() {
        this.$emit('save', this.taskToEdit)
      },
      deleteItem() {
        this.$emit('deleteItem', this.taskToEdit)
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
