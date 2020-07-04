import React from "react";
import noop from "@util/noop";

export interface ITalent {
  name: string;
  sprite: number;
}

export interface ITalentPath {
  name: string;
  level: number;
  talents: ITalent[];
}

/**
 * Update a talent path's current level to a new value.
 */
export type UpdateLevel = (path: number, level: number) => void;

export interface ITalentsContextValue {
  paths: ITalentPath[];
  usedPoints: number;
  totalPoints: number;
  updateLevel: UpdateLevel;
}

export const DEFAULT_TALENTS_CONTEXT_VALUE = {
  paths: [],
  usedPoints: 0,
  totalPoints: 0,
  updateLevel: noop,
};

export const TalentsContext = React.createContext<ITalentsContextValue>(
  DEFAULT_TALENTS_CONTEXT_VALUE
);

interface IProviderState {
  totalPoints: number;
  usedPoints: number;
  paths: ITalentPath[];
}

interface IUpdateLevelAction {
  type: "updateLevel";
  payload: {
    path: number;
    level: number;
  };
}

type ProviderAction = IUpdateLevelAction;

const reducer = (
  state: IProviderState,
  action: ProviderAction
): IProviderState => {
  switch (action.type) {
    default:
      return state;
    case "updateLevel": {
      const { path, level } = action.payload;

      const currentLevel = state.paths[path].level;
      const levelDifference = level - currentLevel;

      // Attempting to increase level from a talent
      // that is not adjacent to the current one; or
      // attempting to decrease level from a talent
      // taht is not the current one.
      if (Math.abs(levelDifference) !== 1) {
        return state;
      }

      // Attempting to increase level when there are no points available
      if (levelDifference > 0 && state.usedPoints === state.totalPoints) {
        return state;
      }

      const usedPoints = state.usedPoints + levelDifference;

      const paths = state.paths.slice(0);

      paths[path] = {
        ...paths[path],
        level,
      };

      return {
        ...state,
        paths,
        usedPoints,
      };
    }
  }
};

interface ProviderProps {
  paths?: ITalentPath[];
  points: number;
  children: React.ReactNode;
}

export const TalentsProvider = (props: ProviderProps) => {
  const { paths = [], points = 0 } = props;

  /**
   * This use case is simple enough that it could be managed with `useState`.
   * `useReducer` was chosen to demonstrate understanding and present a
   * method for expanding the functionality to handle more actions should
   * we need.
   */
  const [state, dispatch] = React.useReducer(reducer, {
    paths,
    totalPoints: points,
    usedPoints: 0,
  });

  const updateLevel: UpdateLevel = (path, level) => {
    dispatch({
      type: "updateLevel",
      payload: {
        path,
        level,
      },
    });
  };

  const value: ITalentsContextValue = {
    ...state,
    updateLevel,
  };

  return (
    <TalentsContext.Provider value={value}>
      {props.children}
    </TalentsContext.Provider>
  );
};

export const useTalents = (): ITalentsContextValue => {
  const value = React.useContext(TalentsContext);

  if (value === undefined) {
    throw new Error(
      "useTalents() must be used within a <TalentsProvider> element."
    );
  }

  return value;
};

export default useTalents;
