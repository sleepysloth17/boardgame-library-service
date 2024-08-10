import { XMLParser } from "fast-xml-parser";
import { Game } from "./model/game";

type RawSuggestedPlayerResult = {
  best: number;
  recommended: number;
  notRecommended: number;
};

type RawSuggestedPlayers = {
  [name: number]: RawSuggestedPlayerResult;
};

export type RawStatistics = {
  weight: number;
  suggestedPlayers: RawSuggestedPlayers;
};

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

type SuggestedPlayerVoteXml = {
  "@_value": "Best" | "Recommended" | "Not Recommended";
  "@_numvotes": string;
};

type SuggestedPlayerXml = {
  "@_numplayers": string;
  result: SuggestedPlayerVoteXml[];
};

type PollXml = {
  results: (unknown | SuggestedPlayerXml)[];
  "@_name": string;
  "@_totalvotes": string;
};

type StatisticsXml = {
  poll: PollXml[];
  statistics: { ratings: { averageweight: number } };
};

// TODO https://github.com/NaturalIntelligence/fast-xml-parser/blob/HEAD/docs/v4/2.XMLparseOptions.md
export class XmlParserService {
  private static readonly PARSER: XMLParser = new XMLParser({
    ignoreAttributes: false,
  });

  private static readonly SUGGESTED_PLAYER_POLL_NAME: string =
    "suggested_numplayers";

  public parseCollection(data: string): Game[] {
    const games: {
      items: {
        item: GameXml[];
      };
    } = this._parse(data);
    return games.items.item.map((game: GameXml) => ({
      id: parseInt(game["@_objectid"]),
      name: game["name"]["#text"],
      properties: {
        type: game["@_subtype"],
        imageUrl: game.image,
        thumbnailUrl: game.thumbnail,
      },
      playtime: {
        min: parseInt(game.stats["@_minplaytime"]),
        max: parseInt(game.stats["@_maxplaytime"]),
      },
      playerCount: {
        min: parseInt(game.stats["@_minplayers"]),
        max: parseInt(game.stats["@_maxplayers"]),
        minSuggested: null,
        maxSuggested: null,
        best: null,
      },
      stats: {
        weight: null,
      },
    }));
  }

  public parseGameStatistics(data: string): RawStatistics {
    const xml: {
      boardgames: {
        boardgame: StatisticsXml;
      };
    } = this._parse(data);
    const stats: StatisticsXml = xml.boardgames.boardgame;
    const poll: PollXml = stats.poll.find(
      (poll) => poll["@_name"] === XmlParserService.SUGGESTED_PLAYER_POLL_NAME,
    );

    const suggestedPlayers: RawSuggestedPlayers = {};

    poll.results.forEach((result: SuggestedPlayerXml) => {
      let total: number = 0;
      const currentResult: RawSuggestedPlayerResult = result.result.reduce(
        (
          returnMap: RawSuggestedPlayerResult,
          current: SuggestedPlayerVoteXml,
        ) => {
          const val: number = parseInt(current["@_numvotes"]);
          total += val;
          switch (current["@_value"]) {
            case "Best":
              returnMap.best = val;
              break;
            case "Recommended":
              returnMap.recommended = val;
              break;
            case "Not Recommended":
              returnMap.notRecommended = val;
              break;
          }
          return returnMap;
        },
        {} as RawSuggestedPlayerResult,
      );
      currentResult.best = currentResult.best / total;
      currentResult.recommended = currentResult.recommended / total;
      currentResult.notRecommended = currentResult.notRecommended / total;
      suggestedPlayers[result["@_numplayers"]] = currentResult;
    });

    return {
      weight: stats.statistics.ratings.averageweight,
      suggestedPlayers,
    };
  }

  private _parse<T>(data: string): T {
    return XmlParserService.PARSER.parse(data) as T;
  }
}
