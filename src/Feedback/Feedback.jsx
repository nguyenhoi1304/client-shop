import React from "react";
import styles from "./Feedback.module.css";
import video from "../Share/videos/videoFeedback.mp4";
import ReactPlayer from "react-player";

const Feedback = () => {
  return (
    <>
      <nav className={styles.siderbar}>
        <div className={styles.siderbar_description}>
          <span className={styles.name}>Shop Cake Pumkk </span>
          <p className={styles.title}>Cập nhật thông tin về sản phẩm mới</p>
          <div>
            <button className={styles.btn_button}>fanpage</button>
            <button className={styles.btn_button}>instagram</button>
          </div>
        </div>
        <div className={styles.siderbar_video}>
          <div className={styles.overlay}> </div>
          <ReactPlayer
            url={video}
            className={styles.video}
            width={"100%"}
            height={"450px"}
            playing={true}
            controls={false}
            muted={true}
            loop={true}
          />
        </div>
      </nav>
    </>
  );
};

export default Feedback;
