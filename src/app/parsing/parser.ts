import { XMLParser } from "fast-xml-parser";

export class Parser {
  private static readonly PARSER: XMLParser = new XMLParser({
    ignoreAttributes: false,
  });

  public parseAndExtract<T>(data: string, path: string[]): T {
    let xml: unknown = this.parse(data);

    while (path.length) {
      if (xml[path[0]]) {
        xml = xml[path[0]];
        path.splice(0, 1);
      } else {
        throw new Error(`Cannot extract ${path} from object ${xml}`);
      }
    }

    return xml as T;
  }

  public parse<T>(data: string): T {
    return Parser.PARSER.parse(data) as T;
  }
}
