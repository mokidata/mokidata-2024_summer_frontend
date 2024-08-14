import React from "react";

function Button (props){    
    return (
        <button className="button" 
            id={props.color} 
            style={{borderRadius: 
                props.shape === 'rect' ? '10px' :
                props.shape === 'circle' ?'25px':
                '25px'  ,
                fontSize: props.fontSize                                 
        }}>
            {props.txt}
        </button>
    )

}

export default Button;  