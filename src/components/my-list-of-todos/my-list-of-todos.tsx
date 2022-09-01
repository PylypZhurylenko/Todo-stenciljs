import { Component, h, Prop } from '@stencil/core';
import state from '../../store/todo-Store';
import { StateObj } from '../../store/todo-Store';

@Component({
  tag: 'my-list-of-todos',
  styleUrl: 'my-list-of-todos.scss',
  shadow: true,
})
export class MyListOfTodos {
  @Prop() todoListProp: StateObj;
  @Prop() textInput: HTMLInputElement;

  onDeleteHandler(id: number) {
    let updatedTodos = state.todos.filter(todo => todo.id !== id);
    state.todos = updatedTodos;
  }
  onColmpleteToggle(id: number) {
    let updatedTodos = state.todos.map(todo => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo));
    state.todos = updatedTodos;
  }
  onEditHandler(input: string, id: number) {
    state.id = id;
    this.textInput ? (this.textInput.value = input) : '';
  }
  render() {
    return this.todoListProp.todos.length !== 0 ? (
      <ul>
        {this.todoListProp.todos.map(todo => (
          <li key={todo.id}>
            <span class={todo.isCompleted ? 'completed' : ''}>{todo.inputValue}</span>
            <button onClick={() => this.onEditHandler(todo.inputValue, todo.id)}>edit</button>
            <button onClick={() => this.onColmpleteToggle(todo.id)}>complete</button>
            <button onClick={() => this.onDeleteHandler(todo.id)}>delete</button>
          </li>
        ))}
      </ul>
    ) : (
      <span class="empty">The list is empty</span>
    );
  }
}
