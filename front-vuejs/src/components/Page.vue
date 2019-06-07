<template>
  <div class="page">
    <TaskTable />
  </div>
</template>

<script>
import TaskTable from './TaskTable.vue'

export default {
  name: 'HelloWorld',
  components: { TaskTable },
}
</script>

<style scoped>
h1 {
  font-weight: normal;
}
</style>
