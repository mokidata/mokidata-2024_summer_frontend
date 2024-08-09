import { useEffect, useState } from "react";
import Chart from "../common/Chart";
import GetInteger from "../common/GetInteger";
import DateConVerter, { formatDateNum, formatMonth, formatWeek } from "../common/DateConverter";

function PredictSales (props){
    console.log(props)
    const predictValue = props.value[props.page]['predicts']
    const compareValue = props.rankCompareValue[props.page]
    const menuObject = props.menuObject
    let data= []
    var profit = 0
    const getAverage = () => {
      if (data.length === 0) return 0;
      let sum = 0
      for(let salesData of data){
        sum += salesData.value
      }
      return GetInteger(sum/data.length) ;
    }
    for (const dates of Object.keys(compareValue).reverse()){
      if (compareValue[dates].length !== 0){
        profit = 0
        compareValue[dates].forEach(element => {
          profit += element.count * element.price
        });
        const obj = {
          
          column:  
          props.page === 'daily' ? `${formatDateNum(dates)} ` :
          props.page === 'weekly' ? `${formatWeek(dates)} `:
          props.page === 'monthly' ? `${formatMonth(dates)} `: ""
        ,value:GetInteger(profit / 10000)
        ,highlight:false
        , valueHighlight: false
        }
        data.push(obj)
      }
      
    }
    profit = 0
    predictValue.forEach(element=>{
      
      for (const dates of Object.keys(element.predictData)){
        
        profit += element.predictData[dates] * menuObject[element.name]['price']
      }
    })
    const obj = {column :
      props.page === 'daily' ? `${formatDateNum(props.currentDate)} ` :
        props.page === 'weekly' ? `${formatWeek(props.currentDate)} `:
        props.page === 'monthly' ? `${formatMonth(props.currentDate)} `: ""
      , value : GetInteger(profit/ 10000 ) , highlight: true , valueHighlight: false}
    data.push(obj)
    let avg = getAverage()
    

   
    // const data = [
    //     {
    //       column: "3월",
    //       value: 345,
    //       highlight: false,
    //       valueHighlight: false
    //     },
    //     {
    //       column: "4월",
    //       value: 456,
    //       highlight: false,
    //       valueHighlight: false
    //     }
    //   ];

    return (
        <div className="report-component">
            <div className="report-title">
              {
                props.page === 'daily'? '내일':
                props.page === 'weekly'? '다음 주':
                props.page === 'monthly' ? '다음 달':
                '내일'
              } 매출 예상
            </div>
            <div className="predict__detail">
                평균 매출은 
                {
                  props.page === 'daily'? ' 하루에' :
                  props.page === 'weekly' ? ' 일주일에':
                  props.page === 'monthly' ? ' 한달에' : ""
                } {avg} 만원 정도에요.
            </div>
            <Chart isVisible={props.isVisible} data={data} type="bar" ></Chart>
            <div className="notice">
            ❕계절과 휴일에 따른 매출 데이터 변화를 종합한 결과에요.
            </div>
        </div>

    );

}

export default PredictSales

