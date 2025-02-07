import { Weight } from "./weight";

export type NumberRange = {
  min: number;
  max: number;
};

export type PlayerCountProperties = {
  range: NumberRange;
  suggested: number[];
  best: number[];
};

export type GameStats = {
  playtime: NumberRange;
  weight: Weight;
  playerCount: PlayerCountProperties;
};

export type GameProperties = {
  type: string;
  yearPublished: number;
  imageUrl: string;
  thumbnailUrl: string;
  description: string;
};

export type Game = {
  id: number;
  name: string;
  properties: GameProperties;
  stats: GameStats;
};
