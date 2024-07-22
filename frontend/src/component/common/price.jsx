import React, { useEffect, useState } from "react";

function Price (props){
    const [underline,setUnderline] = useState(false);
    const [value,setValue] = useState("");
    useEffect(()=>{
        if(props.underline){
            setUnderline(true);
        }
    },[props.underline])
    useEffect(()=>{
        const target  = props.value.toString();
        const altered = Number(target.replace(/,/g, ''));
        if(isNaN(altered)) {
            setValue(0);
        } else {
            setValue(altered.toLocaleString('ko-KR'));
        }
    },[props.value])



    return(
        <div className="price" id={underline ?"underline": ""}>
            {value} {props.unit}
        </div>
    )
}

export default Price;