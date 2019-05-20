<template>
  <div>
    <h3>Users</h3>
    <ul>
      <li v-for="item in users" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import getUsers from '~/apollo/queries/fetchUsers.gql'

export default {
  apollo: {
    users: {
      prefetch: true,
      query: getUsers,
    },
  },
}
</script>
