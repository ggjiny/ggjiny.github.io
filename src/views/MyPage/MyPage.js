import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Header from "../Header/Header";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import "./MyPage.css";
import MyReview from "../ReviewPage/MyReview";
import MyPartsList from "../PartsPage/MyPartsList";
const acToken = sessionStorage.getItem("accesstoken");

function MyPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [select, setSelect] = useState("Calendar");

  const [modalOpen2, setModalOpen2] = useState(false);

  const handleModal2 = () => {
    setModalOpen2(!modalOpen2);
  };

  const baseUrl = "/api/v1/member";

  async function getInfo() {
    //사용자 정보 받아오기
    await axios
      .get(baseUrl, {
        headers: {
          Authorization: `Bearer ${acToken}`,
        },
      })
      .then((response) => {
        if (
          response.data.result !== "undefined" &&
          response.data.result !== null
        ) {
          console.log(response.data.result);
          setData(response.data.result);
        }
        //console.log("success!");
      })
      .catch((error) => {
        alert("입력이 잘못 되었습니다.");
        console.log(error);
      }); //실패했을 때
  }
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="left_box" style={{ marginBottom: "-600px" }}>
          <section
            className="info"
            style={{ boxShadow: "2px 2px 2px 2px #ddd" }}
          >
            <img src={data.imgUrl} style={{ borderRadius: "70%" }} />
            <h2>{data.username}</h2>
            {/* <h2>자신을 소개하는 글</h2> */}
            <h1>{data.email}</h1>
            <h1>{data.phoneNumber}</h1>
          </section>
          <section
            className="keywords"
            style={{ boxShadow: "2px 2px 2px 2px #ddd" }}
          >
            {data.keywords &&
              data.keywords.map((keyword) => (
                <div
                  key={keyword}
                  style={{
                    marginRight: "5px",
                    backgroundColor: "#fff",
                    padding: "10px",
                    paddingTop: "2px",
                    border: "1px solid #ccc",
                    borderRadius: "20px",
                  }}
                >
                  <p># {keyword} </p>
                </div>
              ))}
          </section>
          <section className="buttons">
            <button onClick={() => setSelect("Calendar")}>포토 캘린더</button>
            <button onClick={() => setSelect("Review")}>후기</button>
            <button onClick={() => navigate("/interwork")}>티켓 연동</button>
            <button onClick={() => handleModal2()}>팟 모집 목록</button>
            <MyPartsList
              open={modalOpen2}
              close={handleModal2}
              header="나의 팟 목록"
            />
          </section>
        </div>
        {select === "Review" ? (
          <div
            style={{
              height: "100px",
              marginLeft: "300px",
              marginBottom: "20px",
            }}
          >
            {/* <h1>내가 쓴 후기</h1> */}
            <MyReview />
          </div>
        ) : (
          <Calendar />
        )}
      </div>
    </>
  );
}
export default MyPage;
