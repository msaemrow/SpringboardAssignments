import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

function TodoList(){
    const [todos, setTodos] = useState([])

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []); 

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (newTodo) => {
        setTodos(prevTodos => [...prevTodos, newTodo])
    }

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }
    
    const toggleTodo = (id) => {
        setTodos(todos.map((todo) => 
        todo.id === id ? {...todo, completed: !todo.completed } : todo
        ))
    }

    const updateTodo = (id, updatedTask) => {
        console.log(updatedTask);
        setTodos(todos.map((todo) => 
                todo.id === id ? { ...todo, task: updatedTask } : todo 
        ))
    };

    return(
        <div>
            <NewTodoForm addTodo={addTodo} />
        <h3>Todo List:</h3>
        <ul>
            {todos.map((todo) => (
                <li key={todo.id}>
                    <Todo 
                        todo={todo.task}
                        todoId={todo.id}
                        removeTodo={() => removeTodo(todo.id)}
                        toggleTodo={() => toggleTodo(todo.id)}
                        updateTodo={(updatedTask) => updateTodo(todo.id, updatedTask)}
                        completed={todo.completed}
                    />
                </li>
            ))}
        </ul>
        </div>
    )
}

export default TodoList;