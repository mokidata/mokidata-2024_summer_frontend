import React, { useEffect, useState } from "react";
import Triangle from "../common/Triangle";
import Price from "../common/Price";
import { formatDate, formatDay } from "../common/DateConverter";


function TodaySales (props){

    const [todayTotal, setTodayTotal] = useState(0);
    const [yesterdayTotal , setYesterdayTotal] = useState(0); 
    useEffect(()=>{
        try {
            console.log(props.value)
            setTodayTotal(props.value[props.page]['today']);
            setYesterdayTotal(props.value[props.page]['yesterday']);   
        } catch (error) {
            console.log(error)
        }

    },[props.page])
    return(
        <div className="report-component">
            <div className="report-title__div">
                <div className="report-title" id="todaysales"> 
                    <div className="report-title__benefit">
                        <div> {
                            props.page === 'daily' ? '오늘 ':
                            props.page === 'weekly' ? '이번 주 ':
                            props.page === 'monthly' ? '이번 달 ':
                            '오늘'
                            } 매출  &nbsp;</div>
                        <Price value={todayTotal} underline={true} unit="원"> </Price>
                    </div>
                    기록했어요 {todayTotal - yesterdayTotal >= 0 ? "🥳":""}
                </div>
                {
                    props.page === 'daily' ? 
                    <div className="today-desc__day">
                        {
                            formatDay(formatDate(new Date()))
                        }
                    </div>
                    :""
                }
                
            </div>
            
            
            
            <div className="today-img">
                <div className="today-img__img" id={todayTotal-yesterdayTotal >= 0 ? "clapping" : "cheer-up"}></div>
            </div>
            <div className="today-cmp">
                <div className="today-cmp__date-div"> 
                    <div className="today-cmp__date" id="yesterday">
                        {
                            props.page === 'daily' ? '어제':
                            props.page === 'weekly' ? '지난주':
                            props.page === 'monthly' ? '지난달':
                            '어제'
                        }
                        
                    </div>
                    <div className="today-cmp__date" id="today">
                        {
                            props.page === 'daily' ? '오늘':
                            props.page === 'weekly' ? '이번주':
                            props.page === 'monthly' ? '이번달':
                            '오늘'
                        }
                    </div>
                </div>
                <div className="today-cmp__sales-div">
                    <div className="today-cmp__sales" id="yesterday">
                    
                        <div className="today-cmp__benefits" id="yesterday">
                            <Price value={yesterdayTotal} unit="원"></Price>
                        </div>

                    </div>
                    <div className="today-cmp__arrow"> &gt; </div>
                    <div className="today-cmp__sales" id="today">
                    
                        <div className="today-cmp__benefits" id="today">
                            <Price value={todayTotal} unit="원"></Price>
                        </div>
                    </div>
                </div>
                
                
                
            </div>
            <Triangle diff={todayTotal - yesterdayTotal} unit="원" ></Triangle>
            
                
        </div>
    );
}

export default TodaySales