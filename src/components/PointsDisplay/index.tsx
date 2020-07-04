import React from "react";

import styles from "./PointsDisplay.module.scss";

interface Props {
  used: number;
  total: number;
}

const PointsDisplay = (props: Props) => {
  return (
    <div className={styles.PointsDisplay} tabIndex={0} role="presentation">
      <div className={styles.count}>
        {props.used} / {props.total}
      </div>
      <h2 className={styles.title}>Points Spent</h2>
    </div>
  );
};

export default PointsDisplay;
