"use strict";
import Scene       = require("../lib/scenes/Scene");
import myGame      = require("../MyGame");
import Sprite      = require("../lib/scenes/actors/Sprite");
import Actor       = require("../lib/scenes/actors/Actor");
import MediaPlayer = require("../lib/utils/MediaPlayer");

import Aye         = require("./actors/Aye");

/**
 * MyScene class
 */

class AdventureScene extends Scene {
  public game:myGame;

  constructor(game:myGame, map:string) {
    super(game, map);
    this.actorTypes["Aye"] = Aye;
  }

  update() {
    super.update();
    this.onOverlap(this.actorsByType["Aye"], this.actorsByType["Wall"], this.AyeMeetsWall, this);
  }

  AyeMeetsWall(aye:Aye, wall:Actor) {
    aye.position.subtract(aye.velocity);
  }
}
export = AdventureScene;
