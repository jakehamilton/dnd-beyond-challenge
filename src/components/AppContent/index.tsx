import React from "react";
import TalentPath from "@components/TalentPath";
import PointsDisplay from "@components/PointsDisplay";
import useTalents from "@hooks/useTalents";

import styles from "./AppContent.module.scss";

const AppContent = () => {
  const { paths, usedPoints, totalPoints } = useTalents();

  return (
    <div className={styles.AppContent}>
      <div className={styles.PointsDisplay}>
        <PointsDisplay used={usedPoints} total={totalPoints} />
      </div>
      <div className={styles.TalentPaths}>
        {paths.map((path, i) => (
          <TalentPath path={path} id={i} key={path.name} />
        ))}
      </div>
    </div>
  );
};

export default AppContent;
