import React from "react";
import Talent from "@components/Talent";
import { ITalentPath } from "@hooks/useTalents";

import styles from "./TalentPath.module.scss";

interface Props {
  path: ITalentPath;
  id: number;
}

const TalentPath = (props: Props) => {
  return (
    <div className={styles.TalentPath}>
      <h3 className={styles.title}>{props.path.name}</h3>
      <div className={styles.talents}>
        {props.path.talents.map((talent, i) => (
          <Talent
            path={props.path}
            pathId={props.id}
            talent={talent}
            level={i + 1}
            key={`${props.path.name}-${talent.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TalentPath;
