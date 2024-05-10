const Alert = (props) => {
    return (<div className={`alert alert-${props.color} my-2`}role="alert">
        {props.message}
    </div>
    );
}