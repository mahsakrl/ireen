<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card flat>
        <template v-if="isReady">
          <v-card-title> user's todo list </v-card-title>
          <LineChart />
        </template>
        <template v-else>
          <div class="grey--text d-flex align-center justify-center">
            the chart is loading ...
          </div>
        </template>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import { USERS_LIST, TODO_LIST } from '~/scripts/endpoint.js'
export default {
  async asyncData({ app }) {
    const getUsers = app.$axios.get(USERS_LIST)
    const getToDoList = app.$axios.get(TODO_LIST)
    const [users, todoList] = await Promise.all([getUsers, getToDoList]).catch(
      () => {
        return {
          users: [],
          todoList: []
        }
      }
    )
    return {
      users: users.data || [],
      todoList: todoList.data || []
    }
  },
  data: () => {
    return {
      users: [],
      todoList: [],
      userProfile: [],
      isReady: false
    }
  },
  mounted() {
    this.findUserDataList()
  },
  methods: {
    async findUserDataList() {
      this.userProfile = this.users.map((user) => {
        const todo = this.todoList.filter((list) => user.id === list.userId)
        return {
          ...user,
          todo
        }
      })
      await this.$store
        .dispatch('profile/saveProfile', this.userProfile)
        .then(() => {
          this.isReady = true
        })
    }
  }
}
</script>
