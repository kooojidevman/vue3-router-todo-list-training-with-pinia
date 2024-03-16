<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Todo } from '../../interfaces'
import { computed, inject } from 'vue'

interface Props {
  id: number
}

const router = useRouter()
const props = defineProps<Props>()
const todoList = inject('todoList') as Map<number, Todo>
const todo = computed((): Todo => {
  return todoList.get(props.id) as Todo
})
const onUpdate = (id: number): void => {
  router.push({ name: 'TodoEdit', params: { id: id }, query: { message: '保存しました' } })
}
</script>

<template>
  <section style="text-align: center">
    <h1 style="margin: 20px 0">TODO編集</h1>
    <div
      v-if="$route.query.message"
      class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4"
      role="alert"
    >
      <p>{{ $route.query.message }}</p>
    </div>
    <form v-on:submit.prevent="onUpdate(todo.id)">
      <dt>
        <label for="addTitle">タイトル&nbsp;</label>
      </dt>
      <dd>
        <input type="text" id="addTitle" class="text-gray-900" v-model="todo.title" required />
      </dd>
      <dt>
        <label for="addContent">本文&nbsp;</label>
      </dt>
      <dd>
        <textarea id="addCopntent" class="text-gray-900" v-model="todo.content"></textarea>
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
