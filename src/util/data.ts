import { ITalentPath } from "@hooks/useTalents";

/**
 * Mock data. Typically, this would be retrieved from an API
 * when writing a SPA.
 */
const paths: ITalentPath[] = [
  {
    name: "Talent Path 1",
    level: 0,
    talents: ["Chevrons", "Silverware", "Cake", "Crown"].map((name, i) => ({
      name,
      sprite: i,
    })),
  },
  {
    name: "Talent Path 2",
    level: 0,
    talents: ["Ship", "Scuba", "Electricity", "Skull"].map((name, i) => ({
      name,
      sprite: i + 4,
    })),
  },
];

export default paths;
