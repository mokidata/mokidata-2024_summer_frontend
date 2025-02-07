// PointPage.js
import { useState, useEffect } from "react";
import PointCard from "../../component/point/PointCard";
import ReactModal from "react-modal";
import PointDetails from "./PointDetails";
import LoadingScreen from "../../component/common/LoadingScreen";
import { useParams } from "react-router-dom";
import InfiniteScrollWithObserver from "./InfiniteScroll";

const PointPage = () => {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { store_id, user_id } = useParams();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        user_id: 4380,
        user_name: "5678",
        store_id: "2504001328",
        store_name: "해머스미스 송파푸르지오시티점",
        total_point: 133780,
        total_count: 137,
        is_expired: "Y",
        expired_date: "2025-03-11",
        recent_visit: "2025-01-08",
      });
    }, 1000);
  }, []);

  if (!data) {
    return (
      <LoadingScreen
        txt={
          <span style={{ fontSize: "3.5vw" }}>
            포인트를 <br /> 조회하고 있어요!
          </span>
        }
      />
    );
  }

  return (
    <div className="point_page">
      <h3 className="point_title" style={{ fontSize: "5vw" }}>
        {data.store_name}
      </h3>
      <p style={{ fontSize: "9vw", fontWeight: "bold" }}>{data.user_name}님</p>
      <p style={{ fontSize: "7vw", fontWeight: "bold" }}>
        환영합니다.{String.fromCodePoint(0x1f606)}
      </p>
      <PointCard
        number={data.total_point}
        expired_date={data.expired_date}
        is_expired={data.is_expired}
      />
      <div className="split">
        <div className="recent_visit">
          <p style={{ fontSize: "3.5vw", color: "grey", margin: "5px" }}>
            최근 방문일
          </p>
          <p style={{ fontSize: "6vw", fontWeight: "bold" }}>
            {data.recent_visit}
          </p>
        </div>
        <div className="cnt">
          <p style={{ fontSize: "3.5vw", color: "grey", margin: "5px" }}>
            적립 / 사용 횟수
          </p>
          <p style={{ fontSize: "6vw", fontWeight: "bold" }}>
            {data.total_count}회
          </p>
        </div>
      </div>
      <button
        className="detail_button"
        onClick={openModal}
        style={{ fontSize: "4vw" }}
      >
        포인트 이용내역 조회하기
      </button>
      <ReactModal
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "75vw",
            height: "75vh",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <div className="modal_content">
          <PointDetails />
          <div className="modal_footer">
            <button onClick={closeModal} style={{ fontSize: "4vw" }}>
              닫기
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default PointPage;
