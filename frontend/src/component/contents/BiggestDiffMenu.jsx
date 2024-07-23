import Button from "../common/Button";
import Triangle from "../common/Triangle";

function BiggestDiffMenu(props){

    return(
        <div className="report-component" id="biggest-diff-menu" >
            <div className="report-title"> 
                지난주 대비 많이 팔린 메뉴
            </div>
            <div className="diff">
                <div className="diff-desc" style={{textAlign:"left"}}>
                    <div className="diff-desc__title">
                        딸기 스무디
                    </div>
                    <div className="diff-desc__percent" >
                        13.5 %
                    </div>
                    <Triangle diff={123456} unit="원" > 

                    </Triangle>
                    
                </div>
                <div className="diff-img">

                </div>
            </div>
            <div className="notice" style={{textAlign:"right"}}>
                ❕판매기록이 없었던 제품은 제외됩니다.
            </div>
           
        
            <div className="report-title">
                지난주 대비 적게 팔린 메뉴
            </div>
            <div>

            </div>
            <div className="diff">
                <div className="diff-img">
                </div>
                <div className="diff-desc" style={{textAlign:"right"}}>
                    <div className="diff-desc__title">
                        크렌베리 베이글
                    </div>
                    <div className="diff-desc__percent">
                        -20.2 %
                    </div>
                    <Triangle diff={-123456} unit="원" > 

                    </Triangle>
                    
                </div>
                

            </div>
            <div className="notice" style={{textAlign:"left"}}>
                ❕판매기록이 없었던 제품은 제외됩니다.
            </div>
            <div className="button-div">
                <Button txt="자세히 보기 &nbsp;> " color="transparent"></Button>
            </div>
            
            
        </div>
    );
}

export default BiggestDiffMenu;