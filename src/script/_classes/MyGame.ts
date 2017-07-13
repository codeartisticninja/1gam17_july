"use strict";
import Game = require("./lib/Game");

import MyScene  = require("./scenes/MyScene");


/**
 * MyGame class
 */

class MyGame extends Game {
  public scriptVars={}

  constructor(container:string|HTMLElement) {
    super(container, 960);
    this.frameRate = 12;
    this.addScene("main", new MyScene(this));
    this.joypad.enable();
    this.startScene("main");
  }

}
export = MyGame;
