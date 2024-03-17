<script setup lang="ts">
import { computed, inject } from 'vue'
import type { Todo } from '../../interfaces'
import { useTodosStore } from '../../stores/todo';

interface Props {
  id: number
}

const props = defineProps<Props>()
const todosStore = useTodosStore()
const todo = computed((): Todo => {
  return todosStore.todoList.get(props.id) as Todo
})
</script>

<template>
  <section style="text-align: center">
    <h1 style="margin: 20px 0">TODO 詳細</h1>
    <dl>
      <dt>ID</dt>
      <dd>{{ todo.id }}</dd>
      <dt>タイトル</dt>
      <dd>{{ todo.title }}</dd>
      <dt>本文</dt>
      <dd>{{ todo.content }}</dd>
    </dl>
  </section>
</template>
