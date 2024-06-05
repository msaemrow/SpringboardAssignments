import React from "react";
import { useParams, Navigate } from "react-router-dom";
import "../css/DogDetails.css"



const DogDetails = ({ dogs }) => {
    const { name } = useParams();
    const dog = dogs.find(dog => dog.name.toLowerCase() === name.toLowerCase());

    if(!dog) return <Navigate to="/dogs" />;

    return (
        <div className="DogDetails">
        <h1 className="DogDetails-title">Details about {dog.name}</h1>
        <img className="DogDetails-image" src={dog.src} alt={dog.name} />
        <h4 className="DogDetails-age">Age: {dog.age}</h4>
        <h4 className="DogDetails-facts-title">Facts about {dog.name}:</h4>
        <ul className="DogDetails-ul">
            {dog.facts.map((fact, i) => (
                <li className="DogDetails-fact" key={i}>
                    {fact}
                </li>
            ))}
        </ul>
        </div>

    )
}

export default DogDetails;