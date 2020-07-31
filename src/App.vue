<template>
  <div v-if="usersMapByMonths">
    <h1>Birthday's calendar</h1>

    <ul class="months-wrapper">
      <li
        v-for="month in months"
        :key="month"
        class="month"
        :class="getMonthClass(usersMapByMonths, month)"
        @mouseover="mouseOver(month)"
        @mouseleave="mouseLeave"
      >{{month}}</li>
    </ul>

    <transition name="fade">
      <users-list
        v-if="usersListByMonth"
        :users-data="usersListByMonth"
        :active-month="activeMonth"
      />
    </transition>
  </div>
</template>

<script>
import UsersList from "./UsersList.vue";

export default {
  name: "App",

  components: { UsersList },

  data() {
    return {
      users: [],
      usersMapByMonths: null,
      usersListByMonth: null,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },

  created() {
    /* istanbul ignore next */
    fetch("https://yalantis-react-school-api.yalantis.com/api/task0/users")
      .then((response) => response.json())
      .then((data) => {
        this.users = data;
        this.usersMapByMonths = {};
        this.users.forEach((user) => {
          let month = new Date(user.dob).getMonth();

          if (this.usersMapByMonths[this.months[month]]) {
            this.usersMapByMonths[this.months[month]].push(user);
          } else {
            this.usersMapByMonths[this.months[month]] = [];
            this.usersMapByMonths[this.months[month]].push(user);
          }
        });
      })
      .then(() => {
        for (let key in this.usersMapByMonths) {
          this.usersMapByMonths[key].sort(
            (a, b) => new Date(a.dob) - new Date(b.dob)
          );
        }
      });
  },

  methods: {
    getMonthClass(map, month) {
      let monthClass;

      if (map[month]) {
        monthClass =
          map[month].length <= 2
            ? "grey"
            : map[month].length <= 6
            ? "blue"
            : map[month].length <= 10
            ? "green"
            : map[month].length >= 11
            ? "red"
            : null;

        return monthClass;
      }
    },
    mouseOver(month) {
      this.activeMonth = month;
      this.usersListByMonth = this.usersMapByMonths[month];
    },
    mouseLeave() {
      this.usersListByMonth = null;
    },
  },
};
</script>
