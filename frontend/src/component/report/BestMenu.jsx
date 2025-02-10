import { useEffect, useState } from "react";
import Button from "../common/Button";
import Price from "../common/Price";
import { BASE_URL } from "../Url";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // i18n 추가

function BestMenu(props) {
  const rankDetail = [...props.rankDetailValue[props.page]];
  const [rankFirst, setRankFirst] = useState({});
  const [rankSecond, setRankSecond] = useState({});
  const [rankThird, setRankThird] = useState({});
  const [firstUrl, setFirstUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (props.rankDetailValue[props.page].length !== 0) {
      //여기 총액 으로 소팅하게 바꾸면 됨
      rankDetail.sort((a, b) => b.count - a.count);
      setRankFirst(rankDetail[0]);
      setRankSecond(rankDetail[1]);
      setRankThird(rankDetail[2]);
      console.log(rankDetail);
    }
  }, [props.rankDetailValue[props.page]]);

  useEffect(() => {
    if (rankFirst.name && Object.keys(props.menuObject).length !== 0) {
      setFirstUrl(props.menuObject[rankFirst.name]?.["img"]);
    }
  }, [rankFirst]);

  useEffect(() => {
    console.log(firstUrl);
  }, [firstUrl]);

  const navigateRankDetail = () => {
    navigate("/detail", {
      state: {
        pageType: "bestMenu",
        rankDetail: rankDetail,
        currentDate: props.currentDate,
        lastDetail: props.lastDetailValue,
        page: props.page,
      },
    });
  };

  return (
    <div className="report-component" id="best-menu">
      <div className="report-title">
        {props.page === "daily"
          ? props.t("bestMenu.today")
          : props.page === "weekly"
          ? props.t("bestMenu.thisWeek")
          : props.page === "monthly"
          ? props.t("bestMenu.thisMonth")
          : props.t("bestMenu.today")}{" "}
        {props.t("bestMenu.bestSellingMenu")}
      </div>
      <div className="best-menu" style={{ marginTop: "8vw" }}>
        <div className="best-menu__first">
          <div className="best-menu__title">{rankFirst.name}</div>
          <div className="best-menu__benefits" id="best">
            <Price value={rankFirst.price} unit="원"></Price>
          </div>
          <div className="best-menu__img-div">
            <div
              className="best-menu__img"
              style={{ backgroundImage: `url(${BASE_URL}${firstUrl})` }}
            ></div>
          </div>
        </div>
        <div className="best-menu__second">
          <div className="best-menu__other">
            <div className="best-menu__title">{rankSecond.name}</div>
            <div className="best-menu__benefits">
              <Price value={rankSecond.price} unit="원"></Price>
            </div>
          </div>
          <div className="best-menu__other">
            <div className="best-menu__title">{rankThird.name}</div>
            <div className="best-menu__benefits">
              <Price value={rankThird.price} unit="원"></Price>
            </div>
          </div>
        </div>
      </div>
      <div className="button-div" id="report" onClick={navigateRankDetail}>
        <Button txt={props.t("bestMenu.details")} color="transparent"></Button>
      </div>
    </div>
  );
}

export default BestMenu;
