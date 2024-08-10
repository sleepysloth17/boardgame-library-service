export enum Weight {
  LIGHT = "LIGHT",
  MEDIUM_LIGHT = "MEDIUM_LIGHT",
  MEDIUM = "MEDIUM",
  MEDIUM_HEAVY = "MEDIUM_HEAVY",
  HEAVY = "HEAVY",
}

const weightRange: Record<number, Weight> = {
  [1]: Weight.LIGHT,
  [2]: Weight.MEDIUM_LIGHT,
  [3]: Weight.MEDIUM,
  [4]: Weight.MEDIUM_HEAVY,
  [5]: Weight.HEAVY,
};

export const getWeight: (val: number) => Weight = (val: number) => {
  const lower: number = Math.floor(val);
  const upper: number = Math.ceil(val);
  return val - lower < 0.5 ? weightRange[lower] : weightRange[upper];
};
