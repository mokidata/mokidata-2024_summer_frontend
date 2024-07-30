import { useEffect, useState } from "react";
import BarElement from "./BarElement";
import Price from "./Price";

function Chart(props){

    // [
    //     {
    //         "column": "예상 매출",
    //         "value": 99826887,
    //         "highlight": false
    //     },
    //     {
    //         "column": "실제 매출",
    //         "value": 101000300,
    //         "highlight": true
    //     }
    // ]
   
    const [value, setValue] = useState([{"column":'',"value":0}]);
    const [chartType, setChartType] = useState("bar");
    const [max,setMax] = useState(0);
    useEffect(() => {
        setValue(props.data)
        let highestValue = -Infinity; // 초기값을 매우 작은 값으로 설정
        for (const element of value) {
            if (element.value > highestValue) {
                highestValue = element.value;
            }
        }
        setMax(highestValue)
    });
    useEffect(() => {
        setChartType(props.type);
    },[props.type]);
    
    
    

    return(
        <div className="chart" id={chartType}>
            {
                value.map((data) =>(
                    <div className= "chart__data" id={data.highlight ? "highlight" : "" }>
                        <div className="chart__value" id={data.highlight ? "highlight" : "" }>
                            <Price value={data.value}></Price>
                        </div>
                        {
                            chartType === 'bar' ? (
                                <BarElement max={max} value={data.value} highlight={data.highlight ? "highlight":""}></BarElement>
                            ) : ""
                        }
                        <div className="chart__column" id={chartType}>
                            {data.column}
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default Chart;
