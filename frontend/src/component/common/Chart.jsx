import { useEffect, useState } from "react";
import BarElement from "./BarElement";
import Price from "./Price";

function Chart(props){

    /*
    {column : "어제매출" , value : 123456, highlight : true}
    */ 
    const [value, setValue] = useState([]);
    const [chartType, setChartType] = useState("bar");
    const [max,setMax] = useState(0);
    useEffect(() => {
        setValue(props.data);
        setMax(Math.max(...value.map((item) => item.value)));
    },[value]);
    useEffect(() => {
        setChartType(props.type);
    },[chartType]);
    
    
    

    return(
        <div className="chart" id={chartType}>
            {
                value.map((data) =>(
                    <div className= "chart__data" id={data.highlight ? "highlight" : "" }>
                        <div className="chart__value" id={chartType}>
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
