import { Game } from "../model/game";
import { Parser } from "./parser";

type GameXml = {
  "@_objectid": string;
  name: { "#text": string };
  "@_subtype": string;
  image: string;
  thumbnail: string;
  stats: {
    "@_minplaytime": string;
    "@_maxplaytime": string;
    "@_minplayers": string;
    "@_maxplayers": string;
  };
};

export class CollectionParser {
  private static readonly PARSER: Parser = new Parser();

  public parseCollection(data: string): Game[] {
    const games: GameXml[] = CollectionParser.PARSER.parseAndExtract(data, [
      "items",
      "item",
    ]);

    return games.map((game: GameXml) => ({
      id: parseInt(game["@_objectid"]),
      name: game["name"]["#text"],
      properties: {
        type: game["@_subtype"],
        imageUrl: game.image,
        thumbnailUrl: game.thumbnail,
      },
      stats: {
        playtime: {
          min: parseInt(game.stats["@_minplaytime"]),
          max: parseInt(game.stats["@_maxplaytime"]),
        },
        weight: null,
        playerCount: null,
      },
    }));
  }
}
