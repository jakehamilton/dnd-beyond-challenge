import React from "react";
import cn from "classnames";
import { useTalents, ITalent, ITalentPath } from "@hooks/useTalents";

import styles from "./Talent.module.scss";

const SPRITE_SIZE = 50;

interface Props {
  path: ITalentPath;
  pathId: number;
  talent: ITalent;
  level: number;
}

const Talent = (props: Props) => {
  const { updateLevel, usedPoints, totalPoints } = useTalents();

  const availablePoints = totalPoints - usedPoints;

  const isActive = props.path.level >= props.level;

  const enableLevel = () => {
    // The previous talent is enabled and we have points to spend.
    if (props.path.level === props.level - 1 && availablePoints !== 0) {
      updateLevel(props.pathId, props.level);
    }
  };

  const disableLevel = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // Stop the context menu from appearing.
    event.preventDefault();

    // This talent is the highest one in the path.
    if (props.path.level === props.level) {
      updateLevel(props.pathId, props.level - 1);
    }
  };

  return (
    <>
      <button
        className={cn(styles.Talent, isActive && styles.active)}
        onClick={enableLevel}
        onContextMenu={disableLevel}
        aria-label={`${props.talent.name} talent. ${
          isActive ? "learned" : "not learned"
        }.`}
      >
        <div
          className={styles.icon}
          style={{
            backgroundPositionX: props.talent.sprite * SPRITE_SIZE * -1,
            backgroundPositionY: isActive ? 0 : SPRITE_SIZE,
          }}
        />
      </button>
    </>
  );
};

export default Talent;
