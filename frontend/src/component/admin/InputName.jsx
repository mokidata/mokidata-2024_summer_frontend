import { useState } from "react";
import Button from "../common/Button";

function InputName(props){
    const [input,setInput] = useState("매장명 입력")
    return(
        <div className="input-name">
            <div className="input-name__name">
                {props.userName === "" ? "매장명 입력" : props.userName}

            </div>
            <button className="input-name__button" onClick={props.openModal}>
                입력
            </button>

        </div>

    );

}

export default InputName; 