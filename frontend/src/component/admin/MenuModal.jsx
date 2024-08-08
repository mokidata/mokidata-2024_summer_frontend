import { useEffect, useState } from "react";
import Button from "../common/Button";
import InputMenu from "./InputMenu";
import { BASE_URL } from "../Url";

function MenuModal(props){
    
    console.log(props)
    const [menuUpdateList, setMenuUpdateList] = useState([])
    const [menuInput, setMenuInput] = useState(false)
    const [pickedIndex, setPickedIndex] = useState(0)
    const OpenMenuInput= (index) =>{
        if(index === -1){
            setMenuInput(false)
        }
        else{
            setPickedIndex(index)
            setMenuInput(true);
        }
        console.log(menuInput)
        
    }

    
    useEffect(()=>{
        const emptyArray = []
        for (let i = 0 ; i<50;i++){
            emptyArray.push({"name":"","img":"","price":0}) 
        }
        props.menuList.forEach((element,index) => {
            emptyArray[index] = element
            console.log(element)
            console.log(`${element.img}`)
        });
        setMenuUpdateList(emptyArray)
    },[])
    

    return(
        <div className="modal-background">
                {
                    menuInput ?
                      <InputMenu pick={menuUpdateList[pickedIndex]} close={OpenMenuInput}></InputMenu>
                    :
                    <div className="modal" id="modal-menu">
                        <div className="modal-title__div">
                            <div className="modal-title" id="menu">
                                메뉴 입력
                            </div>
                            <div className="modal-title__desc">
                                최대 50개 까지 입력 가능
                            </div>
                        </div>
                        <div className="modal-menu__list">
                            {menuUpdateList.map((element,index)=>(
                                <div className="modal-menu__row">
                                    <div className="modal-menu__row-num">
                                        {index+1}.
                                    </div>
                                    <div className="modal-menu__row-name">
                                        {element.name}
                                    </div>
                                    <div className="modal-menu__row-button" id={index+1} onClick={() => OpenMenuInput(index)}>
                                        {
                                            element.name === "" ?
                                            <Button txt="정보 등록" color="green" fontSize={12} ></Button>
                                            :
                                            <Button txt="정보 수정" color="blue" fontSize={12}></Button>

                                        }
                                        
                                    </div>

                                </div>
                            ))}
                        </div>
                        <div className="modal-btn">
                            <div className="modal-btn__div" onClick={props.openModal}>
                                <Button id="modal-btn" txt="취소" color="grey" shape="rect" fontColor="white"></Button> 
                            </div>
                            <div className="modal-btn__div" onClick={props.openModal}>
                                <Button id="modal-btn" txt="성공" color="blue" shape="rect" > </Button>
                            </div>
                        </div>

                    
                    </div>
                    
                    



                }

        </div>
    )

}

export default MenuModal;