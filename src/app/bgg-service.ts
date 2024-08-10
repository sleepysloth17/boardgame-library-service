import environment from "../environment";
import { Game } from "./model/game";
import { RawStatistics, XmlParserService } from "./xml-parser-service";

export class BggService {
  private static readonly ROOT_URL: string = environment.bggRootUrl;

  private static readonly parserService: XmlParserService =
    new XmlParserService(); // TODO

  public getUserCollection(username: string): Promise<Game[]> {
    console.log(`Fetching collecction for ${username}`);
    return fetch(`${BggService.ROOT_URL}/collection/${username}?stats=1`).then(
      (res: Response) => {
        return res.text().then((body: string) => {
          return Promise.all(
            BggService.parserService.parseCollection(body).map((game: Game) => {
              return this._getGameStatistics(game.id).then(
                (stats: RawStatistics) => {
                  console.log(stats);
                  game.playerCount.minSuggested;
                  game.playerCount.maxSuggested;
                  game.playerCount.best;
                  game.stats.weight = stats.weight;
                  return game;
                },
              );
            }),
          );
        });
      },
    );
  }

  private _getGameStatistics(id: number): Promise<RawStatistics> {
    console.log(`Fetchin game statistics for game with id ${id}`);
    return fetch(`${BggService.ROOT_URL}/boardgame/${id}?stats=1`).then(
      (res: Response) => {
        return res.text().then((body: string) => {
          return BggService.parserService.parseGameStatistics(body);
        });
      },
    );
  }
}
