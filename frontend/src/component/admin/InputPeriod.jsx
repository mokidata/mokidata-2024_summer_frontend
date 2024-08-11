import Button from "../common/Button"
import CalendarScreen from "../contents/CalendarScreen"
import { useState } from "react"
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
                    <button className="period_btn" onClick={props.openLeftCalendar}>
                        {props.startDate}
                    </button>

                </div>
                <div className="input-period__period-grid">
                    <div className="input-period__type">
                        종료일
                    </div>
                    <button className="period_btn" onClick={props.openRightCalendar}>
                        {props.endDate}
                    </button>


                </div>
            </div>
            {props.leftCalendar && <CalendarScreen setDate={props.setStartDate} initDate={props.startDate} close={props.openLeftCalendar}></CalendarScreen>}
            {props.rightCalendar && <CalendarScreen setDate={props.setEndDate} initDate={props.endDate} close={props.openRightCalendar}></CalendarScreen>}

        </div>
    )

}

export default InputPeriod