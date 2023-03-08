#!/usr/bin/env node
import { rps } from "./lib/bin/rps-cli.js";
import { rpsls } from "./lib/bin/rpsls-cli.js";
import minimist from "minimist";
import express from "express";
import { GameMaker as RpsGameMaker } from "./lib/bin/rps-cli.js";
import { GameMaker as RpslsGameMaker } from "./lib/bin/rpsls-cli.js";

let argv = minimist(process.argv.slice(2));
let PORT = 5000;

if (argv["port"]) {
  PORT = argv["port"];
}

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/app", (req, res) => {
  res.status(200).send("200 OK");
});

app.get("/app/rps", (req, res) => {
  res.status(200).send(rps());
});

app.get("/app/rps/play", (req, res) => {
  let shot;
  req.body.shot ? (shot = req.body.shot) : (shot = req.query.shot);

  res.status(200).send(rps(shot));
});

app.post("/app/rps/play", (req, res) => {
  let shot;
  req.body.shot ? (shot = req.body.shot) : (shot = req.query.shot);

  res.status(200).send(rps(shot));
});

app.get("/app/rps/play/:shot", (req, res) => {
  let shot = req.params.shot;
  if (!RpsGameMaker.validateShot(shot)) {
    res.status(404).send("404 NOT FOUND");
  }
  res.status(200).send(rps(shot));
});

app.get("/app/rpsls", (req, res) => {
  res.status(200).send(rpsls());
});

app.get("/app/rpsls/play", (req, res) => {
  let shot;
  req.body.shot ? (shot = req.body.shot) : (shot = req.query.shot);

  res.status(200).send(rpsls(shot));
});

app.post("/app/rpsls/play", (req, res) => {
  let shot;
  req.body.shot ? (shot = req.body.shot) : (shot = req.query.shot);

  res.status(200).send(rpsls(shot));
});

app.get("/app/rpsls/play/:shot", (req, res) => {
  let shot = req.params.shot;
  if (!RpslsGameMaker.validateShot(shot)) {
    res.status(404).send("404 NOT FOUND");
  }

  res.status(200).send(rpsls(shot));
});

app.get("*", (req, res) => {
  res.status(404).send("404 NOT FOUND");
});

app.listen(PORT);
