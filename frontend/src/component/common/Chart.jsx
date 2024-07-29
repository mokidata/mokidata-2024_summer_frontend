import { useEffect, useState } from "react";
import BarElement from "./BarElement";
import Price from "./Price";

function Chart(props){

    /*
    {"predict":{value : 123456, highlight : true} ,"today ":{value : 123456, highlight : true}}
    */ 
   
    const [value, setValue] = useState([{"column":'',"value":0}]);
    const [chartType, setChartType] = useState("bar");
    const [max,setMax] = useState(0);
    useEffect(() => {
        console.log(props.data)
        setValue(props.data)
        let highestValue = -Infinity; // 초기값을 매우 작은 값으로 설정
        for (const element of value) {
            console.log(element)
            if (element.value > highestValue) {
                highestValue = element.value;
            }
        }
        setMax(highestValue)
    },[props.data]);
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
