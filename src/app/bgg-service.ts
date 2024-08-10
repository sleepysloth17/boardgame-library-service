import environment from "../environment";
import { Game, PlayerCountProperties } from "./model/game";
import { CollectionParser } from "./parsing/collection-parser";
import { PlayerCountParser } from "./parsing/statistics-parser";

export class BggService {
  private static readonly ROOT_URL: string = environment.bggRootUrl;

  private static readonly COLLECTION_PARSER: CollectionParser =
    new CollectionParser();
  private static readonly PLAYER_COUNT_PARSER: PlayerCountParser =
    new PlayerCountParser();

  public getUserCollection(username: string): Promise<Game[]> {
    console.log(`Fetching collecction for ${username}`);
    return fetch(`${BggService.ROOT_URL}/collection/${username}?stats=1`).then(
      (res: Response) => {
        return res.text().then((body: string) => {
          return Promise.all(
            BggService.COLLECTION_PARSER.parseCollection(body).map(
              (game: Game) => {
                return this._getPlayerCountProperties(game.id).then(
                  (stats: PlayerCountProperties) => {
                    game.playerCount = stats;
                    return game;
                  },
                );
              },
            ),
          );
        });
      },
    );
  }

  private _getPlayerCountProperties(
    id: number,
  ): Promise<PlayerCountProperties> {
    console.log(`Fetching player count properties for game with id ${id}`);
    return fetch(`${BggService.ROOT_URL}/boardgame/${id}?stats=1`).then(
      (res: Response) => {
        return res.text().then((body: string) => {
          return BggService.PLAYER_COUNT_PARSER.parsePlayerCountProperties(
            body,
          );
        });
      },
    );
  }
}
