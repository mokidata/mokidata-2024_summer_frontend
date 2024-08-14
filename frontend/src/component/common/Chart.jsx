import { useEffect, useState } from "react";
import BarElement from "./BarElement";
import Price from "./Price";

function Chart(props){

    // [
    //     {
    //         "column": "예상 매출",
    //         "value": 99826887,
    //         "highlight": false,
    //         "valueHighlight": false
    //     },
    //     {
    //         "column": "실제 매출",
    //         "value": 101000300,
    //         "highlight": true,
    //         "valueHighlight" : false  
    //     }
    // ]
   
    const [value, setValue] = useState([{"column":'',"value":0}]);
    const [chartType, setChartType] = useState("bar");
    const [max,setMax] = useState(0);
    const [min,setMin] = useState(0);
    const [animateValue, setAnimateValue] = useState([])
    const valueUpAnimation = (minimum, target, index) => {
        let start = minimum;
        const end = target;
        const duration = 2000;
        const range = end - start;
        const incrementTime = 50; // 업데이트 간격 (50ms)
        const steps = Math.ceil(duration / incrementTime); // 총 단계 수
        const incrementValue = Math.ceil(range / steps); // 각 단계에서 증가할 값

        const timer = setInterval(() => {
            if (start < end) {
                start += incrementValue;
                setAnimateValue((prev) => {
                    const newValues = [...prev];
                    newValues[index] = start; // index에 해당하는 값만 업데이트
                    return newValues;
                });
            } else {
                clearInterval(timer);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }
    
    useEffect(() => {
        setValue(props.data)
        let highestValue = -Infinity; // 초기값을 매우 작은 값으로 설정
        let lowestValue = Infinity
        for (const element of value) {
            if (element.value > highestValue) {
                highestValue = element.value;
            }
            if(element.value < lowestValue){
                if(element.value !== 0){
                    lowestValue = element.value
                }
                
            }
        }
        setMax(highestValue);
        setMin(lowestValue);
    });
    useEffect(() => {
        setChartType(props.type);
    },[props.type]);
    useEffect(() => {
        if (props.isVisible) {
            value.forEach((data, index) => {
                valueUpAnimation(min, data.value, index); // 각 데이터에 대한 애니메이션 실행
            });
        }
    }, [props.isVisible, min, value]);


    useEffect(() => {
        setAnimateValue(Array(value.length).fill(min)); // 초기값을 min으로 설정
    }, [min, value]);
    
    

    return(
        <div className="chart" id={chartType}>
            {
                value.map((data,index) =>(
                    <div className= "chart__data" id={data.highlight ? "highlight" : "" }>
                        <div className="chart__value" id={data.highlight ? "highlight" : ""} style={{fontSize:data.valueHighlight? "x-large":"" , fontWeight:data.highlight ? "bold":""}}>
                            <Price value={animateValue[index]}></Price>
                        </div>
                        {
                            chartType === 'bar' ? (
                                
                                <BarElement isVisible={props.isVisible} max={max} min={min} value={data.value} highlight={data.highlight ? "highlight":""}></BarElement>
                                
                                
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
