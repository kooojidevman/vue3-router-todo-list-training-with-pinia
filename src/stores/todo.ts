import { defineStore } from "pinia";
import type { Todo } from "../interfaces";

interface State {
  todoList: Map<number, Todo>;
}

export const useTodosStore = defineStore('todos',{
  state: (): State => {
    return {
      todoList: new Map<number, Todo>()
    };
  },
  getters: {
    // TODO
  },
  actions: {
    initTodoList(): void {
      let todoList = new Map<number, Todo>();
      todoList.set(1, {id: 1, title: 'タイトル1', content: '本文1'})
      todoList.set(2, {id: 2, title: 'タイトル2', content: '本文2'})
      todoList.set(3, {id: 3, title: 'タイトル3', content: '本文3'})

      this.todoList = todoList
    },
    createTodo(todo: Todo): void {
      this.todoList.set(todo.id, todo)
    }
  }
});
