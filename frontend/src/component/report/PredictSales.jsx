import { useEffect, useState } from "react";
import Chart from "../common/Chart";
import GetInteger from "../../functions/GetInteger";
import DateConverter, {
  formatDateNum,
  formatMonth,
  formatWeek,
} from "../../functions/DateConverter";
import Price from "../common/Price";

function PredictSales(props) {
  if (!props.value || !props.rankCompareValue || !props.page) {
    return <div className="error">데이터를 불러올 수 없습니다.</div>;
  }

  // const todayValue = props.value[props.page]['predicts'];
  // const nextValue = props.predictNextValue[props.page]['predicts'];
  const todayValue = props.value[props.page]["today"] ?? 0;
  const nextValue = props.value[props.page]["tomorrow"] ?? 0;
  const compareValue = props.rankCompareValue[props.page] ?? {};
  //   const nextDate = props.predictNextValue[props.page]["date"];
  const menuObject = props.menuObject;
  let data = [];
  let profit = 0;

  const getNextDate = (currentDate) => {
    let date = new Date(currentDate); // 현재 날짜를 Date 객체로 변환
    date.setDate(date.getDate() + 1); // 하루 추가
    return date.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 변환
  };

  const getNextWeek = (currentDate) => {
    let date = new Date(currentDate); // 현재 날짜를 Date 객체로 변환
    date.setDate(date.getDate() + 7); // 하루 추가
    return date.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 변환
  };

  const getNextMonth = (currentDate) => {
    let date = new Date(currentDate);
    date.setDate(date.getDate() + 30); // 추후 변경 필요
    return date.toISOString().split("T")[0];
  };

  const getAverage = () => {
    if (data.length === 0) return 0;
    let sum = 0;
    for (let salesData of data) {
      sum += salesData.value;
    }
    return GetInteger(sum / data.length);
  };

  for (const dates of Object.keys(compareValue).reverse().slice(-4)) {
    if (compareValue[dates].length !== 0) {
      profit = compareValue[dates];
      // compareValue[dates].forEach((element) => {
      //   profit += element.price;
      // });
      const obj = {
        column:
          props.page === "daily"
            ? `${formatDateNum(dates)} `
            : props.page === "weekly"
            ? `${formatWeek(dates)} `
            : props.page === "monthly"
            ? `${formatMonth(dates)} `
            : "",
        value: GetInteger(profit / 10000),
        highlight: false,
        valueHighlight: false,
      };
      data.push(obj);
    }
  }

  profit = todayValue;
  //   todayValue.forEach((element) => {
  //     for (const dates of Object.keys(element.predictData)) {
  //       profit += element.predictData[dates] * menuObject[element.name]["price"];
  //     }
  //   });

  let obj = {
    column:
      props.page === "daily"
        ? `${formatDateNum(props.currentDate)} `
        : props.page === "weekly"
        ? `${formatWeek(props.currentDate)} `
        : props.page === "monthly"
        ? `${formatMonth(props.currentDate)} `
        : "",
    value: GetInteger(profit / 10000),
    highlight: false,
    valueHighlight: false,
  };
  data.push(obj);

  profit = nextValue;
  // nextValue.forEach(element => {
  //     for (const dates of Object.keys(element.predictData)) {
  //         profit += element.predictData[dates] * menuObject[element.name]['price'];
  //     }
  // });

  obj = {
    column:
      props.page === "daily"
        ? `${formatDateNum(getNextDate(props.currentDate))} `
        : props.page === "weekly"
        ? `${formatWeek(getNextWeek(props.currentDate))} `
        : props.page === "monthly"
        ? `${formatMonth(getNextMonth(props.currentDate))} `
        : "",
    value: GetInteger(profit / 10000),
    highlight: true,
    valueHighlight: false,
  };
  data.push(obj);

  let avg = getAverage();

  return (
    <div className="report-component">
      <div className="report-title">
        {props.page === "daily"
          ? props.t("predictSales.title.daily")
          : props.page === "weekly"
          ? props.t("predictSales.title.weekly")
          : props.page === "monthly"
          ? props.t("predictSales.title.monthly")
          : props.t("predictSales.title.daily")}
      </div>

      <div className="predict__detail">
        {props.page === "daily"
          ? `${props.t("predictSales.average.daily.first")} ${avg}${props.t(
              "predictSales.average.daily.second"
            )}`
          : props.page === "weekly"
          ? `${props.t("predictSales.average.weekly.first")} ${avg}${props.t(
              "predictSales.average.weekly.second"
            )}`
          : props.page === "monthly"
          ? `${props.t("predictSales.average.monthly.first")} ${avg}${props.t(
              "predictSales.average.monthly.second"
            )}`
          : ""}
      </div>
      <Chart isVisible={props.isVisible} data={data} type="bar"></Chart>
      <div className="notice">❕{props.t("predictSales.notice")}</div>
    </div>
  );
}

export default PredictSales;
