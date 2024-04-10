import axios from "axios"
import { defineStore } from "pinia"

const BASE_URL = "https://6615a32cb8b8e32ffc7b6d71.mockapi.io"

export const useTodoStore = defineStore("todo", {
  state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ["Pending", "Doing", "Done"],
  }),
  actions: {
    async loadTodos() {
      try {
        const response = await axios.get(`${BASE_URL}/todos`)
        this.list = response.data
      } catch (error) {
        console.log("err: ", error)
      }
    },
    async loadTodo(id) {
      try {
        const response = await axios.get(`${BASE_URL}/todos/${id}`)
        this.selectedTodo = response.data
      } catch (error) {
        console.log("err: ", error)
      }
    },
    async addTodo(todoText) {
      const bodyData = {
        name: todoText,
        status: "Pending",
      }
      try {
        const response = await axios.post(`${BASE_URL}/todos`, bodyData)
        this.list.push(response.data)
        console.log("Add completed: ", response.data)
      } catch (error) {
        console.log("err: ", error)
      }
    },
    async editTodo(todoData, id) {
      try {
        const response = await axios.put(`${BASE_URL}/todos/${id}`, todoData)
        console.log("Edit completed: ", response.data)
      } catch (error) {
        console.log("err: ", error)
      }
    },
    async removeTodo(id) {
      try {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`)
        console.log("Delete completed: ", response.data)
      } catch (error) {
        console.log("err: ", error)
      }
    },
  },
})
