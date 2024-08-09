function Alert(props){
    return(
        <div className="alert__div">
            <div className="alert">
                <div className="color-dot__div">
                    <div className="color-dot" style={{backgroundColor: props.color ==='red' ? "#ff2877" :"#32f75f"}} ></div>
                </div>
                <div className="alert-text">
                    {props.txt}
                </div>

            </div>

        </div>
        
    )
}

export default Alert