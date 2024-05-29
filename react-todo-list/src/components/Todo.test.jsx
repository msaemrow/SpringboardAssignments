import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Todo from "./Todo"
import { removeTodo, toggleTodo, updateTodo }from "./TodoList"


describe('checks ToDo List componenet', () => {
  it('renders without crashing', () => {
    render(<Todo
        todo="Grocery Shop"
        todoId={2}
        removeTodo={() => removeTodo(2)}
        toggleTodo={() => toggleTodo(2)}
        updateTodo={(updatedTask) => updateTodo(2, updatedTask)}
        completed={false}/>);
  });

  it('matches snapshot', () => {
    const { asFragment } =     render(<Todo
        todo="Grocery Shop"
        todoId={2}
        removeTodo={() => removeTodo(2)}
        toggleTodo={() => toggleTodo(2)}
        updateTodo={(updatedTask) => updateTodo(2, updatedTask)}
        completed={false}/>);;
    expect(asFragment).toMatchSnapshot();
  });
});
