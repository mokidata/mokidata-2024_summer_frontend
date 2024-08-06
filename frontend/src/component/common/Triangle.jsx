import React, { useEffect, useState } from "react";
import Price from "./Price";

function Triangle(props){
    const [diff, setDiff] = useState(0);
    const [change , setChange] = useState("same");
    useEffect(() => {
        if (props.diff > 0 ) {
            setDiff(props.diff);
            setChange("up");
            
        }
        else if (props.diff < 0 ){
            setDiff(Math.abs(props.diff));
            setChange("down");
        }
        else
        {
            setDiff(0);
            setChange("same");
        }
    },[props.diff]);

    return(
        <div className="triangle">
            <span className="triangle-img" id={change}>
            </span>
            <span className="triangle-quantity" id={change} >
                {diff === 0 ? "" : <Price value={diff} unit={props.unit}></Price>}
                
            </span>
        </div>
    );
}

export default Triangle;