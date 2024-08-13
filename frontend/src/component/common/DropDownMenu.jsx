import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {clearStore} from "../../services/salesApiSlice"
function DropDownMenu (props){
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
                    &lt; {props.t('logout')}
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
                <div className="side-nav__bottom-language__div">
                    <div className="side-nav__bottom-language" onClick={() => props.changeLanguage('ko')} >
                        한국어
                    </div>
                    |
                    <div className="side-nav__bottom-language" onClick={() => props.changeLanguage('en')}>
                        English
                    </div>

                </div>
                <div className="side-nav__bottom-name">
                    {sessionStorage.getItem("name")}
                </div>
            </div>

        </div>
    )
}

export default DropDownMenu