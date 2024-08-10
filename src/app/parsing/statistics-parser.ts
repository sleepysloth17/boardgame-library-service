import { PlayerCountProperties } from "../model/game";
import { Parser } from "./parser";

type RawSuggestedPlayerResult = {
  best: number;
  recommended: number;
  notRecommended: number;
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
  minplayers: number;
  maxplayers: number;
  poll: PollXml[];
  statistics: { ratings: { averageweight: number } };
};

export class PlayerCountParser {
  private static readonly SUGGESTED_PLAYER_POLL_NAME: string =
    "suggested_numplayers";

  private static readonly PARSER: Parser = new Parser();

  public parsePlayerCountProperties(data: string): PlayerCountProperties {
    const stats: StatisticsXml = PlayerCountParser.PARSER.parseAndExtract(
      data,
      ["boardgames", "boardgame"],
    );
    const poll: PollXml = stats.poll.find(
      (poll) => poll["@_name"] === PlayerCountParser.SUGGESTED_PLAYER_POLL_NAME,
    );

    let minSuggested: number = Infinity;
    let maxSuggested: number = -Infinity;
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
        if (numberOfPlayers < minSuggested) {
          minSuggested = numberOfPlayers;
        }

        if (numberOfPlayers > maxSuggested) {
          maxSuggested = numberOfPlayers;
        }

        if (currentBest >= 0.5) {
          best.push(numberOfPlayers);
        }
      }
    });

    return {
      min: stats.minplayers,
      max: stats.maxplayers,
      minSuggested,
      maxSuggested,
      best,
    };
  }
}
