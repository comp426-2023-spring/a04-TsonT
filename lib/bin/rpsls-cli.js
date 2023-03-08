#!/usr/bin/env node

export function rpsls(shot) {
  let result = new Object();

  try {
    let player1 = new Player(shot);
    let player2 = new AI();
    let gameResult = GameMaker.simulateGame(player1, player2);
    if (!gameResult) {
      console.log(helpText + "\n" + rulesText);
      process.exit();
    } else {
      result.player = player1.shot;
      result.opponent = player2.shot;
      result.result = gameResult;
    }
  } catch (e) {
    if (e instanceof RangeError) {
      result.player = AI.generateShot();
    } else {
      console.log(e);
    }
  }

  return JSON.stringify(result);
}

export class GameMaker {
  static rockKey = {
    rock: "tie",
    paper: "lose",
    scissors: "win",
    lizard: "win",
    spock: "lose",
  };
  static paperKey = {
    rock: "win",
    paper: "tie",
    scissors: "lose",
    lizard: "lose",
    spock: "win",
  };
  static scissorsKey = {
    rock: "lose",
    paper: "win",
    scissors: "tie",
    lizard: "win",
    spock: "lose",
  };
  static lizardKey = {
    rock: "lose",
    paper: "win",
    scissors: "lose",
    lizard: "tie",
    spock: "win",
  };
  static spockKey = {
    rock: "win",
    paper: "lose",
    scissors: "win",
    lizard: "lose",
    spock: "tie",
  };
  static key = {
    rock: this.rockKey,
    paper: this.paperKey,
    scissors: this.scissorsKey,
    lizard: this.lizardKey,
    spock: this.spockKey,
  };

  static simulateGame(player1, player2) {
    if (this.validateShot(player1.shot)) {
      return this.determineWinner(player1.shot, player2.shot);
    } else {
      return false;
    }
  }

  static determineWinner(shot1, shot2) {
    return this.key[shot1][shot2];
  }

  static validateShot(player) {
    if (!shot) {
      throw new RangeError("shot out of range");
    }

    shot = shot.toLowerCase();

    if (!(shot in this.key)) {
      return false;
    } else {
      return true;
    }
  }
}

class Player {
  constructor(shot) {
    this.shot = shot;
  }
}

class AI {
  constructor() {
    this.shot = AI.generateShot();
  }

  static generateShot() {
    let randNum = Math.floor(Math.random() * 5);

    switch (randNum) {
      case 0:
        return "rock";
      case 1:
        return "paper";
      case 2:
        return "scissors";
      case 3:
        return "lizard";
      case 4:
        return "spock";
    }
  }
}
