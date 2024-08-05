import React from "react";

function Button (props){    
    return (
        <button className="button" 
            id={props.color} 
            style={{borderRadius: 
                props.shape === 'rect' ? '10px' :
                props.shage === 'circle' ?'25px':
                '25px'                                        
        }}>
            {props.txt}
        </button>
    )

}

export default Button;  