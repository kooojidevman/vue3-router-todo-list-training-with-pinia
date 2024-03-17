<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useTodosStore } from '../../stores/todo'

const router = useRouter()
const todosStore = useTodosStore()
const todoList = todosStore.todoList
const keys = Array.from(todoList.keys())
const maxId = keys[keys.length - 1] as number
const newTodo = reactive({
  id: maxId ? maxId + 1 : 1,
  title: '',
  content: ''
})

const onCreate = (): void => {
  todosStore.createTodo(newTodo)
  router.push({ name: 'TodoList' })
}
</script>

<template>
  <section style="text-align: center">
    <h1 style="margin: 20px 0">TODO新規作成</h1>
    <form v-on:submit.prevent="onCreate">
      <dt>
        <label for="addTitle">タイトル&nbsp;</label>
      </dt>
      <dd>
        <input type="text" class="text-gray-900" id="addTitle" v-model="newTodo.title" required />
      </dd>
      <dt>
        <label for="addContent">本文&nbsp;</label>
      </dt>
      <dd>
        <textarea id="addContent" class="text-gray-900" v-model="newTodo.content"></textarea>
      </dd>
      <button
        style="margin-top: 20px"
        class="bg-gradient-to-r from-green-300 to-green-800 hover:bg-gradient-to-l text-white rounded px-4 py-2"
      >
        保存
      </button>
    </form>
  </section>
</template>
