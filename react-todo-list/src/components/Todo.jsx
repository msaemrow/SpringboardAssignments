import React, {useState} from "react";
import "../css/Todo.css"

function Todo({ todo, todoId, removeTodo, toggleTodo, updateTodo, completed }){
    const [showEdit, setShowEdit] = useState(false);
    const [editedTask, setEditedTask] = useState("");

    const handleEdit = () => {
        setShowEdit(true);
        setEditedTask(todo);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTodo(editedTask)
        setShowEdit(false);
    }

    const handleChange = (e) => {
        setEditedTask(e.target.value);
    }

    const style = completed ? "line-through" : "none";

    return(
        <div className="Todo">
            {showEdit ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={editedTask}
                        onChange={handleChange}
                    />
                    <button type="submit">Save Changes</button>
                </form>
            ) : ( 
            <>
            <p className="Todo-item" style={{textDecoration: style}}>{ todo }</p>
            <button className="Todo-btn btn-done" onClick={toggleTodo}>{completed ? "Undo" : "Done"}</button>
            <button className="Todo-btn btn-edit" onClick={handleEdit}>Edit</button>
            <button className="Todo-btn btn-delete" onClick={removeTodo}>x</button>
            </>
            )}
        </div>
    )
}

export default Todo;