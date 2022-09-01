import { Component, h, Host, State } from '@stencil/core';
import state from '../../store/todo-Store';

@Component({
  tag: 'my-input',
  styleUrl: 'my-input.scss',
  shadow: true,
})
export class MyInput {
  //  textInput!: HTMLInputElement;
  @State() inputValue: string = '';
  @State() warning: string;
  @State() textInput!: HTMLInputElement;

  onSubmitHandeler(e: Event) {
    e.preventDefault();
    if (!this.inputValue) {
      this.warning = 'warning';
    } else if (state.id !== 0) {
      let updatedTodos = state.todos.map(todo => (todo.id === state.id ? { ...todo, inputValue: this.inputValue } : todo));
      state.todos = updatedTodos;
      state.id = 0;
      this.inputValue = '';
    } else {
      this.warning = '';
      const todoObj = {
        id: Date.now(),
        inputValue: this.inputValue,
        isCompleted: false,
      };

      state.todos = [...state.todos, todoObj];
      this.inputValue = '';
    }
  }

  onInputChangeHandler(e: Event) {
    this.inputValue = (e.target as HTMLTextAreaElement).value;
    this.warning = '';
  }
  render() {
    return (
      <Host>
        <div class="input-form ">
          <form>
            <input
              ref={el => {
                console.log('el', el);
                this.textInput = el as HTMLInputElement;
                console.log('this.textInput', this.textInput);
              }}
              type="text"
              class={this.warning ? 'input warning' : 'input'}
              onChange={this.onInputChangeHandler.bind(this)}
              value={this.inputValue}
              placeholder="add todo..."
            />
            <button class="btn" onClick={this.onSubmitHandeler.bind(this)}>
              Add Task
            </button>
          </form>
        </div>
        <my-list-of-todos todoListProp={state} textInput={this.textInput}></my-list-of-todos>
      </Host>
    );
  }
}
