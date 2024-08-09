import { useEffect, useState } from "react";

function BarElement(props){

    const [barValue,setBarValue] = useState(100);
    const animateBarIncrease = () => {
        let start = 70
        const end = (((props.value -props.min ) / (props.max -props.min)) * 50) + 100
        const duration = 2000
        const range = end - start;
        const incrementTime = 50; // 업데이트 간격 (50ms)
        const steps = Math.ceil(duration / incrementTime); // 총 단계 수
        const incrementValue = Math.ceil(range / steps); // 각 단계에서 증가할 값

        const timer = setInterval(() => {
            if (start < end) {
                start += incrementValue;
                setBarValue(start);
            } else {
                clearInterval(timer);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }
    useEffect(()=>{
        console.log(`${props.value} ${props.max} ${props.min} ${props.isVisible}`)
        if(props.isVisible)
        {
            setBarValue(70)
            animateBarIncrease()
        }
        
    },[props.max,props.min,props.isVisible])
    return(
        <div className="chart__element" id="bar"  style={{
            height: `${barValue}px`,
            backgroundColor: props.highlight ? "#FF2C70": "#E4E8EB"
          }}>
        </div>
    )
}

export default BarElement;