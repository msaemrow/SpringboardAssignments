import React from "react";
import { Link } from "react-router-dom";
import "../css/DogList.css"


const DogList = ({ dogs }) => {
    return (
        <>

        <div className="DogList">
        <h1 className="DogList-title">Dogs</h1>
        <div className="DogList-dogs">
            {dogs.map(dog => (
                <div key={dog.name} className="DogList-dog">
                    <h3 className="DogList-name">
                        <Link className="DogList-link" to={`/dogs/${dog.name.toLowerCase()}`}>{dog.name}</Link>
                    </h3>
                    <img className="DogList-image" src={dog.src} alt={dog.name} />
                </div>
            ))}
            </div>
        </div>
        </>
    )
}

export default DogList;