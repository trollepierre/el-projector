<template>
  <tr>
    <td
      :class="birthday"
      class="next"
    >
      {{ taskToShow.next }}
    </td>
    <td class="first-name">
      {{ taskToShow.firstName }}
    </td>
    <td class="last-name">
      {{ taskToShow.lastName }}
    </td>
    <td class="points">
      {{ taskToShow.points }}
    </td>
    <td class="adjusted-points">
      {{ taskToShow.adjustedPoints }}
    </td>
    <td class="last-date">
      {{ taskToShow.lastDate }}
    </td>
    <td class="impact">
      <AppButton
        :background-color="'green'"
        :color="'white'"
        :text="'seen'"
        @click="meet"
      />
      <AppButton
        :background-color="'orange'"
        :color="'white'"
        :text="'later'"
        @click="differ"
      />
      <AppButton
        :background-color="'red'"
        :color="'white'"
        :text="'nope'"
        @click="reject"
      />
    </td>
    <td class="birth-date">
      {{ taskToShow.birthDate }}
    </td>
    <td class="origin">
      {{ taskToShow.origin }}
    </td>
    <td>
      <AppButton
        :text="'edit'"
        @click="editItem"
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
    name: 'Task',
    components: { AppButton },
    props: {
      task: { type: Object, default: () => {} },
      birthday: { type: String, default: () => '' },
    },
    data() {
      return {
        taskToShow: {
          ...this.task,
        },
      }
    },
    methods: {
      meet() {
        this.$emit('meet', this.task)
      },
      differ() {
        this.$emit('differ', this.task)
      },
      reject() {
        this.$emit('reject', this.task)
      },
      editItem() {
        this.$emit('editItem', this.task)
      },
      deleteItem() {
        this.$emit('deleteItem', this.task)
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
    width: 80%;
  }

  .impact, .origin {
    flex-grow: 2;
  }

  .birthday {
    color: red;
    background-color: aqua;
  }
</style>
