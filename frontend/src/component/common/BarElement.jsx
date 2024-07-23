function BarElement(props){
    return(
        <div className="chart__element" id="bar"  style={{
            height: `${(props.value / props.max) * 150}px`,
            backgroundColor: props.highlight ? "#FF2C70": "#E4E8EB"
          }}>
        </div>
    )
}

export default BarElement;