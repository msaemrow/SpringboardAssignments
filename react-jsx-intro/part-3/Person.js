const Person = (props) => {
    const voteMessage = props.age > 17 ? "please go vote!" : "you must be 18";
    const name = props.name.length > 8 ? props.name.slice(0, 6) : props.name
    return <div>
        <p>Learn some information about this person</p>
        <ul>
           <li>Name: {name}</li> 
           <li>Age: {props.age}</li> 
           <li>Hobbies:</li>
                <ul>
                    {props.hobbies.map(hobby => <li>{hobby}</li>)}
                </ul>
        </ul>
        <h3>{voteMessage}</h3>
    </div>
}