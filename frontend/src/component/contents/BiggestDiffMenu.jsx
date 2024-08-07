import { useEffect, useState } from "react";
import Button from "../common/Button";
import Triangle from "../common/Triangle";
import { BASE_URL } from "../Url";
import { useNavigate } from "react-router-dom";

function BiggestDiffMenu(props){
    const navigate = useNavigate()
    const [salesDetailValue,setSalesDetailValue] = useState({})
    const [lastDetailValue,setLastDetailValue] = useState({})
    const [diffArray , setDiffArray] = useState([])
    const [bestMenu,setBestMenu] = useState({"name":"","percentage" : 0,"diff" : 0,"img":""})
    const [worstMenu,setWorstMenu] = useState({"name":"","percentage" : 0,"diff" : 0,"img":""})
    let result = {};
    useEffect(()=>{
        if(props.todayValue[props.page].length !== 0){
            result ={}
            props.todayValue[props.page].forEach(item => {
                const { name, count, price } = item;
                result[name] = { count, price };
            });
            setSalesDetailValue(result);
        }
        if(props.todayValue[props.page].length !== 0){
            result ={}
            props.lastDetailValue[props.page].forEach(item => {
                const { name, count, price } = item;
                result[name] = { count, price };
            });
            setLastDetailValue(result);
        }
    },[props])
    useEffect(()=>{
        if(salesDetailValue.length !== 0 && lastDetailValue.length !== 0){
            const diff = Object.keys(salesDetailValue).map((name)=>{
                const obj = {}
                obj['name'] = name
                if(lastDetailValue[name] !== undefined){
                    const todayProfit = salesDetailValue[name].price * salesDetailValue[name].count
                    const lastProfit = lastDetailValue[name].price * lastDetailValue[name].count
                    obj['diff'] =  todayProfit - lastProfit
                    obj['percentage'] = Math.round((todayProfit - lastProfit) / lastProfit * 100 * 100  )/100 //소숫점 둘째자리로 반올림
                }
                
                return obj;
            })
            setDiffArray(diff)
        }
        
    },[salesDetailValue,lastDetailValue])

    useEffect(()=>{
        // 가자 상승률 높은 객체 찾기
        if(diffArray.length !== 0){
            const maxPercentageObject = diffArray.reduce((max, item) => {
                return item.percentage > max.percentage ? item : max;
            });
            //가장 상승률 높은 메뉴의 이미지 찾기
            if(Object.keys(props.menuObject).length !== 0){ 
                maxPercentageObject["img"] = props.menuObject[maxPercentageObject.name]['img']
            }
            

            // 가장 상승률 낮은 객체 찾기
            const minPercentageObject = diffArray.reduce((min, item) => {
                return item.percentage < min.percentage ? item : min;
            });
            //가장 상승률 높은 메뉴의 이미지 찾기
            if(Object.keys(props.menuObject).length !== 0){ 
                minPercentageObject["img"] = props.menuObject[minPercentageObject.name]['img']
            }

            setBestMenu(maxPercentageObject)
            setWorstMenu(minPercentageObject)
        }
        
    },[diffArray])

    function BiggestDiffDetailNavigate (){
        navigate("/biggestdiff",{state:{todayValue:props.todayValue, lastDetailValue:props.lastDetailValue , page:props.page}})
    }
    
    /*
    diffArray [{
        "name":딸기우유,
        "percentage" : 12.3
        "diff" : 12345,
        "img":""
    } , ...]
    */ 

    return(
        <div className="report-component" id="biggest-diff-menu" >
            <div className="report-title"> 
                {
                    props.page === 'daily'? '어제':
                    props.page === 'weekly'? '지난 주':
                    props.page === 'monthly' ? '지난 달':
                    '어제'

                } 대비 많이 팔린 메뉴
            </div>
            <div className="diff">
                <div className="diff-desc" style={{textAlign:"left"}}>
                    <div className="diff-desc__title">
                        {bestMenu.name}
                    </div>
                    <div className="diff-desc__percent" >
                        {bestMenu.percentage} %
                    </div>
                    <Triangle diff={bestMenu.diff} unit="원" > 

                    </Triangle>
                    
                </div>
                <div className="diff-img" style={{backgroundImage:`url(${BASE_URL}${bestMenu.img})`}}>

                </div>
            </div>
            <div className="notice" style={{textAlign:"right"}}>
                ❕판매기록이 없었던 제품은 제외됩니다.
            </div>
           
        
            <div className="report-title">
                {
                    props.page === 'daily'? '어제':
                    props.page === 'weekly'? '지난 주':
                    props.page === 'monthly' ? '지난 달':
                    '어제'

                } 대비 적게 팔린 메뉴
            </div>
            <div>

            </div>
            <div className="diff">
                <div className="diff-img" style={{backgroundImage:`url(${BASE_URL}${worstMenu.img})`}} >
                </div>
                <div className="diff-desc" style={{textAlign:"right"}}>
                    <div className="diff-desc__title">
                        {worstMenu.name}
                    </div>
                    <div className="diff-desc__percent">
                        {worstMenu.percentage} %
                    </div>
                    <Triangle diff={worstMenu.diff} unit="원" > 

                    </Triangle>
                    
                </div>
                

            </div>
            <div className="notice" style={{textAlign:"left"}}>
                ❕판매기록이 없었던 제품은 제외됩니다.
            </div>
            <div className="button-div" id="report" onClick={(event)=>{
                BiggestDiffDetailNavigate()

            }}>
                <Button txt="자세히 보기 &nbsp;> " color="transparent"></Button>
            </div>
            
            
        </div>
    );
}

export default BiggestDiffMenu;