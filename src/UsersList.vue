<template funtional>
  <div class="list-wrapper">
    <h2>Who was born in {{activeMonth}}?</h2>
    <ol>
      <li v-for="user in usersData" :key="user.id">
        {{new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit' }).format(new Date(user.dob))}},
        {{user.firstName}} {{user.lastName}}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "users-list",
  props: {
    activeMonth: { type: String },
    usersData: { type: Array },
  },
};
</script>
