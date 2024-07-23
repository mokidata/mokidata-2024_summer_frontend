import Button from "../common/Button";
import Price from "../common/Price";

function BestMenu(props){
    return(
        <div className="report-component" id="best-menu">
            <div className="report-title">
                이번 주에 가장 많이 팔린 메뉴
            </div>
            <div className="best-menu">
                <div className="best-menu__first">
                    <div className="best-menu__title">
                        Iced Americano
                    </div>
                    <div className="best-menu__benefits" id="best">
                        
                        <Price value={423456} unit="원"></Price>
                    </div>
                    <div className="best-menu__img">
                        
                    </div>
                </div>
                <div className="best-menu__second">
                    <div className="best-menu__other">
                        <div className="best-menu__title">
                            Cafe latte
                        </div>
                        <div className="best-menu__benefits">
                            <Price value={12344} unit="원"></Price>
                        </div>

                    </div>
                    <div className="best-menu__other">
                            <div className="best-menu__title">
                                Iced tea
                            </div>
                            <div className="best-menu__benefits">
                                <Price value={5467} unit="원" ></Price>
                            </div>

                    </div>
                </div>
            </div>
            <div className="button-div">
                <Button txt="자세히 보기 &gt;" color="transparent"></Button>
            </div>
            
            
        </div>
    );
}

export default BestMenu;