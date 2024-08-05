import Button from "../common/Button"

function MenuSet(props){

    
    return(
        <div className="menu-set">
            <div className="menu-set__desc">
                <div className="menu-set__txt">
                    메뉴 등록
                </div>
                <div className="menu-set__btn-div">
                    <Button txt="&nbsp;&nbsp;등록+&nbsp;&nbsp;" color="green" shape="rect" fontSize='12px'></Button>
                </div>
                
                
            </div>
            <div className="menu-set__menulist">
                {
                    props.menuList.map((element,index) => (

                        <div className="menu-tag">
                            # {element}
                        </div>
                    ))
                }

            </div>
           

        </div>
    )

}

export default MenuSet