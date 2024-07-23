import React from "react";
import Triangle from "../common/Triangle";
import Price from "../common/Price";

function TodaySales (props){
    return(
        <div className="report-component">
            <div>
                  {props.page}
            </div>
            <span className="report-title">   
                
               
                <div className="report-title__benefit">
                    <div> 오늘 매출  &nbsp;</div>
                    <Price value={123456789} underline={true} unit="원"> </Price>
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
                        <Price value={123456} unit="원"></Price>
                    </div>

                </span>
                <span className="today-cmp__arrow"> &gt; </span>
                <span className="today-cmp__sales" id="today">
                    <div className="today-cmp__date" id="today">
                        이번달
                    </div>
                    <div className="today-cmp__benefits" id="today">
                        <Price value={567890} unit="원"></Price>
                    </div>
                </span>
            </div>
            <Triangle diff={1000000} unit="원" ></Triangle>
                
        </div>
    );
}

export default TodaySales