import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {clearStore} from "../../services/salesApiSlice"
function DropDownMenu (props){
    const sideList = ['이번 매출','매출 예상과 실제 매출 비교',"매출 예상","가장 많이 팔린 메뉴","직전 대비 가장 많이/적게 팔린 메뉴"]
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logout = () => {
        sessionStorage.removeItem("accessToken")
        sessionStorage.removeItem("name")
        dispatch(clearStore())
        navigate("/")        
    }

    return(
        <div className="side-nav">
            <div className="side-nav__top">
                <div className="side-nav__title" onClick={()=>logout()}>
                    &lt; 로그아웃
                </div>
                <div className="side-nav__close" onClick={() => props.open()}>
                    X
                </div>

            </div>
            <div className="side-nav__list">
                {
                    props.sideList.map((element,index)=>(
                        <div className="side-nav__content" onClick={()=>{
                            props.open();
                            props.onclickFunction(index);
                            }} >
                            {element}
                        </div>
                    ))
                }
                

            </div>
            <div className="side-nav__bottom">
                <div className="side-nav__bottom-opt">

                </div>
                <div className="side-nav__bottom-name">
                    {sessionStorage.getItem("name")}
                </div>
            </div>

        </div>
    )
}

export default DropDownMenu