import { useEffect, useState } from "react";
import Button from "../common/Button";
import Price from "../common/Price";
import { BASE_URL } from "../Url";
import { useLocation, useNavigate } from "react-router-dom";
function BestMenu(props){

    const [rankDetail,setRankDetail] = useState([{name:"",price:"",count:""},{name:"",price:"",count:""},{name:"",price:"",count:""}]);
    const [rankFirst,setRankFirst] = useState({})
    const [rankSecond,setRankSecond] = useState({})
    const [rankThird,setRankThird] = useState({})
    const [firstUrl,setFirstUrl] = useState("")
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(()=>{
        try {
            console.log(props.rankDetailValue);
            console.log(props.lastDetailValue)
            console.log(props.menuObject)
            switch(props.page){
                
                case 'daily':
                    setRankDetail(props.rankDetailValue.daily.saleGetResList)
                    break;
                case 'weekly':
                    setRankDetail(props.rankDetailValue.weekly.saleGetResList)
                    break;
                case 'monthly':
                    setRankDetail(props.rankDetailValue.monthly.saleGetResList)
                    break;
                default:
                    setRankDetail(props.rankDetailValue.daily.saleGetResList)
                    break;
                   
            }
           
            
            
        } catch (error) {
            console.log(error)
        }
    },[]);
    
    useEffect(()=>{
        console.log(rankDetail); 
        setRankFirst(rankDetail[0]);
        setRankSecond(rankDetail[1]);
        setRankThird(rankDetail[2]);
    },[rankDetail])

    useEffect(()=>{
        if(rankFirst.name && Object.keys(props.menuObject).length !== 0 ){
            console.log(rankFirst.name)
            console.log(props.menuObject[rankFirst.name])
            console.log(props.menuObject[rankFirst.name]['img'])
            setFirstUrl( props.menuObject[rankFirst.name]['img'])
        }
        
    },[rankFirst])

    const navigateRankDetail= () => {
        navigate("/bestmenu",{state:{rankDetail:props.rankDetailValue, lastDetail: props.lastDetailValue, page:props.page}})

    }

    
    

    return(
        <div className="report-component" id="best-menu">
            <div className="report-title">
                이번 주에 가장 많이 팔린 메뉴
            </div>
            <div className="best-menu">
                <div className="best-menu__first">
                    <div className="best-menu__title">
                        {rankFirst.name}
                    </div>
                    <div className="best-menu__benefits" id="best">
                        
                        <Price value={rankFirst.count * rankFirst.price} unit="원"></Price>
                    </div>
                    <div className="best-menu__img" style={{backgroundImage:`url(${BASE_URL}${firstUrl})`}} >
                        
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
            <div className="button-div" onClick={(event)=>{
                navigateRankDetail()
            }
                
            }>
                <Button txt="자세히 보기 &gt;" color="transparent"></Button>
            </div>
            
            
        </div>
    );
}

export default BestMenu;