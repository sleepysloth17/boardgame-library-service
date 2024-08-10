import { Weight } from "./weight";

export type NumberRange = {
  min: number;
  max: number;
};

export type PlayerCountProperties = {
  range: NumberRange;
  minSuggested: number;
  maxSuggested: number;
  best: number[];
};

export type GameStats = {
  playtime: NumberRange;
  weight: Weight;
  playerCount: PlayerCountProperties;
};

export type GameProperties = {
  type: string;
  imageUrl: string;
  thumbnailUrl: string;
};

export type Game = {
  id: number;
  name: string;
  properties: GameProperties;
  stats: GameStats;
};
