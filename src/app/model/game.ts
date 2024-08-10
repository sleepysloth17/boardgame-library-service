export type PlayerCountProperties = {
  min: number;
  max: number;
  minSuggested: number;
  maxSuggested: number;
  best: number;
};

export type PlaytimeProperties = {
  min: number;
  max: number;
};

export type GameStats = {
  weight: number;
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
  playtime: PlaytimeProperties;
  playerCount: PlayerCountProperties;
  stats: GameStats;
};
