import express, { Express } from "express";
import { BggService } from "./app/bgg-service";
import environment from "./environment";

const port: number = parseInt(environment.serverPort);
const app: Express = express();

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
  new BggService().getUserCollection("twerm").then((val: any) => res.send(val));
  // res.send("Hello Boardgame Library!");
});

app.get("/game/:gameId", (req, res) => {
  new BggService()
    .getGameProperties(parseInt(req.params.gameId))
    .then((val: any) => res.send(val));
});

app.listen(port, () => {
  console.log(`Boardgame Library Service app listening on port ${port}`);
});
