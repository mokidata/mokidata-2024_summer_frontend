import { mokiApi } from "../../app/api/loginApi";
import Button from "../common/Button";
import { useState } from "react";

function NameModal(props){

    const [inputValue, setInputValue] = useState(props.userName);
    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    };

    const patchUserName = async () => {
        
        const request = await mokiApi.patch(`/api/auth`,{"name":inputValue}).then(
            
            (response) => { 
                if (response.status == 200){
                    props.openModal()
                    props.setUserName(inputValue)
                    console.log(response.status)
                }
                
            }
        ).catch(
            (error) => console.log(error)
        )
    }



    return(
        <div className="modal-background">
            <div className="modal" id="name">
                <div className="modal-title">
                    매장명 입력
                </div>
                <div className="modal-name__info">
                    <div className="modal-name__desc">
                        매장명
                    </div>
                    <div className="modal-name__input__div">
                        <input
                            className="modal-name__input"
                            name="id"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="modal-btn__div">
                    <div className="modal-btn" onClick={props.openModal}>
                        <Button id="modal-btn" txt="취소" color="grey" shape="rect" fontColor="white"></Button> 
                    </div>
                    <div className="modal-btn" onClick={() => patchUserName()}>
                        <Button id="modal-btn" txt="확인" color="blue" shape="rect" > </Button>
                    </div>
                </div>
                

            </div>

        </div>
    )



}

export default NameModal;