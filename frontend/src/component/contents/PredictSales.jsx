import { useEffect, useState } from "react";
import Chart from "../common/Chart";
import GetInteger from "../common/GetInteger";
import DateConVerter from "../common/DateConverter";

function PredictSales (props){
    console.log(props.value)
    console.log(props.menuObject)
    const predictValue = props.value[props.page]['predicts']
    const compareValue = props.rankCompareValue[props.page]
    const menuObject = props.menuObject
    let data= []
    var profit = 0
    for (const dates of Object.keys(compareValue).reverse()){
      profit = 0
      compareValue[ dates].saleGetResList.forEach(element => {
        profit += element.count * element.price
      });
      const obj = {column:DateConVerter(dates) ,value:GetInteger(profit / 10000),highlight:false}
      data.push(obj)
    }
    profit = 0
    console.log(predictValue)
    predictValue.forEach(element=>{
      
      for (const dates of Object.keys(element.predictData)){
        
        profit += element.predictData[dates] * menuObject[element.name]['price']
      }
    })
    const obj = {column : "예측값", value : GetInteger(profit/ 10000 ) , highlight: true }
    data.push(obj)
    console.log(data)

   
    // const data = [
    //     {
    //       column: "3월",
    //       value: 345,
    //       highlight: false,
    //     },
    //     {
    //       column: "4월",
    //       value: 456,
    //       highlight: false,
    //     },
    //     {
    //       column: "5월",
    //       value: 567,
    //       highlight: false,
    //     },
    //     {
    //       column: "6월",
    //       value: 678,
    //       highlight: false,
    //     },
    //     {
    //       column: "7월",
    //       value: 789,
    //       highlight: false,
    //     },
    //     {
    //       column: "8월",
    //       value: 890,
    //       highlight: true,
    //     },
    //   ];

    return (
        <div className="report-component">
            <div className="report-title">
                다음주 매출 예상
            </div>
            <div className="predict__detail">
                평균 매출은 한달에 270 만원 정도에요.
            </div>
            <Chart data={data} type="bar" ></Chart>
            <div className="notice">
            ❕계절과 휴일에 따른 매출 데이터 변화를 종합한 결과에요.
            </div>
        </div>

    );

}

export default PredictSales

