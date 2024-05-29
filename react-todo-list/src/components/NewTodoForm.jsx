import React, { useState } from "react";
import "../css/NewTodoForm.css"

function NewTodoForm({ addTodo }){
    const [formData, setFormData] = useState({
        task: ""
    })
    
    const handleChange = (e) => {
        const{name, value} = e.target;
        setFormData((data) => ({
            ...data, [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.task === ""){
            return alert("Can't add an empty task. Please add text")
        }
        addTodo({...formData, id: Date.now(), completed: false })
        setFormData({task: ""})
    }
    return(
        <form className="NewTodoForm" onSubmit={handleSubmit}>
            <div className="NewTodoForm-task">
                <label htmlFor="task">Task: </label>
                <input
                    type="text"
                    id="task"
                    name="task"
                    value={formData.task}
                    onChange={handleChange}
                />
            </div>
            <button className="NewTodoForm-btn"> Add task </button>
        </form>
    )
}

export default NewTodoForm;