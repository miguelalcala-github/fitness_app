<template>
  <div class="calendar">
    <slot name="modal" />
    <WeekDays />

    <ol class="grid">
      <DayElementGrid
        v-for="(day, index) in days"
        :key="index"
        :day="day"
        :is-today="day.date === today"
      />
    </ol>
  </div>
</template>

<script>
import WeekDays from "./WeekDays";
import DayElementGrid from "./DayElementGrid";

export default {
  components: {
    WeekDays,
    DayElementGrid,
  },
  data() {
    return {
      today: new Date().toISOString().substr(0, 10),
    };
  },
  methods: {
    getDaysInMonth(month, year) {
      // January is 1 based
      //Day 0 is the last day in the previous month
      return new Date(year, month, 0).getDate();
    },
    getWeek(date) {
      // Thursday in current week decides the year.
      date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
      // January 4 is always in week 1.
      var week1 = new Date(date.getFullYear(), 0, 4);
      // Adjust to Thursday in week 1 and count number of weeks from date to week1.
      return (
        1 +
        Math.round(
          ((date.getTime() - week1.getTime()) / 86400000 -
            3 +
            ((week1.getDay() + 6) % 7)) /
            7
        )
      );
    },
  },
  computed: {
    days() {
      return [
        ...this.previousMonthDays,
        ...this.currentMonthDays,
        ...this.nextMonthDays,
      ];
    },
    week() {
      return this.getWeek(new Date(this.today));
    },
    day() {
      return new Date(2020, 11, 1).getDay();
    },
    month() {
      return new Date(this.today).getMonth() + 1;
    },
    year() {
      return new Date(this.today).getFullYear();
    },
    numberOfDaysInMonth() {
      return this.getDaysInMonth(this.month, this.year);
    },

    currentMonthDays() {
      return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
        const date = new Date(this.year, this.month - 1, index + 1);
        return {
          date: date,
          isCurrentMonth: true,
        };
      });
    },

    previousMonthDays() {
      const previousMonth = {
        month: this.month - 1 == 0 ? 11 : this.month - 1,
        year: this.month - 1 == 0 ? this.year - 1 : this.year,
      };
      const firstDayOfTheMonthWeekday = this.currentMonthDays[0].date.getDay();

      // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
      const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
        ? firstDayOfTheMonthWeekday - 1
        : 6;

      const previousMonthLastMondayDayOfMonth =
        this.getDaysInMonth(previousMonth.month, previousMonth.year) +
        1 -
        visibleNumberOfDaysFromPreviousMonth;

      return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
        (day, index) => {
          return {
            date: new Date(
              previousMonth.year,
              previousMonth.month,
              previousMonthLastMondayDayOfMonth + index
            ),
            isCurrentMonth: false,
          };
        }
      );
    },

    nextMonthDays() {
      const nextMonth = {
        month: this.month - 1 == 11 ? 0 : this.month,
        year: this.month - 1 == 11 ? this.year + 1 : this.year,
      };
      const lastDayOfTheMonthWeekday = new Date(
        this.year,
        this.month - 1,
        this.currentMonthDays.length
      ).getDay();
      const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
        ? 7 - lastDayOfTheMonthWeekday
        : lastDayOfTheMonthWeekday;

      return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
        return {
          date: new Date(nextMonth.year, nextMonth.month, index + 1),
          isCurrentMonth: false,
        };
      });
    },
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}
ol {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>
