import Button from "../common/Button"
function WarningModal(props){
    return(
        <div className="modal-background">
            <div className="modal" id="name">
                <div className="modal-warning__div">
                    <div className="modal-warning__content">
                        설정된 모든 데이터가 초기화됩니다. <br></br>
                        초기화 하시겠습니까?
                    </div>

                </div>
                
                <div className="modal-btn__div">
                    <div className="modal-btn" onClick={props.openModal}>
                        <Button id="modal-btn" txt="취소" color="grey" shape="rect" fontColor="white"></Button> 
                    </div>
                    <div className="modal-btn" onClick={async () =>{
                        props.setLoadingMsg("데이터 삭제 중")
                        props.setReload(true)
                        props.openModal()
                        await props.deleteMenu()
                        props.setReload(false)
                        }}>
                        <Button id="modal-btn" txt="확인" color="red" shape="rect" > </Button>
                    </div>
                </div>
                

            </div>

        </div>
    )

}

export default WarningModal