import React, { useEffect, useState ,useMemo} from "react";
import usePageInfo from "../../hooks/usePageInfo";
import { formatDate, formatDateNum, formatMonth, formatWeek, formatYear } from "./DateConverter";
import { getWeekOfMonth } from "./DateConverter";

function Header(props){

    function getEnWeek (date){
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        const weekNumber = getWeekOfMonth(date);
        if (weekNumber === 1){

            return `${month} ${weekNumber}st week, ${year}`;
        }
        else if (weekNumber === 2){
            return `${month} ${weekNumber}nd week, ${year}`;

        }
        else if (weekNumber === 3){
            return `${month} ${weekNumber}rd week, ${year}`;
        }
        return `${month} ${weekNumber}th week, ${year}`;
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(props.currentDate)
    const enMonthly = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long'})
    const enWeekly = getEnWeek(date)
    const enDaily = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    console.log(enMonthly)
    console.log(enWeekly)
    console.log(enDaily)
    
    return (
        <div className="header-class">
            <button className="header-button" id="Navbar" onClick={props.leftSide}>
            </button>
            <div className="header-desc">
                {
                    
                    props.i18n.language === 'ko'?
                    (    
                        props.page === 'daily' ? `${formatYear(props.currentDate)} ${formatMonth(props.currentDate)} ${formatDateNum(props.currentDate)}`:
                        props.page === 'weekly'? `${formatYear(props.currentDate)} ${formatMonth(props.currentDate)} ${formatWeek(props.currentDate)}`:
                        props.page === 'monthly'? `${formatYear(props.currentDate)} ${formatMonth(props.currentDate)} `:
                        ""
                    )
                    :
                    (
                        
                        props.page === 'daily' ? enDaily:
                        props.page === 'weekly'? enWeekly:
                        props.page === 'monthly'? enMonthly:
                        ""
                    )


                }
            </div>
            <button className="header-button" id="Calendar" onClick={props.rightSide}>
            </button>
        </div>
    );
}

export default Header