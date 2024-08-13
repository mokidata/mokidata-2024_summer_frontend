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
                    <div className="report-title__benefit" style={{flexDirection:"column"}}>

                        <div style={{display:"flex"}}>
                            {
                                props.page === 'daily' ? props.t(`todaySales.title.daily`) : 
                                props.page === 'weekly'? props.t('todaySales.title.weekly') :
                                props.page === 'monthly'? props.t('todaySales.title.monthly'):
                                ""
                            }
                           &nbsp;
                            <Price value={todayTotal} underline={true} unit={props.t('todaySales.unit')}> </Price>
                        </div>
                        <div>
                            {props.t("todaySales.recorded")} { todayTotal - yesterdayTotal >= 0 ? "🥳":"" }
                        </div>
                        
                    </div>
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
                    <div className="today-cmp__date" id="yesterday" style={{width:props.i18n.language =='en' ? '100px' : ""}}> 
                        {
                            props.page === 'daily' ? props.t('todaySales.yesterday') :
                            props.page === 'weekly' ? props.t('todaySales.lastWeek') :
                            props.page === 'monthly' ? props.t('todaySales.lastMonth') :
                            props.t('todaySales.yesterday') // 기본값
                        }
                    </div>
                    <div className="today-cmp__date" id="today" style={{width:props.i18n.language =='en' ? '100px' : ""}}>
                        {
                            props.page === 'daily' ? props.t('todaySales.today') :
                            props.page === 'weekly' ? props.t('todaySales.thisWeek') :
                            props.page === 'monthly' ? props.t('todaySales.thisMonth') :
                            props.t('todaySales.today') // 기본값
                        }
                    </div>
                </div>
                <div className="today-cmp__sales-div">
                    <div className="today-cmp__sales" id="yesterday">
                    
                        <div className="today-cmp__benefits" id="yesterday">
                            <Price value={yesterdayTotal} unit={props.t('todaySales.unit')}></Price>
                        </div>

                    </div>
                    <div className="today-cmp__arrow"> &gt; </div>
                    <div className="today-cmp__sales" id="today">
                    
                        <div className="today-cmp__benefits" id="today">
                            <Price value={todayTotal} unit={props.t('todaySales.unit')}></Price>
                        </div>
                    </div>
                </div>
                
                
                
            </div>
            <div className="today-diff">
                <Triangle diff={todayTotal - yesterdayTotal} unit={props.t('todaySales.unit')} ></Triangle>
            </div>
            
            
                
        </div>
    );
}

export default TodaySales
