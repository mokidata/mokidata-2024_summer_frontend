import { useEffect, useState } from "react";
import {
  enDaily,
  enMonthly,
  enWeekly,
  formatDate,
  formatDateNum,
  formatMonth,
  formatWeek,
  formatYear,
} from "../../functions/DateConverter";
import { useDispatch } from "react-redux";
import { totalThunks } from "../../store/salesApiSlice";
import { useNavigate } from "react-router-dom";

function CalendarContent(props) {
  let date = new Date(props.currentDate);
  let dateList = [];
  let monthList = [];
  let finalMap = {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMonthSelect, setIsMonthSelect] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("");
  const [enCurrentMonth, setEnCurrentMonth] = useState("");

  const HandleMonthSelect = (cur) => {
    setIsMonthSelect(!isMonthSelect);
    setCurrentMonth(cur);
  };

  const HandleDispatch = (date, page) => {
    if (!date) {
      console.error("HandleDispatch 호출 시 date 값이 없습니다.");
      return;
    }
    props.open();
    dispatch(totalThunks(date));

    if (props.detail) {
      navigate("/detail", {
        state: {
          currentDate: date,
          page: page || "default", // page가 없으면 기본값 설정
          pageType: props.detail,
        },
      });
    }
  };

  // `props.validDateList`가 undefined가 아닐 때만 실행
  if (Array.isArray(props.validDateList)) {
    for (let validDate of props.validDateList) {
      dateList.push(validDate);
      monthList.push(`${formatYear(validDate)} ${formatMonth(validDate)}`);
    }
  } else {
    console.warn("props.validDateList가 유효한 배열이 아닙니다.");
  }

  dateList.forEach((element, index) => {
    let list = [];
    const elemDate = new Date(element);
    const firstDayOfMonth = new Date(
      elemDate.getFullYear(),
      elemDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      elemDate.getFullYear(),
      elemDate.getMonth() + 1,
      0
    );
    const daysInMonth = lastDayOfMonth.getDate();
    const startOfWeek = new Date(firstDayOfMonth);
    startOfWeek.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());

    switch (props.page) {
      case "daily":
        for (let day = 1; day <= daysInMonth; day++) {
          const thisDate = new Date(
            elemDate.getFullYear(),
            elemDate.getMonth(),
            day
          );
          if (thisDate <= new Date()) {
            list.push(formatDate(thisDate));
          }
        }
        finalMap[monthList[index]] = list || []; // undefined 방지
        break;
      case "weekly":
        for (
          let thisDate = startOfWeek;
          thisDate <= lastDayOfMonth;
          thisDate.setDate(thisDate.getDate() + 1)
        ) {
          if (thisDate.getDay() === 6 || thisDate >= lastDayOfMonth) {
            list.push(formatDate(thisDate));
          }
        }
        finalMap[monthList[index]] = list || []; // undefined 방지
        break;
    }
  });

  useEffect(() => {
    setIsMonthSelect(false);
  }, []);

  return (
    <div className="side-nav">
      <div className="side-nav__top">
        <div className="side-nav__title">{props.t("calendar.selectMonth")}</div>
        <div className="side-nav__close" onClick={() => props.open()}>
          X
        </div>
      </div>
      <div className="side-nav__list">
        {isMonthSelect ? (
          <div className="side-nav__list">
            <div
              className="side-nav__content side-pick"
              id="calendar"
              onClick={() => setIsMonthSelect(false)}
            >
              {props.i18n.language === "ko" ? currentMonth : enCurrentMonth}
            </div>
            {finalMap[currentMonth]?.map(
              (
                date,
                index // undefined 체크 추가
              ) => (
                <div
                  key={index} // key 추가
                  className="side-nav__content side_detail-date"
                  id="calendar"
                  onClick={() => {
                    props.open();
                    HandleDispatch(date, props.page);
                  }}
                >
                  {props.page === "daily" && props.i18n.language === "ko"
                    ? formatDateNum(date)
                    : props.page === "weekly" && props.i18n.language === "ko"
                    ? formatWeek(date)
                    : props.page === "daily" && props.i18n.language === "en"
                    ? enDaily(date)
                    : props.page === "weekly" && props.i18n.language === "en"
                    ? enWeekly(date)
                    : ""}
                </div>
              )
            )}
          </div>
        ) : (
          dateList.map((date, index) => (
            <div key={index}>
              <div
                className="side-nav__content"
                id="calendar"
                onClick={() => {
                  props.page === "monthly"
                    ? HandleDispatch(date, props.page)
                    : HandleMonthSelect(
                        `${formatYear(date)} ${formatMonth(date)}`
                      );
                  setEnCurrentMonth(`${enMonthly(date)}`);
                }}
              >
                {props.i18n.language === "ko"
                  ? `${formatYear(date)} ${formatMonth(date)}`
                  : `${enMonthly(date)}`}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CalendarContent;
