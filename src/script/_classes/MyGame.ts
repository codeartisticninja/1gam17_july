"use strict";
import Game = require("./lib/Game");

import AdventureScene  = require("./scenes/AdventureScene");


/**
 * MyGame class
 */

class MyGame extends Game {
  public scriptVars={}
  
  constructor(container:string|HTMLElement) {
    super(container, 960);
    this.frameRate = 12;
    this.addScene("4door_room", new AdventureScene(this, "./assets/maps/4door_room.json"));
    this.addScene("maze", new AdventureScene(this, "./assets/maps/maze.json"));
    this.joypad.enable();
    this.startScene("4door_room");
  }

}
export = MyGame;
