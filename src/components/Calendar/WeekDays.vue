<template>
  <ol class="head-weekdays">
    <li v-for="day in weekdays" :key="day">{{ day }}</li>
  </ol>
</template>

<script>
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default {
  computed: {
    weekdays() {
      return WEEKDAYS;
    },
  },
};
</script>

<style scoped>
.head-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style-type: none;
}

.head-weekdays > * {
  text-align: right;
  padding-right: 5px;
}
</style>
