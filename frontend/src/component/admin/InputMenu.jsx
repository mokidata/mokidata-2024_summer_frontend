import { useEffect, useRef, useState } from "react"
import Button from "../common/Button"
import { mokiApi } from "../../app/api/loginApi"

function InputMenu(props){
    const [menuName,setMenuName] = useState(props.pick.name)
    const [menuPrice,setMenuPrice] = useState(props.pick.price)
    const [menuMax,setMenuMax] = useState(0)
    const [menuMin,setMenuMin] = useState(0)
    const [imageFile,setImageFile] = useState(null) 
    const inputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const onUploadImage = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
          return;
        }
        
        const file = e.target.files[0];
        setImageFile(file)
        const reader = new FileReader();
        
        reader.onloadend = () => {
          setSelectedImage(reader.result); // 이미지 미리보기 설정
        };
        
        reader.readAsDataURL(file); // 파일을 Data URL로 변환
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

    const postNewMenu = async () => {
        
        
        let formData = new FormData()
        formData.append("menuList[0].menuName",menuName )
        formData.append("menuList[0].price",menuPrice)
        formData.append("menuList[0].image",imageFile)
        formData.append("menuList[0].maxCount",menuMax)
        formData.append("menuList[0].minCount",menuMin)
        
        const response = await mokiApi.post(`/api/menu`,formData,{
            headers:{'Content-Type' : 'multipart/form-data'}
        }).then(
            (response) => {
                console.log(response)
                props.close(-1)
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        );

        
    }


    return(
        <div className="modal" id="modal-menu">
            <div className="modal-title" id="input">
                메뉴 정보 설정
            </div>
            <div className="modal-input__info">
                <div className="modal-input__pic-div">
                    <div className="modal-input__pic-circle">

                    </div>
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
                            name="max"
                            value={menuMax}
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
                            name="min"
                            value={menuMin}
                            onChange={handleInputChange}
                        />
                        <div className="modal-input__unit"> 개</div>

                    </div>
                </div>
            </div>
            <div className="modal-btn">
                <div className="modal-btn__div" onClick={() => props.close(-1)}>
                    <Button id="modal-btn" txt="취소" color="grey" shape="rect" fontColor="white"></Button> 
                </div>
                <div className="modal-btn__div" onClick={() => postNewMenu()}>
                    <Button id="modal-btn" txt="확인" color="blue" shape="rect" > </Button>
                </div>
            </div>
        </div>
    )
}

export default InputMenu;