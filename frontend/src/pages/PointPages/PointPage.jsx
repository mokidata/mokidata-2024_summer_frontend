// PointPage.js
import { useState, useEffect } from "react";
import PointCard from "../../component/point/PointCard";
import ReactModal from "react-modal";
import PointDetails from "./PointDetails";
import LoadingScreen from "../../component/common/LoadingScreen";
import { useParams } from "react-router-dom";
import InfiniteScrollWithObserver from "./InfiniteScroll";
import axios from "axios";
import { mokiApi } from "../../services/loginApi";

const PointPage = () => {
  const [data, setData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { store_id, phone_num } = useParams();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await mokiApi.get(
          `/api/point/user?store_id=${store_id}&phone_num=${phone_num}`
        );
        if (response.data) {
          setData(response.data);
        } else {
          console.log("No data found for:", store_id, phone_num);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [store_id, phone_num]);

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
      <h3
        className="point_title"
        style={{ fontSize: "5.5vw", fontWeight: "bold" }}
      >
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
