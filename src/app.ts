import express, { Express } from "express";
import { BggService } from "./app/bgg-service";
import { Game } from "./app/model/game";
import { RawProperties } from "./app/parsing/properties-parser";
import environment from "./environment";

const port: number = parseInt(environment.serverPort);
const app: Express = express();

let cache: Game[] = []; // TODO

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello Boardgame Library!");
});

app.get("/collection", (req, res) => {
  if (cache.length) {
    console.log("Responding with cache");
    res.send(cache);
  } else {
    new BggService().getUserCollection("twerm").then((val: Game[]) => {
      cache = val;
      res.send(cache);
    });
  }
});

app.get("/game/:gameId", (req, res) => {
  new BggService()
    .getGameProperties(parseInt(req.params.gameId))
    .then((val: RawProperties) => res.send(val));
});

app.listen(port, () => {
  console.log(`Boardgame Library Service app listening on port ${port}`);
});
