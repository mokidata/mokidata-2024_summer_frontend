import React, { useEffect, useState } from "react";
import Triangle from "../common/Triangle";
import Price from "../common/Price";
import { formatDate, formatDay } from "../../functions/DateConverter";
import { wrap } from "framer-motion";

function TodaySales(props) {
  const [todayTotal, setTodayTotal] = useState(0);
  const [yesterdayTotal, setYesterdayTotal] = useState(0);
  useEffect(() => {
    try {
      console.log(props.value);
      setTodayTotal(props.value[props.page]["today"]);
      setYesterdayTotal(props.value[props.page]["yesterday"]);
    } catch (error) {
      console.log(error);
    }
  }, [props.page]);
  return (
    <div className="report-component">
      <div className="report-title__div">
        <div className="report-title" id="todaysales">
          <div
            className="report-title__benefit"
            style={{ flexDirection: "column" }}
          >
            <p
              id="store-name"
              style={{
                fontSize: "32px",
                margin: "none",
                fontWeight: "bold",
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                maxWidth: "90vw",
                marginBottom: "10px",
              }}
            >
              {" "}
              {sessionStorage.getItem("name")}{" "}
            </p>
            <div style={{ display: "flex" }}>
              {props.page === "daily"
                ? props.t(`todaySales.title.daily`)
                : props.page === "weekly"
                ? props.t("todaySales.title.weekly")
                : props.page === "monthly"
                ? props.t("todaySales.title.monthly")
                : ""}
              &nbsp;
              <Price
                value={todayTotal}
                underline={true}
                unit={props.t("todaySales.unit")}
              >
                {" "}
              </Price>
            </div>
            <div>
              {props.t("todaySales.recorded")}{" "}
              {todayTotal - yesterdayTotal >= 0 ? "🥳" : ""}
            </div>
          </div>
        </div>
        {/*
                    props.page === 'daily' ? 
                    <div className="today-desc__day">
                        {
                            formatDay(formatDate(new Date()))
                        }
                    </div>
                    :""
                */}
      </div>

      <div className="today-img">
        <div
          className="today-img__img"
          id={todayTotal - yesterdayTotal >= 0 ? "clapping" : "cheer-up"}
        ></div>
      </div>
      <div className="today-cmp">
        <div className="today-cmp__date-div">
          <div
            className="today-cmp__date"
            id="yesterday"
            style={{
              width: props.i18n.language == "en" ? "100px" : "",
              backgroundColor: "#92A7DC",
              color: "white",
            }}
          >
            {
              props.page === "daily"
                ? props.t("todaySales.yesterday")
                : props.page === "weekly"
                ? props.t("todaySales.lastWeek")
                : props.page === "monthly"
                ? props.t("todaySales.lastMonth")
                : props.t("todaySales.yesterday") // 기본값
            }
          </div>
          <div
            className="today-cmp__date"
            id="today"
            style={{
              width: props.i18n.language == "en" ? "100px" : "",
              backgroundColor: "#2476D6",
              color: "white",
            }}
          >
            {
              props.page === "daily"
                ? props.t("todaySales.today")
                : props.page === "weekly"
                ? props.t("todaySales.thisWeek")
                : props.page === "monthly"
                ? props.t("todaySales.thisMonth")
                : props.t("todaySales.today") // 기본값
            }
          </div>
        </div>
        <div className="today-cmp__sales-div">
          <div className="today-cmp__sales" id="yesterday">
            <div className="today-cmp__benefits" id="yesterday">
              <Price
                value={yesterdayTotal}
                unit={props.t("todaySales.unit")}
              ></Price>
            </div>
          </div>
          <div className="today-cmp__arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
            </svg>
          </div>
          <div className="today-cmp__sales" id="today">
            <div
              className="today-cmp__benefits"
              id="today"
              style={{
                color:
                  todayTotal > yesterdayTotal
                    ? "red"
                    : todayTotal === yesterdayTotal
                    ? "black"
                    : "blue",
              }}
            >
              <Price
                value={todayTotal}
                unit={props.t("todaySales.unit")}
              ></Price>
            </div>
          </div>
        </div>
      </div>
      <div className="today-diff">
        <Triangle
          diff={todayTotal - yesterdayTotal}
          unit={props.t("todaySales.unit")}
        ></Triangle>
      </div>
    </div>
  );
}

export default TodaySales;
