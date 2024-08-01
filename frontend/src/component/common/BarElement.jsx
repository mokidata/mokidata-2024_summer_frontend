function BarElement(props){
    return(
        <div className="chart__element" id="bar"  style={{
            height: `${(((props.value - props.min) / (props.max -props.min)) * 50) + 100}px`,
            backgroundColor: props.highlight ? "#FF2C70": "#E4E8EB"
          }}>
        </div>
    )
}

export default BarElement;