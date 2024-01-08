import React from "react";
import PropTypes from "prop-types";
import styles from "./Home.module.css";

Clock.propTypes = {
  timerDays: PropTypes.number,
  timerHours: PropTypes.number,
  timerMinutes: PropTypes.number,
  timerSeconds: PropTypes.number,
};

Clock.defaultProps = {
  timerHours: 10,
  timerMinutes: 10,
  timerSeconds: 10,
};
function Clock(props) {
  const { timerHours, timerMinutes, timerSeconds } = props;
  console.log(timerHours, timerMinutes, timerSeconds);
  return (
    <>
      <div className={styles.clock}>
        <span className={styles.clock_text}>Kết thúc sau</span>:
        <span className={styles.clock_text}>{timerHours} giờ</span>:
        <span className={styles.clock_text}>{timerMinutes} phút</span>:
        <span className={styles.clock_text}>{timerSeconds} giây</span>
      </div>
    </>
  );
}

export default Clock;
