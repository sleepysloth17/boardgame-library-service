import { PlayerCountProperties } from "../model/game";
import { getWeight, Weight } from "../model/weight";
import { Parser } from "./parser";

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
  minplayers: number;
  maxplayers: number;
  poll: PollXml[];
  statistics: { ratings: { averageweight: number } };
};

export type RawProperties = {
  weight: Weight;
  playerCountProperties: PlayerCountProperties;
};

export class PropertiesParser {
  private static readonly SUGGESTED_PLAYER_POLL_NAME: string =
    "suggested_numplayers";

  private static readonly PARSER: Parser = new Parser();

  public parseProperties(data: string): RawProperties {
    const stats: StatisticsXml = PropertiesParser.PARSER.parseAndExtract(data, [
      "boardgames",
      "boardgame",
    ]);
    const poll: PollXml = stats.poll.find(
      (poll) => poll["@_name"] === PropertiesParser.SUGGESTED_PLAYER_POLL_NAME,
    );

    const suggested: number[] = [];
    const best: number[] = [];

    poll.results.forEach((result: SuggestedPlayerXml) => {
      const numberOfPlayers: number = parseInt(result["@_numplayers"]);
      let total: number = 0;

      let currentBest: number = 0;
      let currentNotRecommended: number = 0;

      result.result.forEach((current: SuggestedPlayerVoteXml) => {
        const val: number = parseInt(current["@_numvotes"]);
        total += val;
        switch (current["@_value"]) {
          case "Best":
            currentBest = val;
            break;
          case "Not Recommended":
            currentNotRecommended = val;
            break;
        }
      });

      currentBest = currentBest / total;
      currentNotRecommended = currentNotRecommended / total;

      if (currentNotRecommended <= 0.5) {
        suggested.push(numberOfPlayers);

        if (currentBest >= 0.5) {
          best.push(numberOfPlayers);
        }
      }
    });

    return {
      weight: getWeight(stats.statistics.ratings.averageweight),
      playerCountProperties: {
        range: { min: stats.minplayers, max: stats.maxplayers },
        suggested,
        best,
      },
    };
  }
}
