import React, { useEffect, useState ,useMemo} from "react";
import usePageInfo from "../../hooks/usePageInfo";
import { formatDate, formatMonth, formatWeek, formatYear } from "./DateConverter";

function Header(props){
    
    return (
        <div className="header-class">
            <button className="header-button" id="Navbar" onClick={props.leftSide}>
            </button>
            <div className="header-desc">
                {
                    props.page === 'daily' ? `${formatMonth(props.currentDate)} ${formatDate(props.currentDate)}`:
                    props.page === 'weekly'? `${formatMonth(props.currentDate)} ${formatWeek(props.currentDate)}`:
                    props.page === 'monthly'? `${formatYear(props.currentDate)} ${formatMonth(props.currentDate)} `:
                    ""
                }
            </div>
            <button className="header-button" id="Calendar">
            </button>
        </div>
    );
}

export default Header