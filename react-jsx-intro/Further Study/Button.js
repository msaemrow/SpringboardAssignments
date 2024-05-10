const Button = (props) => {
    return (<button type={props.type} className={`btn btn-${props.color} mx-1`}>
        {props.buttonName}
    </button>
    );
};

