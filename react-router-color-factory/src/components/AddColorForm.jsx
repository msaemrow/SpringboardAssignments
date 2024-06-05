import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';


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
            {...formData, id: Date.now()}
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
        <div>
            <h1>Add a new color</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="color">Name Color:</label>
                    <input
                        id="color"
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Sumbit</button>
            </form>
        </div>
    )
}


export default AddColorForm;