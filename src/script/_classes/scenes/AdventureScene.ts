"use strict";
import Scene       = require("../lib/scenes/Scene");
import myGame      = require("../MyGame");
import Sprite      = require("../lib/scenes/actors/Sprite");
import Actor       = require("../lib/scenes/actors/Actor");
import MediaPlayer = require("../lib/utils/MediaPlayer");
import Script      = require("../lib/utils/Script");

import Aye         = require("./actors/Aye");
import Trigger     = require("./actors/Trigger");

/**
 * AdventureScene class
 */

class AdventureScene extends Scene {
  public game:myGame;
  public script:Script;

  constructor(game:myGame, map:string) {
    super(game, map);
    this.actorTypes["Aye"] = Aye;
    this.actorTypes["Trigger"] = Trigger;
  }

  loadScript(url:string) {
    this.script = new Script(url, this.game.scriptVars);
    this.script.commands["scene"] = (attrs:any, body:string) => {
      this.game.startScene(body);
    }
  }

  update() {
    super.update();
    this.onOverlap(this.actorsByType["Aye"], this.actorsByType["Trigger"], this.AyeMeetsTrigger, this);
    this.onOverlap(this.actorsByType["Aye"], this.actorsByType["Wall"], this.AyeMeetsWall, this);
  }

  AyeMeetsWall(aye:Aye, wall:Actor) {
    aye.snapToEdge(wall);
  }

  AyeMeetsTrigger(aye:Aye, trigger:Trigger) {
    trigger.trigger();
  }
}
export = AdventureScene;
