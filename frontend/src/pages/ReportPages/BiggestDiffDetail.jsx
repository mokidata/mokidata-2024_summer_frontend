import { useLocation } from "react-router-dom";
import Button from "../../component/common/Button";
import Header from "../../component/common/Header";
import { useEffect, useState } from "react";
import GetInteger from "../../component/common/GetInteger";
import Price from "../../component/common/Price";

function BiggestDiffDetail (props){
    const location = useLocation()
    const {state} = location
    const todayArray = state.todayValue[state.page]
    const lastArray = state.lastDetailValue[state.page]
    console.log(state)
    const [diffRank,setDiffRank] = useState([])
    const [diffType,setDiffType] = useState("sale")
    useEffect(()=>{
        if(Object.keys(state.todayValue[state.page]).length !== 0 ){
            
            const diffArray = []
            todayArray.forEach(element => {
                const obj = {}
                const compareElement = lastArray.find((item)=> item.name === element.name)
                if(compareElement !== undefined){
                    obj['name'] = element.name
                    const todayProfit = element.count * element.price
                    const lastProfit =  compareElement.count * compareElement.price
                    obj['lastSales'] = compareElement.count
                    obj['todaySales'] = element.count
                    obj['todayProfit'] = todayProfit
                    obj['lastProfit'] = lastProfit
                    obj['profitDiff'] =  todayProfit - lastProfit
                    obj['percentage'] = Math.round(((todayProfit - lastProfit) / lastProfit)*100*100)/100 
                    diffArray.push(obj)
                }
            });
            diffArray.sort((a,b) => a.profitDiff - b.profitDiff).reverse()
            setDiffRank(diffArray);
        }
    },[state])
    useEffect(()=>{
        console.log(diffRank)
    },[diffRank]);
    function changeType(type) {
        setDiffType(type);
    }
    

    return(
        <div className="report-page">
            <Header page={state.page}></Header>
            <div className="report-component" id="best-rank">
                <div className="best-rank__goback">
                    &lt; {
                    props.page === 'daily'? '어제와':
                    props.page === 'weekly'? '지난 주와':
                    props.page === 'monthly' ? '지난 달과':
                    '어제와'

                } 판매 비교
                </div>
                <div className="best-rank__notice">
                    <div className="notice">
                        판매 기록이 없었던 제품은 제외됩니다.
                    </div>
                    
                </div>
                <div className="best-rank__button">
                    <div className="best-rank__each-button" onClick={(event) => changeType("sale")}>
                        <Button color={diffType==="sale" ? "black":"white"} txt="판매갯수"></Button>
                    </div>
                    <div className="best-rank__each-button" onClick={(event) => changeType("profit")}>
                        <Button color={diffType==="sale" ? "white":"black"} txt="판매수익"></Button>
                    </div>
                
                    
                    
                </div>
                <div className="best-rank__table">
                    <div className="best-rank__column-info">
                        <div className="best-rank__column" id="rank__rank">
                            순위
                        </div>
                        <div className="best-rank__column" id="rank__menu-info">
                            메뉴명
                        </div>
                        <div className="best-rank__column" id="rank__last-profit">
                            지난주
                        </div>
                        <div className="best-rank__column" id="rank__profit">
                            이번주
                        </div>
                    </div>
                    {
                        diffRank.map((element,index)=>(
                            <div className="best-rank__each" id={(index+1) %2 === 0 ? "even":"odd"}>
                                <div className="best-rank__row" id="rank__rank">
                                    {index+1}
                                </div>
                                <div className="best-rank__row" id="rank__menu-info">
                                    <div className="best-rank__row__menu">
                                        {element.name}
                                    </div>
                                    <div className="best-rank__row__sales" 
                                        style={{color:element.percentage >= 0 ? "red" :
                                                "blue"
                                        }}>
                                        {element.percentage > 0 ? "+" : ""}{element.percentage}%
                                    </div>
        
                                </div>
                                <div className="best-rank__row" id="rank__last-profit">
                                    {diffType === "sale" ? 
                                    `${element.lastSales}개`:
                                    <Price value = {element.lastProfit} unit="원"></Price>
                                    
                                    }
                                    
        
                                </div>
                                <div className="best-rank__row" id="rank__profit">
                                    {diffType === "sale" ? 
                                    `${element.todaySales}개`:
                                    <Price value = {element.todayProfit} unit="원"></Price>
                                     
                                    }
                                    
                                    
                                </div>
        
                            </div>


                        ))
                        
                    }
                   
                </div>

            </div>
        </div>
    )
}

export default BiggestDiffDetail;