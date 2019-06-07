<template>
  <thead>
    <th class="next">
      <AppButton
        :background-color="'cyan'"
        :color="'black'"
        :text="'Next'"
        @click="sortByNext"
      />
    </th>
    <th class="first-name">
      <AppButton
        :background-color="'cyan'"
        :color="'black'"
        :text="'FirstName'"
        @click="sortByFirstName"
      />
    </th>
    <th class="last-name">
      <AppButton
        :background-color="'cyan'"
        :color="'black'"
        :text="'LastName'"
        @click="sortByLastName"
      />
    </th>
    <th class="points">
      <AppButton
        :background-color="'cyan'"
        :color="'black'"
        :text="'Points'"
        @click="sortByPoints"
      />
    </th>
    <th class="adjusted-points">
      <AppButton
        :background-color="'cyan'"
        :color="'black'"
        :text="'Adjusted Points'"
        @click="sortByPoints"
      />
    </th>
    <th class="last-date">
      <AppButton
        :background-color="'cyan'"
        :color="'black'"
        :text="'LastDate'"
        @click="sortByLastDate"
      />
    </th>
    <th class="impact">
      Impact
    </th>
    <th class="birth-date">
      <AppButton
        :background-color="'cyan'"
        :color="'black'"
        :text="'BirthDate'"
        @click="sortBirthday"
      />
    </th>
    <th class="origin">
      <AppButton
        :background-color="'cyan'"
        :color="'black'"
        :text="'Origin'"
        @click="sortByOrigin"
      />
    </th>
    <th class="action">
      Action
    </th>
  </thead>
</template>
<script>
  import AppButton from '../common/app-button/AppButton.vue'

  export default {
    name: 'TableHeader',
    components: { AppButton },
    methods: {
      sortBirthday() {
        this.$emit('sortBirthday')
      },
      sortByFirstName() {
        this.$emit('sortByFirstName')
      },
      sortByLastDate() {
        this.$emit('sortByLastDate')
      },
      sortByLastName() {
        this.$emit('sortByLastName')
      },
      sortByNext() {
        this.$emit('sortByNext')
      },
      sortByOrigin() {
        this.$emit('sortByOrigin')
      },
      sortByPoints() {
        this.$emit('sortByPoints')
      },
    },
  }
</script>
<style scoped>

  thead {
    display: flex;
    height: 40px;
  }

  thead {
    width: 100%;
  }

  th {
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
  }

  .impact, .origin {
    flex-grow: 2;
  }

</style>
