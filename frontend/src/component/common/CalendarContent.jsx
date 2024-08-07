function CalendarContent(props){
    return(

        <div className="side-nav">
            {/* <div className="side-nav__top">
                <div className="side-nav__title">
                    날짜 선택하기
                </div>
                <div className="side-nav__close" onClick={() => props.open()}>
                    X
                </div>

            </div>
            <div className="side-nav__list">
                {
                    props.dateList.map((element,index)=>(
                        <div className="side-nav__content" onClick={()=>{
                            props.open();
                            props.scroll(index);
                            }} >
                            {element}
                        </div>
                    ))
                }
            </div> */}


        </div>
    );

}

export default CalendarContent