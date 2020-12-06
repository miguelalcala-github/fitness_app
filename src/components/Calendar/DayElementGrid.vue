<template>
  <li
    class="calendar-day"
    :class="{
      'calendar-day--not-current': !day.isCurrentMonth,
      'calendar-day--today': isToday,
    }"
  >
    <span>{{ label }}</span>
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="'calendar-item--' + item.type.toLowerCase()"
      >
        {{ item.item }}
      </li>
    </ul>
  </li>
</template>

<script>
import { db } from "@/main";
export default {
  props: {
    day: {
      type: Object,
      required: true,
    },

    isCurrentMonth: {
      type: Boolean,
      default: false,
    },

    isToday: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [],
      date: this.day.date,
    };
  },
  mounted() {
    this.getItems();
  },
  methods: {
    async getItems() {
      const formatDate = this.formatDate;
      try {
        await db
          .collection("items")
          .where("date", "==", formatDate)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              let data = doc.data();
              data.id = doc.id;
              this.items.push(data);
            });
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
          });
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    label() {
      return this.day.date.getDate();
    },
    formatDate() {
      const year = this.day.date.getFullYear();
      const month = this.day.date.getMonth() + 1;
      const date = this.day.date.getDate();
      const day = date < 10 ? "0" + date : date;
      return `${year}-${month}-${day}`;
    },
  },
};
</script>

<style scoped>
.calendar-day {
  position: relative;
  min-height: 100px;
  font-size: 16px;
  background-color: #fff;
  color: var(--grey-800);
  padding: 5px;
  display: flex;
  flex-flow: column nowrap;
}

.calendar-day > span {
  align-self: flex-end;
  width: var(--day-label-size);
  height: var(--day-label-size);
}
.calendar-day > ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: column nowrap;
}

.calendar-day--not-current {
  background-color: var(--grey-100);
  color: var(--grey-300);
}

.calendar-day--today {
  padding-top: 4px;
}

.calendar-day--today > span {
  color: #fff;
  border-radius: 9999px;
  background-color: var(--grey-800);
}
.calendar-item--rgb {
  background-color: lightblue;
  order: 1;
}
.calendar-item--hsl {
  background-color: lightsalmon;
  order: 2;
}
.calendar-item--cmyk {
  background-color: lightgreen;
  order: 3;
}
</style>
