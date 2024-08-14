import Button from "../../component/common/Button";
import { useEffect, useState } from "react";
import Price from "../../component/common/Price";
import { motion } from "framer-motion";

function BiggestDiffDetail (props){
   
    console.log(props)


    
    const [todayArray,setTodayArray] = useState([]) 
    const [lastArray,setLastArray] = useState([]) 
    const [diffSaleRank,setDiffSaleRank] = useState([])
    const [diffProfitRank, setDiffProfitRank] = useState([])
    const [diffType,setDiffType] = useState("sale")

    //정렬 결과를 제대로 반영하기 위한 비동기 함수
    const sorting = async (arr,key,type) => {
        await arr.sort((a,b) => {return a[key] - b[key]} )
        console.log(arr)
        if (type === "sale"){
            setDiffSaleRank([...arr].reverse())
        }
        else{
            setDiffProfitRank([...arr].reverse())
        }
    }

    //1. 오늘,이번주,이번달 데이터와 어제,지난주,지난달 판매데이터 가져옴
    useEffect(()=>{
        if(props.rankDetailValue !== null){
            console.log(props.rankDetailValue)
            setTodayArray(props.rankDetailValue[props.page])
        }
        if(props.lastDetailValue !== null){
            setLastArray(props.lastDetailValue[props.page])
        }
     },[props])
    //2. 오늘 판매와 지난 판매 비교값 구하기
    useEffect(()=>{
        if(todayArray.length !== 0 && lastArray.length !== 0 ){
            
            const diffArray = []
            //오늘 메뉴별 매출 데이터를 돌면서 어제 데이터의 매출 데이터 확인 -> obj에 추가해 diffArray에 푸쉬
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
                    if(compareElement.count !== 0){
                         obj['percentage'] = Math.round(((element.count - compareElement.count) / compareElement.count)*100*100)/100 
                    }
                    else{
                        obj['percentage'] = NaN
                    }
                   
                    diffArray.push(obj)
                }
            });
            //판매 갯수 변화에 따라 따라 정렬
            
            sorting([...diffArray],'percentage','sale')
            sorting([...diffArray],'profitDiff','profit')

            //sale 차이에 따라 정렬

            setDiffSaleRank(diffArray.sort((a,b) => a.profitDiff - b.profitDiff).reverse())
            
        }
    },[todayArray,lastArray])
  
    function changeType(type) {
        setDiffType(type);
    }


    return(
        <motion.div 
        initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{ duration: 0.5 }}
        className="report-component" id="best-rank">
            <div className="best-rank__goback" onClick={props.goBack}>
                &lt; {
                props.page === 'daily'? props.t('biggestDiff.diffTitle.daily'):
                props.page === 'weekly'? props.t('biggestDiff.diffTitle.weekly'):
                props.page === 'monthly' ? props.t('biggestDiff.diffTitle.monthly'):
                props.t('biggestDiff.diffTitle.daily')

                }
            </div>
            <div className="best-rank__notice">
                <div className="notice">
                    {props.t('biggestDiff.notice')}
                </div>
                
            </div>
            <div className="best-rank__button">
            <div className="best-rank__each-button" onClick={(event) => changeType("sale")}>
                <Button color={diffType === "sale" ? "black" : "white"} txt={props.t('biggestDiff.saleCount')}></Button>
            </div>
            <div className="best-rank__each-button" onClick={(event) => changeType("profit")}>
                <Button color={diffType === "sale" ? "white" : "black"} txt={props.t('biggestDiff.saleProfit')}></Button>
            </div>
            
                
                
            </div>
            <div className="best-rank__table">
                <div className="best-rank__column-info">
                    <div className="best-rank__column" id="rank__rank">
                        {props.t('biggestDiff.rank')}
                    </div>
                    <div className="best-rank__column" id="rank__menu-info">
                        {props.t('biggestDiff.menuName')}
                    </div>
                    <div className="best-rank__column" id="rank__last-profit">
                        {
                            props.page === "daily" ? props.t('biggestDiff.lastValue.daily') :
                            props.page === "weekly" ? props.t('biggestDiff.lastValue.weekly') :
                            props.page === "monthly" ? props.t('biggestDiff.lastValue.monthly') :
                            ""
                        }
                    </div>
                    <div className="best-rank__column" id="rank__profit">
                        {
                            props.page === "daily" ? props.t('biggestDiff.thisValue.daily') :
                            props.page === "weekly" ? props.t('biggestDiff.thisValue.weekly') :
                            props.page === "monthly" ? props.t('biggestDiff.thisValue.monthly') :
                            ""
                        }
                    </div>
                </div>
                {
                    diffType ==='sale' ? 
                    diffSaleRank.map((element,index)=>(
                        <div className="best-rank__each" id={(index+1) %2 === 0 ? "even":"odd"}>
                            <div className="best-rank__row" id="rank__rank">
                                {index+1}
                            </div>
                            <div className="best-rank__row" id="rank__menu-info">
                                <div className="best-rank__row__menu">
                                    {element.name}
                                </div>
                                <div className="best-rank__row__sales" 
                                    style={{color:element.percentage > 0 ? "red" :
                                                element.percentage < 0 ?  "blue":"grey"
                                    }}>
                                    {element.percentage > 0 ? "+" : ""}{element.percentage}%
                                </div>
    
                            </div>
                            <div className="best-rank__row" id="rank__last-profit">
                                {element.lastSales}개:

                            </div>
                            <div className="best-rank__row" id="rank__profit">
                                {element.todaySales}개               
                            </div>
    
                        </div>


                    ))
                    :
                    diffProfitRank.map((element,index)=>(
                        <div className="best-rank__each" id={(index+1) %2 === 0 ? "even":"odd"}>
                            <div className="best-rank__row" id="rank__rank">
                                {index+1}
                            </div>
                            <div className="best-rank__row" id="rank__menu-info">
                                <div className="best-rank__row__menu">
                                    {element.name}
                                </div>
                                <div className="best-rank__row__sales" 
                                    style={{color:element.profitDiff >= 0 ? "red" :
                                            "blue"
                                    }}>
                                    {element.profitDiff > 0 ? "+" : ""}
                                    <Price value = {element.profitDiff} unit=""></Price>
                                    
                                </div>
                            </div>
                            <div className="best-rank__row" id="rank__last-profit">
                                <Price value = {element.lastProfit} unit="원"></Price>
                            </div>
                            <div className="best-rank__row" id="rank__profit">
                                <Price value = {element.todayProfit} unit="원"></Price>        
                            </div>
    
                        </div>
                    ))

                }
                
            </div>

        </motion.div>

    )
}

export default BiggestDiffDetail;