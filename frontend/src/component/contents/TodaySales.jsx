import React, { useEffect, useState } from "react";
import Triangle from "../common/Triangle";
import Price from "../common/Price";

function TodaySales (props){

    const [todayTotal, setTodayTotal] = useState(0);
    const [yesterdayTotal , setYesterdayTotal] = useState(0); 
    useEffect(()=>{
        console.log(props)
        try {
            console.log(props.value)
            setTodayTotal(props.value[props.page]['today']);
            setYesterdayTotal(props.value[props.page]['yesterday']);   
        } catch (error) {
            console.log(error)
        }

    },[props.value])
    return(
        <div className="report-component">
            <div>
                  {todayTotal}
            </div>
            <span className="report-title">   
                
               
                <div className="report-title__benefit">
                    <div> 오늘 매출  &nbsp;</div>
                    <Price value={todayTotal} underline={true} unit="원"> </Price>
                </div>
                기록했어요 🥳
                
            </span>
            <span className="today-desc__day">
                월요일
            </span>
            
            <div className="today-img">
                <div className="today-img__img"></div>
            </div>
            <div className="today-cmp">
                <span className="today-cmp__sales" id="yesterday">
                    <div className="today-cmp__date" id="yesterday">
                        지난달
                    </div>
                    <div className="today-cmp__benefits" id="yesterday">
                        <Price value={yesterdayTotal} unit="원"></Price>
                    </div>

                </span>
                <span className="today-cmp__arrow"> &gt; </span>
                <span className="today-cmp__sales" id="today">
                    <div className="today-cmp__date" id="today">
                        이번달
                    </div>
                    <div className="today-cmp__benefits" id="today">
                        <Price value={todayTotal} unit="원"></Price>
                    </div>
                </span>
            </div>
            <Triangle diff={todayTotal - yesterdayTotal} unit="원" ></Triangle>
                
        </div>
    );
}

export default TodaySales