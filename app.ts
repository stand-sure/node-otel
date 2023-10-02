import { Console } from "console";
import express, { Express, Request, Response } from "express";

const port: number = parseInt(process.env.PORT || "8080");
const app: Express = express();

type MinMax = {
    min: number,
    max: number,
}

function getRandomNumber({ min = 1, max = 6 }: MinMax = { min: 1, max: 6 }) {
    return Math.floor(Math.random() * (max - min) + min);
}

app.get("/rollDice", rollDice)

app.listen(port, () => console.log(`listening on ${port}`));

function rollDice(req: Request, res: Response) {
    res.send(getRandomNumber().toString())
}