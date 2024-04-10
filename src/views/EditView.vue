<script setup>
import { useTodoStore } from "@/stores/todo"
import { useRoute } from "vue-router"
import { onMounted, ref } from "vue"
import { RouterLink } from "vue-router"

const todoStore = useTodoStore()
const route = useRoute()
const todoId = ref(-1)
const isLoaded = ref(false)

onMounted(async () => {
  await todoStore.loadTodo(route.params.id)
  isLoaded.value = true
  todoId.value = parseInt(route.params.id)
})

const editTodo = async (selectedTodo) => {
  try {
    const bodyData = {
      name: selectedTodo.name,
      status: selectedTodo.status,
    }
    await todoStore.editTodo(bodyData, todoId.value)
    alert("Todo updated successfully")
  } catch (error) {
    console.log("err: ", error)
  }
}
</script>

<template>
  <div v-if="isLoaded">
    Edit
    <RouterLink :to="{ name: 'todo-list' }">Go home</RouterLink>
    <div>id {{ todoId }}</div>
    <div>
      Name
      <input type="text" v-model="todoStore.selectedTodo.name" />
    </div>
    <div>
      Status
      <select v-model="todoStore.selectedTodo.status">
        <option>Select status</option>
        <option v-for="status in todoStore.statuses" :value="status">
          {{ status }}
        </option>
      </select>
      <div>
        <button @click="editTodo(todoStore.selectedTodo)">Edit</button>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
