import environment from "../environment";
import { Game } from "./model/game";
import { CollectionParser } from "./parsing/collection-parser";
import { PropertiesParser, RawProperties } from "./parsing/properties-parser";

export class BggService {
  private static readonly ROOT_URL: string = environment.bggRootUrl;

  private static readonly COLLECTION_PARSER: CollectionParser =
    new CollectionParser();
  private static readonly PROPERTIES_PARSER: PropertiesParser =
    new PropertiesParser();

  public getUserCollection(username: string): Promise<Game[]> {
    console.log(`Fetching collecction for ${username}`);
    return fetch(`${BggService.ROOT_URL}/collection/${username}?stats=1`).then(
      (res: Response) => {
        return res.text().then((body: string) => {
          return Promise.all(
            BggService.COLLECTION_PARSER.parseCollection(body).map(
              (game: Game) => {
                return this.getGameProperties(game.id).then(
                  (props: RawProperties) => {
                    game.playerCount = props.playCountProperties;
                    game.stats.weight = props.weight;
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

  public getGameProperties(id: number): Promise<RawProperties> {
    console.log(`Fetching player count properties for game with id ${id}`);
    return fetch(`${BggService.ROOT_URL}/boardgame/${id}?stats=1`).then(
      (res: Response) => {
        return res.text().then((body: string) => {
          return BggService.PROPERTIES_PARSER.parseProperties(body);
        });
      },
    );
  }
}
