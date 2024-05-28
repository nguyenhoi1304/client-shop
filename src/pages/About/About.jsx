import React from "react";
import styles from "./About.module.css";
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function About() {
  return (
    <div>
      {/* <Map/> */}
      <div className={styles.about}>
        <div className="container">
          <div style={{ backgroundColor: "#ccc", padding: "30px 15px" }}>
            <strong>
              Trang chủ / <span style={{ opacity: "0.7" }}>giới thiệu</span>
            </strong>
          </div>
          <h2 className={styles.nameStore}>HOIPUMKK CAKE STORE </h2>
          <p className={styles.description}>Cuộc sống tuy khổ, nhưng những  chiếc bánh lại có thể sẽ đem đến một chút ngọt ngào </p>
          <p className={styles.description}>
            Bạn đã bao giờ tưởng tưởng một ngày của một thợ làm bánh sẽ bắt đầu
            như thế nào chưa. Với bột, trứng, sữa, lò nướng và vô vàn thứ khác,
            đây sẽ là những trải nghiệm vô cùng thú vị khi bạn khoác lên mình
            chiếc tạp dề và biến những thứ riêng biệt mà lại hòa quyện cùng
            nhau.
          </p>

          <p className={styles.description}>
            Thợ làm bánh là một công vịêc thú vị vì chỉ khi bước vào rồi, bạn
            mới thấy đó là con đường thật sự ngọt ngào, nhưng cũng pha trộn
            nhiều cảm xúc, mùi vị khác.Bạn tiếp xúc với bánh còn nhiều hơn với
            cả cơm ăn, thức uống. Đến cả trong giấc ngủ cũng nghe thoang thoảng
            mùi bột, mùi thơm trong lò… Nhưng vượt qua tất thảy những điều ấy,
            những người thợ làm bánh đã thật sự tạo nên những giá trị đẹp trong
            cuộc sống và mang lại hạnh phúc, niềm vui và sự ngọt ngào cho con
            người. Đó mới chính là nét đẹp của nghề mà chúng tôi sẵn sàng dành
            cả đời mình để chọn lựa!
          </p>
          <p className={styles.description}>
            Tại tiệm bánh Hoipumkk, chúng tôi đặt niềm đam mê công việc và tinh
            thần phục vụ khách hàng vào từng chiếc bánh được tạo ra mỗi ngày.
          </p>
          <div className={styles.share}>
            <div>
              <b>Chia sẻ :</b>
            </div>
            <ul className="list-unstyled mb-0 d-flex mr-2">
              <li>
                <a className="mr-4" href="https://twitter.com/">
                  <FontAwesomeIcon className="mr-2" icon={faTwitter} />
                  Twitter
                </a>
              </li>
              <li>
                <a className="mr-4" href="https://www.instagram.com/">
                  <FontAwesomeIcon className="mr-2" icon={faInstagram} />
                  Instagram
                </a>
              </li>
              <li>
                <a className="mr-4" href="https://www.facebook.com/">
                  <FontAwesomeIcon className="mr-2" icon={faFacebook} />
                  Facebook
                </a>
              </li>
              <li>
                <a className="mr-4" href="https://www.pinterest.com/">
                  <FontAwesomeIcon className="mr-2" icon={faPinterest} />
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
