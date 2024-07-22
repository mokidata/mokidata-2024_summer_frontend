import React, { useEffect, useState ,useMemo} from "react";
import usePageInfo from "../../hooks/usePageInfo";

function Header(props){
    console.log("header");
    const pageinfo = usePageInfo(props.page);
    
    return (
        <div className="header-class">
            <button className="header-button" id="Navbar">
            </button>
            <div className="header-desc">{pageinfo}</div>
            <button className="header-button" id="Calendar">
            </button>
        </div>
    );
}

export default Header