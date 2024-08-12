import { useEffect, useState } from "react";
import Button from "../common/Button";
import Price from "../common/Price";
import { BASE_URL } from "../Url";
import { useLocation, useNavigate } from "react-router-dom";
function BestMenu(props){
    const rankDetail = [...props.rankDetailValue[props.page]]
    const [rankFirst,setRankFirst] = useState({})
    const [rankSecond,setRankSecond] = useState({})
    const [rankThird,setRankThird] = useState({})
    const [firstUrl,setFirstUrl] = useState("")
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(rankDetail)
        
        if(props.rankDetailValue[props.page].length !== 0){
            console.log(rankDetail)
            rankDetail.sort((a, b) => (b.price * b.count) - (a.price * a.count));
            setRankFirst(rankDetail[0]);
            setRankSecond(rankDetail[1]);
            setRankThird(rankDetail[2]);
        }
        
    },[props.rankDetailValue[props.page]])

    useEffect(()=>{
        if(rankFirst.name && Object.keys(props.menuObject).length !== 0 ){
            setFirstUrl( props.menuObject[rankFirst.name]['img'])
        }
        
    },[rankFirst])

    const navigateRankDetail= () => {
        navigate("/bestmenu",{state:{rankDetail:rankDetail, currentDate:props.currentDate, lastDetail: props.lastDetailValue, page:props.page}})

    }

    
    

    return(
        <div className="report-component" id="best-menu">
            <div className="report-title">
                {
                    props.page === 'daily'? '오늘':
                    props.page === 'weekly'? '이번 주에':
                    props.page === 'monthly' ? '이번 달에':
                    '오늘'

                } 가장 많이 팔린 메뉴
            </div>
            <div className="best-menu">
                <div className="best-menu__first">
                    <div className="best-menu__title">
                        {rankFirst.name}
                    </div>
                    <div className="best-menu__benefits" id="best">
                        
                        <Price value={rankFirst.count * rankFirst.price} unit="원"></Price>
                    </div>
                    <div className="best-menu__img-div">
                        <div className="best-menu__img" style={{backgroundImage:`url(${BASE_URL}${firstUrl})`}} >
                        
                        </div>  
                    </div>
                    
                </div>
                <div className="best-menu__second">
                    <div className="best-menu__other">
                        <div className="best-menu__title">
                            {rankSecond.name}
                        </div>
                        <div className="best-menu__benefits">
                            <Price value={rankSecond.count * rankSecond.price} unit="원"></Price>
                        </div>

                    </div>
                    <div className="best-menu__other">
                            <div className="best-menu__title">
                                {rankThird.name}
                            </div>
                            <div className="best-menu__benefits">
                                <Price value={rankThird.count * rankThird.price} unit="원" ></Price>
                            </div>

                    </div>
                </div>
            </div>
            <div className="button-div" id="report" onClick={(event)=>{
                navigateRankDetail()
            }
                
            }>
                <Button txt="자세히 보기 &gt;" color="transparent"></Button>
            </div>
            
            
        </div>
    );
}

export default BestMenu;