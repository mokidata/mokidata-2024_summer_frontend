import React, { useEffect, useState ,useMemo} from "react";
import usePageInfo from "../../hooks/usePageInfo";
import { formatDate, formatDateNum, formatMonth, formatWeek, formatYear } from "./DateConverter";

function Header(props){
    
    return (
        <div className="header-class">
            <button className="header-button" id="Navbar" onClick={props.leftSide}>
            </button>
            <div className="header-desc">
                {
                    props.page === 'daily' ? `${formatYear(props.currentDate)} ${formatMonth(props.currentDate)} ${formatDateNum(props.currentDate)}`:
                    props.page === 'weekly'? `${formatYear(props.currentDate)} ${formatMonth(props.currentDate)} ${formatWeek(props.currentDate)}`:
                    props.page === 'monthly'? `${formatYear(props.currentDate)} ${formatMonth(props.currentDate)} `:
                    ""
                }
            </div>
            <button className="header-button" id="Calendar" onClick={props.rightSide}>
            </button>
        </div>
    );
}

export default Header