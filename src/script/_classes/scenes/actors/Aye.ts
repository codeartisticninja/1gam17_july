"use strict";
import Actor = require("../../lib/scenes/actors/Actor");
import Scene = require("../../lib/scenes/Scene");

/**
 * Aye class
 */

class Aye extends Actor {
  constructor(scene:Scene, obj:any) {
    super(scene, obj);
    this.setAnchor(this.size.x/2, this.size.y);
    this.addAnimation("idle", [15]);
    this.addAnimation("walk", [8,9,10,11,12,13,14,15]);
  }

  update() {
    var joy = this.scene.game.joypad;
    if (joy.dir.magnitude) {
      this.velocity.copyFrom(joy.dir).multiplyXY(8);
      this.playAnimation("walk");
      if (joy.dir.x < 0) {
        this.scale.x = -1;
      }
      if (joy.dir.x > 0) {
        this.scale.x = 1;
      }
    } else {
      this.velocity.set(0);
      this.playAnimation("idle", true);
    }
    super.update();
  }

  /*
    _privates
  */

}
export = Aye;
