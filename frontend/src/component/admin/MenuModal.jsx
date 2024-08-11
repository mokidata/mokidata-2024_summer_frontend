import { useEffect, useState } from "react";
import Button from "../common/Button";
import InputMenu from "./InputMenu";
import { mokiApi } from "../../app/api/loginApi";
function MenuModal(props){
    console.log(props)
    const [menuUpdateList, setMenuUpdateList] = useState([])
    const [menuInput, setMenuInput] = useState(false)
    const [pickedIndex, setPickedIndex] = useState(0)
    const [imgUpdateList,setImgUpdateList] = useState([])
    const [updateIndexList,setUpdateIndexList] = useState([])
    const [inputState,setInputState] = useState("add")
    const menuLength = props.menuList.length

    const updateMenu = (data,index) => {
        console.log(data)
        //신메뉴 추가, 수정일 때 -> 메뉴리스트에 업데이트만
        if(index >= menuLength){
            setMenuUpdateList((preV) => {
                let copy = [...preV]
                const replaceIndex = copy.findIndex(element => element.name ==="NO DATA")
                copy[replaceIndex] = data
                return copy
            })
            
        }
        //기존 메뉴 업데이트일 때 -> 메뉴리스트 업데이트 & 업데이트한 메뉴 인덱스 추가 -> 인덱스 해당 되는 것만 업데이트 보낼거임
        else{
            
            setUpdateIndexList((preV) => {
                console.log(updateIndexList.find((element) => element === index))
                if (updateIndexList.find((element) => element === index) === undefined){
                    return [...preV,index]
                }
                else{
                    return [...preV]
                }
            })
            setMenuUpdateList((preV) => {
                let copy = [...preV]
                copy[index] = data
                if (data.img === undefined){ //이미지 파라미터가 없다면 이미지가 변하지 않은 것
                    copy[index]['img'] = preV[index]['img'] //이미지는 원래값 쓰기
                }
                return copy
            })
        }
        props.getAlert("green","입력한 메뉴가 정상적으로 등록되었습니다.")
        console.log(menuUpdateList)
           
    }
    const OpenMenuInput= (index) =>{
        if(index === -1){
            setMenuInput(false)
        }
        else{
            setPickedIndex(index)
            setMenuInput(true);
        }
    }

    const putMenu = async () => {
        //이미지 변화 없는 메뉴들 & 이미지 변화 있는 메뉴 인덱스 리스트 합쳐서 보내기
        console.log(updateIndexList)
        if(updateIndexList.length !== 0){
            for(let i = 0 ;i<updateIndexList.length; i++){
                let formData = new FormData()
                formData.append(`menuList[0].menuName`,menuUpdateList[updateIndexList[i]].name )
                formData.append(`menuList[0].price`,menuUpdateList[updateIndexList[i]].price)
                if (menuUpdateList[updateIndexList[0]].img instanceof File ){
                    formData.append(`menuList[0].image`,menuUpdateList[updateIndexList[i]].img)
                }
                formData.append(`menuList[0].maxCount`,menuUpdateList[updateIndexList[i]].maxCount)
                formData.append(`menuList[0].minCount`,menuUpdateList[updateIndexList[i]].minCount)
                const response = await mokiApi.put(`/api/menu`,formData,{
                    headers:{'Content-Type' : 'multipart/form-data'}
                }).then(
                    (response) => {
                        console.log(response)
                        
                    }
                ).catch(
                    (error) => {
                        console.log(error)
                        props.openModal()
                        props.getAlert("red",`데이터 저장 실패`)
                    }
                );
            }
            
        }
        console.log("complete")
    }

    const postNewMenu = async() => {
        const pushIndex = menuUpdateList.findIndex((element) => element.name === "NO DATA")
        console.log(pushIndex)
        for (let i =menuLength; i<pushIndex;i++){
            let formData = new FormData()
            console.log(i)
            console.log(menuUpdateList)
            formData.append(`menuList[0].menuName`,menuUpdateList[i].name )
            formData.append(`menuList[0].price`,menuUpdateList[i].price)
            if(menuUpdateList[i].img !== undefined){
                formData.append(`menuList[0].image`,menuUpdateList[i].img)
            }
            formData.append(`menuList[0].maxCount`,menuUpdateList[i].maxCount)
            formData.append(`menuList[0].minCount`,menuUpdateList[i].minCount)
            for (const [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            const response = await mokiApi.post(`/api/menu`,formData,{
                headers:{'Content-Type' : 'multipart/form-data'}
            }).then(
                (response) => {
                    console.log(response)
                }
            ).catch(
                (error) => {
                    console.log(error)
                    props.openModal()
                    props.getAlert("red","데이터 저장 실패")
                }
            );

        }
        console.log("complete")
        //페이지 다시 로딩시킴
    }

    
    
    useEffect(()=>{
        console.log(updateIndexList)
        console.log(imgUpdateList)
        console.log(menuUpdateList)
    },[updateIndexList,imgUpdateList])

    
    useEffect(()=>{
        console.log(props.menuList)
        const emptyArray = []
        for (let i = 0 ; i<50;i++){
            emptyArray.push({"name":"NO DATA","img":null,"price":0})
        }

        props.menuList.forEach((element,index) => {
            emptyArray[index] = element
        });
        setMenuUpdateList(emptyArray)
    },[props.menuList]) 
    

    return(
        <div className="modal-background">
                {
                    menuInput ?
                      <InputMenu getAlert={props.getAlert} index={pickedIndex} pick={menuUpdateList[pickedIndex]} inputState={inputState} update={updateMenu} close={OpenMenuInput}></InputMenu>
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
                                    <div className="modal-menu__row-value">
                                        <div className="modal-menu__row-name">
                                            {element.name}
                                        </div>
                                        {
                                            element.name === "NO DATA" ?
                                            <div className="modal-menu__row-button" id={index+1} onClick={() => {
                                                OpenMenuInput(index)
                                                setInputState("add")
                                                }}>
                                                <Button txt="정보 등록" color="green" fontSize={12} ></Button>
                                            </div>
                                            :
                                            <div className="modal-menu__row-button" id={index+1} onClick={() => {
                                                OpenMenuInput(index)
                                                setInputState("modify")
                                                }}>
                                                <Button txt="정보 수정" color="blue" fontSize={12}></Button>
                                            </div>


                                        }
                                    </div>
                                    

                                </div>
                            ))}
                        </div>
                        <div className="modal-btn__div">
                            <div className="modal-btn" onClick={props.openModal}>
                                <Button id="modal-btn" txt="취소" color="grey" shape="rect" fontColor="white"></Button> 
                            </div>
                            <div className="modal-btn" onClick={async() =>{
                                props.openModal()
                                console.log(props.setReload)
                                props.setReload(true)
                                await postNewMenu()
                                await putMenu()
                                props.setReload(false)
                                props.getAlert("green","입력한 메뉴가 정상적으로 등록되었습니다.")
                                }
                                
                            }>
                                <Button id="modal-btn" txt="확인" color="blue" shape="rect" > </Button>
                            </div>
                        </div>

                    
                    </div>
                    
                    



                }

        </div>
    )

}

export default MenuModal;