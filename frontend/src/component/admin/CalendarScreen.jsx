import { useState } from "react";
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import "../../index.css"
import { formatDate } from "../../functions/DateConverter";
function CalendarScreen(props){
    const [dateValue,setDateValue] = useState(props.initDate)
    const getDate = (d) =>{
        const formatted = formatDate(d)
        props.setDate(formatted)
        props.close()
    }
    
  
    return (
      <div className="calendar__div">
          <Calendar 
          className="custom" 
          onChange={(date) => getDate(date)}
          formatDay={(locale,date) => date.getDate()}
          value={dateValue}

          ></Calendar>
      </div>
    );

}

  export default CalendarScreen;