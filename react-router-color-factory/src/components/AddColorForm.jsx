import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../css/AddColorForm.css"

const AddColorForm = ({ addColor }) => {
    const initialFormData = {
        color: '',
        hexCode: ''
    }
    const [formData, setFormData] = useState(initialFormData)
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addColor(
            {...formData}
        )
        setFormData(initialFormData)
        navigate("/colors");
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data, [name]: value
        }))
    }
    return(
        <div className="AddColorForm">
            <h1 className="AddColorForm-title">Add a new color</h1>
            <form className="AddColorForm-form" onSubmit={handleSubmit}>
                <div className="AddColorForm-name-color">
                    <label htmlFor="color">Name Color: </label>
                    <input
                        id="color"
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                    />
                </div>
                <div className="AddColorForm-hexCode">
                    <label htmlFor="hexCode">Hex Code: </label>
                    <input 
                        type="color"
                        id="hexCode"
                        name="hexCode"
                        value={formData.hexCode}
                        onChange={handleChange}
                    />
                </div>
                <button className="AddColorForm-submit-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}


export default AddColorForm;