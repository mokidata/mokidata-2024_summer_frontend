import Button from "../common/Button"

function InputPeriod (props){
    

    return(
        <div className="input-period">
            <div className="input-period__desc">
                날짜 입력(최대 2개월)
            </div>
            <div className="input-period__period">
                <div className="input-period__period-grid">
                    <div className="input-period__type">
                        시작일
                    </div>
                    <button className="period_btn">
                        {props.startDate}
                    </button>

                </div>
                <div className="input-period__period-grid">
                    <div className="input-period__type">
                        종료일
                    </div>
                    <button className="period_btn">
                        {props.startDate}
                    </button>


                </div>
                
                
            </div>

        </div>
    )

}

export default InputPeriod