import { useEffect, useRef, useState } from "react"
import Button from "../common/Button"
import { mokiApi } from "../../services/loginApi"
import { BASE_URL } from "../Url"

function InputMenu(props){
    const fileToImage = (file) => {
        const reader = new FileReader();
        // 파일을 Data URL로 변환
        
        reader.onloadend = () => {
            console.log()
            setMenuImg(reader.result)
        };
        reader.readAsDataURL(file); 
    }
    const [menuName,setMenuName] = useState(props.pick.name === "NO DATA" ? "" : props.pick.name)
    const [menuPrice,setMenuPrice] = useState(props.pick.price)
    const [menuMax,setMenuMax] = useState(props.pick.maxCount)
    const [menuMin,setMenuMin] = useState(props.pick.minCount)
    const [menuImg,setMenuImg] = useState(
        props.pick.img === null ? "" :
        props.pick.img instanceof File ? () => {
            fileToImage(props.pick.img)
        }:
        `${BASE_URL}${props.pick.img}`)
    const [imageFile,setImageFile] = useState(null) 
    const inputRef = useRef(null);
    console.log(props)
    
    const onUploadImage = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
          return;
        }
        
        const file = e.target.files[0];
        setImageFile(file)
        fileToImage(file)
        
    };

    const onUploadImageButtonClick = () => {
        if (inputRef.current) {
          inputRef.current.click(); // 파일 입력 클릭
        }
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        console.log(event.target.name)
        switch (event.target.name) {
            case 'name':
                setMenuName(value)
                break
            case 'price':
                setMenuPrice(value)
                break
            case 'max':
                setMenuMax(value)
                break
            case 'min':
                setMenuMin(value)
        };
    }

    const updateNewMenu = () => {
        const data = {}
        data['name'] = menuName
        data['price'] = menuPrice
        if(imageFile instanceof File){
            data['img'] = imageFile
        }
        data['maxCount'] = menuMax
        data['minCount'] = menuMin
        return data
    }

    


    return(
        <div className="modal" id="modal-menu">
            <div className="modal-title" id="input">
                메뉴 정보 설정
            </div>
            <div className="modal-input__info">
                <div className="modal-input__pic-div">
                    
                        {menuImg === ""?
                            <div className="modal-input__pic-circle">
                                
                                <div className="modal-image__empty">
                                    NO IMAGE
                                </div>
                               
                            </div> 
                            :
                            <div className="modal-input__pic-circle" style={{backgroundColor:"transparent",
                            backgroundImage:  `url(${menuImg})` , backgroundPosition:'center',backgroundSize:'cover'}}>
                    
                            </div> 
                        }

                    
                    <button className="modal-input__pic-btn" onClick={onUploadImageButtonClick}>
                        사진 등록
                    </button>
                    <input type="file" accept="image/*" style={{display:"none"}} ref={inputRef} onChange={onUploadImage}/>
                        
                    

                </div>
                
                <div className="modal-input__text-div">
                    
                    <div className="modal-input__text-type">
                        메뉴명
                    </div>
                    <div className="modal-input__text-input">
                        <input
                            className="admin-input-img"
                            id="modal-input"
                            name="name"
                            value={menuName}
                            onChange={handleInputChange}
                        />
                        <div className="modal-input__unit"></div>
                        
                    </div>
                    <div className="modal-input__text-type">
                        개당 가격
                    </div>
                    <div className="modal-input__text-input">
                        <input
                            className="admin-input-img"
                            id="modal-input"
                            name="price"
                            value={menuPrice}
                            onChange={handleInputChange}
                        />
                        <div className="modal-input__unit">원</div>
                        
                    </div>
                </div>
            </div>
            <div className="modal-title" id="input">
                범위 설정
            </div>
            <div className="modal-input__range">
                
                <div className="modal-input__range-point">
                    <div className="modal-input__range-desc">
                        최소
                    </div>
                    <div className="modal-input__range-input">
                        <input
                            className="admin-input-img"
                            id="modal-input"
                            name="min"
                            value={menuMin}
                            onChange={handleInputChange}
                        /><div className="modal-input__unit"> 개</div>

                    </div>
                </div>
                <div className="modal-input__range-point">
                    <div className="modal-input__range-desc">
                        최대
                    </div>
                    <div className="modal-input__range-input">
                        <input
                            className="admin-input-img"
                            id="modal-input"
                            name="max"
                            value={menuMax}
                            onChange={handleInputChange}
                        />
                        <div className="modal-input__unit"> 개</div>

                    </div>
                </div>
            </div>
            <div className="modal-btn__div">
                <div className="modal-btn" onClick={() => props.close(-1)}>
                    <Button id="modal-btn" txt="취소" color="grey" shape="rect" fontColor="white"></Button> 
                </div>
                <div className="modal-btn" onClick={() => {
                    props.close(-1)
                    props.update(updateNewMenu(),props.index)
                }}>
                    <Button id="modal-btn" txt="확인" color="blue" shape="rect" > </Button>
                </div>
            </div>
        </div>
    )
}

export default InputMenu;