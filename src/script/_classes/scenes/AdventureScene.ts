"use strict";
import Scene       = require("../lib/scenes/Scene");
import myGame      = require("../MyGame");
import Sprite      = require("../lib/scenes/actors/Sprite");
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
}
export = AdventureScene;
