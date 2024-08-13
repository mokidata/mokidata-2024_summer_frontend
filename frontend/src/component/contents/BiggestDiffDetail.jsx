import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../component/common/Button";
import Header from "../../component/common/Header";
import { useEffect, useState } from "react";
import GetInteger from "../../component/common/GetInteger";
import Price from "../../component/common/Price";
import { motion } from "framer-motion";
import TopButton from "../../component/common/TopButton";
import DropDownMenu from "../../component/common/DropDownMenu";
import CalendarContent from "../../component/common/CalendarContent";
import useSalesData from "../../hooks/useSalesData";
import BottomNavbar from "../../component/common/BottomNavbar";
import LoadingScreen from "../../component/common/LoadingScreen";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../component/common/DateConverter";
function BiggestDiffDetail (props){
   
    console.log(props)

    const [todayArray,setTodayArray] = useState([{"daily":[],"weekly":[],"monthly":[]}]) 
    const [lastArray,setLastArray] = useState([{"daily":[],"weekly":[],"monthly":[]}]) 
    useEffect(()=>{
        if(props.rankDetailValue !== null){
            console.log(props.rankDetailValue)
            setTodayArray(props.rankDetailValue[props.page])
        }
    },[props.rankDetailValue , props])
    useEffect(()=>{
        if(props.lastDetailValue !== null){
             setLastArray(props.lastDetailValue[props.page])
        }
       
    },[props.lastDetailValue, props])
    
    const [diffSaleRank,setDiffSaleRank] = useState([])
    const [diffProfitRank, setDiffProfitRank] = useState([])
    const [diffType,setDiffType] = useState("sale")

    useEffect(()=>{
        console.log(todayArray)
        
        if(Object.keys(todayArray).length !== 0 ){
            
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
            setDiffProfitRank([...diffArray]);
            //sale 차이 구하기
            diffArray.sort((a,b) => a.profitDiff - b.profitDiff).reverse()
            setDiffSaleRank([...diffArray])
        }
    },[todayArray])
  
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
                                    style={{color:element.percentage >= 0 ? "red" :
                                            "blue"
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