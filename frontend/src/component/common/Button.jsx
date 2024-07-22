import React from "react";

function Button (props){    
    return (
        <button className="button" id={props.color}>
            {props.txt}
        </button>
    )

}

export default Button;  