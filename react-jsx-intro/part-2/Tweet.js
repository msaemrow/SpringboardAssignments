const Tweet = (props) => {
    return <div className="tweet">
        <h2 className="username">{props.username}</h2>
        <p className="name"> {props.name}</p>
        <p className="message"> {props.message}</p>
        <small className="date">{props.date}</small>
    </div>
}