import React, {useState} from "react";
import "../css/NewBoxForm.css"

function  NewBoxForm({ addBox }){
    const [formData, setFormData] = useState({
        backgroundColor: "",
        height: "",
        width: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((data) => ({
            ...data, [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addBox({ ...formData, id: Date.now() })
        setFormData({backgroundColor: "", height: "", width:""})
    }

    return(
        <form className="NewBoxForm" onSubmit={handleSubmit}>
            <div className="NewBoxForm-backgroundColor">
                <label htmlFor="backgroundColor">Background Color:</label>
                <input 
                    id="backgroundColor"
                    name="backgroundColor"
                    value={formData.backgroundColor}
                    onChange={handleChange}/>
            </div>
            <div className="NewBoxForm-height">
                <label htmlFor="height">Height:</label>
                <input 
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}/>
            </div>
            <div className="NewBoxForm-width">
                <label htmlFor="width">Width</label>
                <input 
                    id="Box-Width"
                    name="width"
                    value={formData.width}
                    onChange={handleChange}/>
            </div>
            <button id="NewBoxForm-btn" type="submit">Create Box</button>
        </form>
    )
}

export default NewBoxForm;