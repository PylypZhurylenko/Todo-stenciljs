import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-container',
  styleUrl: 'my-container.scss',
  shadow: true,
})
export class MyContainer {
  render() {
    return (
      <div class="container">
        <my-input></my-input>
      </div>
    );
  }
}
