import { useEffect, useState } from "react";
import Chart from "../common/Chart";
import Price from "../common/Price";
import GetInteger from "../common/GetInteger";

function CompPredictSales (props){
    const [predictTotal,setPredictTotal] = useState(0)
    const [todayTotal,setTodayTotal] = useState(0)
    const [chartData,setChartData] = useState([]);
    useEffect(()=>{
        try {
            
            console.log(props.value[props.page])
            const predictValue = props.value[props.page]["predictData"]
            const menuData = props.menuObject
            // 모든 값을 더하는 코드
            let totalSum = 0;
            
            for (const key in predictValue) {
                if (menuData[key] !== undefined && predictValue[key] !== undefined) {
                    totalSum += menuData[key].price * predictValue[key] ;
                }
            }
            totalSum = GetInteger(totalSum)
            setPredictTotal(totalSum);
            setTodayTotal(props.todayValue[props.page]['today'])
           
        } catch (error) {
            console.log(error)
        }
        
    }, [props.value,props.menuObject])

    useEffect(()=>{
        console.log(predictTotal)
        console.log(todayTotal)
        setChartData([{"column":"예상 매출" , "value" : predictTotal,"highlight":false},{"column":"실제 매출" , "value" : todayTotal,"highlight":true}])
        console.log(chartData)
    },[todayTotal,predictTotal])
   
    
    
    return(
        <div className="report-component">
            <div className="report-title">
                <div className="report-title__benefit">
                    <div>
                         오늘 예상보다&nbsp;
                    </div>
                    <Price value={todayTotal - predictTotal} unit="원"></Price>
                    
                </div>
                <div>
                    더 벌었어요!
                </div>

            </div>
            <Chart type="bar" data={chartData}></Chart>

        </div>
        
    );
}

export default CompPredictSales