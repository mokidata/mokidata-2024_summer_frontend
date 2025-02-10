import Price from "../../component/common/Price";
import Triangle from "../../component/common/Triangle";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function BestMenuDetail(props) {
  console.log(props);
  const [rankArray, setRankArray] = useState([
    { name: "", count: 0, price: 0 },
  ]);
  const [lastRank, setLastRank] = useState({});

  useEffect(() => {
    if (props.rankDetailValue !== null) {
      console.log(props.rankDetailValue[props.page]);
      const copy = [...props.rankDetailValue[props.page]];
      copy.sort((a, b) => b.count - a.count);
      setRankArray(copy);
    }
  }, [props.rankDetailValue, props.page]);

  useEffect(() => {
    if (props.lastDetailValue !== null) {
      const obj = {};
      props.lastDetailValue[props.page].forEach((element, index) => {
        obj[element.name] = { rank: index + 1, count: element.count };
      });
      setLastRank(obj);
    }
  }, [props.lastDetailValue, props.page]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="report-component"
      id="best-rank"
    >
      <div className="best-rank__goback" onClick={props.goBack}>
        &lt; {props.t(`bestMenuDetail.${props.page}`)}{" "}
        {props.t("bestMenuDetail.back")}
      </div>
      <div className="best-rank__table">
        <div className="best-rank__column-info">
          <div className="best-rank__column" id="rank__rank">
            {props.t("bestMenuDetail.rank")}
          </div>
          <div className="best-rank__column" id="rank__diff">
            {props.t("bestMenuDetail.diff")}
          </div>
          <div
            className="best-rank__column"
            id="rank__menu-info"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div>{props.t("bestMenuDetail.menuName")}</div>
            <div>{props.t("bestMenuDetail.menuQuantity")}</div>
          </div>
          <div className="best-rank__column" id="rank__profit">
            {props.t("bestMenuDetail.profit")}
          </div>
        </div>
        {rankArray
          .filter((element) => element.count !== 0)
          .map((element, index) => (
            <div
              className="best-rank__each"
              key={index}
              id={(index + 1) % 2 === 0 ? "even" : "odd"}
            >
              <div
                className="best-rank__row"
                id="rank__rank"
                style={{ fontSize: "4.5vw" }}
              >
                {index + 1}
              </div>
              {lastRank[element.name]?.count === 0 ? (
                <div
                  className="best-rank__row"
                  id="rank__diff"
                  style={{
                    fontSize: "3.5vw",
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  <p>NEW</p>
                </div>
              ) : (
                <div
                  className="best-rank__row"
                  id="rank__diff"
                  style={{ fontSize: "4.5vw" }}
                >
                  <Triangle
                    diff={lastRank[element.name]?.rank - (index + 1)}
                    unit=""
                  />
                </div>
              )}
              <div className="best-rank__row" id="rank__menu-info">
                <div
                  className="best-rank__row__menu"
                  style={{ fontSize: "3.5vw" }}
                >
                  {element.name}
                </div>
                <div
                  className="best-rank__row__sales"
                  style={{ fontSize: "4vw" }}
                >
                  {element.count}
                </div>
              </div>
              <div
                className="best-rank__row"
                id="rank__profit"
                style={{ fontSize: "4vw" }}
              >
                <Price value={element.price} unit="원" />
              </div>
            </div>
          ))}
      </div>
    </motion.div>
  );
}

export default BestMenuDetail;
