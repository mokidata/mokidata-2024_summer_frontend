import { useEffect, useState } from "react";
import Chart from "../common/Chart";
import GetInteger from "../../functions/GetInteger"
import DateConverter, { formatDateNum, formatMonth, formatWeek } from "../../functions/DateConverter";
import Price from "../common/Price";

function PredictSales(props) {
    
    const todayValue = props.value[props.page]['predicts'];
    const nextValue = props.predictNextValue[props.page]['predicts'];
    const compareValue = props.rankCompareValue[props.page];
    const nextDate = props.predictNextValue[props.page]['date'];
    const menuObject = props.menuObject;
    let data = [];
    let profit = 0;

    const getAverage = () => {
        if (data.length === 0) return 0;
        let sum = 0;
        for (let salesData of data) {
            sum += salesData.value;
        }
        return GetInteger(sum / data.length);
    };

    for (const dates of Object.keys(compareValue).reverse()) {
        if (compareValue[dates].length !== 0) {
            profit = 0;
            compareValue[dates].forEach(element => {
                profit += element.count * element.price;
            });
            const obj = {
                column:
                    props.page === 'daily' ? `${formatDateNum(dates)} ` :
                    props.page === 'weekly' ? `${formatWeek(dates)} ` :
                    props.page === 'monthly' ? `${formatMonth(dates)} ` : "",
                value: GetInteger(profit / 10000),
                highlight: false,
                valueHighlight: false
            };
            data.push(obj);
        }
    }

    profit = 0;
    todayValue.forEach(element => {
        for (const dates of Object.keys(element.predictData)) {
            profit += element.predictData[dates] * menuObject[element.name]['price'];
        }
    });

    let obj = {
        column:
            props.page === 'daily' ? `${formatDateNum(props.currentDate)} ` :
            props.page === 'weekly' ? `${formatWeek(props.currentDate)} ` :
            props.page === 'monthly' ? `${formatMonth(props.currentDate)} ` : "",
        value: GetInteger(profit / 10000),
        highlight: false,
        valueHighlight: false
    };
    data.push(obj);

    profit = 0;
    nextValue.forEach(element => {
        for (const dates of Object.keys(element.predictData)) {
            profit += element.predictData[dates] * menuObject[element.name]['price'];
        }
    });

    obj = {
        column:
            props.page === 'daily' ? `${formatDateNum(nextDate)} ` :
            props.page === 'weekly' ? `${formatWeek(nextDate)} ` :
            props.page === 'monthly' ? `${formatMonth(nextDate)} ` : "",
        value: GetInteger(profit / 10000),
        highlight: true,
        valueHighlight: false
    };
    data.push(obj);

    let avg = getAverage();

    return (
        <div className="report-component">
            <div className="report-title">
                {
                    props.page === 'daily' ? props.t('predictSales.title.daily') :
                    props.page === 'weekly' ? props.t('predictSales.title.weekly') :
                    props.page === 'monthly' ? props.t('predictSales.title.monthly') :
                    props.t('predictSales.title.daily')
                }
            </div>
          
            <div className="predict__detail">
                {
                    props.page === 'daily' ? 
                    `${props.t('predictSales.average.daily.first')} ${avg}${props.t('predictSales.average.daily.second')}` 
                    : 
                    props.page === 'weekly' ? 
                    `${props.t('predictSales.average.weekly.first')} ${avg}${props.t('predictSales.average.weekly.second')}` 
                    : 
                    props.page === 'monthly' ? 
                    `${props.t('predictSales.average.monthly.first')} ${avg}${props.t('predictSales.average.monthly.second')}` 
                    : 
                    ""
                }
            </div>
            <Chart isVisible={props.isVisible} data={data} type="bar"></Chart>
            <div className="notice">
                ❕{props.t('predictSales.notice')}
            </div>
        </div>
    );
}

export default PredictSales;
