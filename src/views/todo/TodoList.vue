<script setup lang="ts">
import { useTodosStore } from '../../stores/todo'
import type { Todo } from '../../interfaces'
import { computed, inject, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const todosStore = useTodosStore()
if (todosStore.todoList.size === 0) {
  todosStore.initTodoList()
}

const todoList = computed((): Map<number, Todo> => {
  return todosStore.todoList
})
let searchQuery = ref('')

const onClickButtonToEdit = (todoId: number): void => {
  router.push({ name: 'TodoEdit', params: { id: todoId } })
}
const onClickButtonToDelete = (todoId: number): void => {
  todoList.value.delete(todoId)
}
const onInputSearch = (): void => {
  if (!searchQuery.value) {
    // TODO: 動くかわからない
    return
  }

  const filterdTodoList = new Map<number, Todo>()
  todoList.value.forEach((todo, key) => {
    if (todo.title.includes(searchQuery.value)) {
      filterdTodoList.set(key, todo)
    }
  })

  // TODO: どうするべきか調べる
  // todoList.value = filterdTodoList
}
</script>

<template>
  <section style="text-align: center">
    <h1 style="margin: 20px">TODOリスト</h1>
    <div style="margin: 20px">
      <input
        type="text"
        class="text-gray-900"
        v-model="searchQuery"
        placeholder="検索"
        v-on:input="onInputSearch"
      />
    </div>
    <ul style="text-align: center; margin-bottom: 20px">
      <li v-for="[id, todo] in todoList" v-bind:key="id">
        <RouterLink v-bind:to="{ name: 'TodoDetail', params: { id: id } }">
          ID:{{ id }} {{ todo.title }}
        </RouterLink>
        <button
          type="button"
          class="bg-gradient-to-r from-blue-100 to-blue-800 hover:bg-gradient-to-l text-white rounded px-4 py-2"
          v-on:click="onClickButtonToEdit(id)"
        >
          編集
        </button>
        <button
          type="button"
          class="bg-gradient-to-b from-red-300 to-red-800 hover:bg-gradient-to-l text-white rounded px-4 py-2"
          v-on:click="onClickButtonToDelete(id)"
        >
          削除
        </button>
      </li>
    </ul>
  </section>
</template>
