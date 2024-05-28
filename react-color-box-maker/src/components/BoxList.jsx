import React, {useState} from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";
import "../css/BoxList.css"

function BoxList(){
    const allBoxes = [
        {id: 1, backgroundColor: "green", height:55, width:100},
        {id: 2, backgroundColor: "red", height:155, width:150},
        {id: 3, backgroundColor: "yellow", height:255, width:200},
    ]
    const [boxes, setBoxes]= useState(allBoxes)
    
    const addBox = (newBox) => {
        setBoxes([...boxes, newBox]);
    }

    const removeBox = (id) => {
        setBoxes(boxes.filter(box => box.id !== id));
    }

    return(
        <div className="BoxList">
            <NewBoxForm addBox={addBox}/>
            <div id="BoxList-boxes">
            {boxes.map((box) => (
                <Box 
                    key={box.id}
                    backgroundColor={box.backgroundColor}
                    height={box.height}
                    width={box.width}
                    onRemove={() => removeBox(box.id)}
                />
            ))}
            </div>
        </div>
    )
}

export default BoxList;