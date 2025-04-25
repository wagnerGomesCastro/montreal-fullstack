import { defineStore } from 'pinia'
import { destroy, getAll, create, update } from '@/helpers/requests/user'
// import axios from 'axios'

type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    users: [] as User[],
  }),

  getters: {
    //
  },

  actions: {
    storeUsers(payload: User[]) {
      this.users = payload
    },

    // Store a single user (add or update)
    storeUser(payload: User) {
      const index = this.users.findIndex((user) => user.id === payload.id)
      if (index >= 0) {
        this.users.splice(index, 1, payload)
      } else {
        this.users.push(payload)
      }
    },

    deleteUser(id: number) {
      const index = this.users.findIndex((user) => user.id === id)
      if (index >= 0) {
        this.users.splice(index, 1)
      }
    },

    async getUsers() {
      return new Promise((resolve) => {
        setTimeout(async () => {
          // const response = await axios.get('http://localhost:3071/api/user')

          const response = await getAll()

          this.storeUsers(response)
          resolve(``)
        }, 1000)
      })
    },

    async addUser(data: User) {
      // const response = await axios.post('http://localhost:3071/api/user', data)

      const response = await create({ ...data, password: '@123Alfa' })
      this.storeUser(response)
    },

    async updateUser({ id, ...data }: User) {
      // const response = await axios.patch(`http://localhost:3071/api/user/${id}`, data)

      const response = await update({ id, data })
      this.storeUser(response)
    },

    async deleteUserById(id: number) {
      // await axios.delete(`http://localhost:3071/api/user/${id}`)

      await destroy(id)
      this.deleteUser(id)
    },
  },
})
