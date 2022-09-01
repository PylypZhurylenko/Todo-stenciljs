import { createStore } from '@stencil/store';

const todosFromLocalStorage = localStorage.getItem('todoObj') ? JSON.parse(localStorage.getItem('todoObj')) : [];
console.log(todosFromLocalStorage);

export interface StateObj {
  todos: TodoInfo[];
  id: number;
}
export interface TodoInfo {
  id: number;
  inputValue: string;
  isCompleted: boolean;
}

const { state, onChange } = createStore<StateObj>({
  todos: todosFromLocalStorage,
  id: 0,
});

onChange('todos', () => localStorage.setItem('todoObj', JSON.stringify(state.todos)));

export default state;
