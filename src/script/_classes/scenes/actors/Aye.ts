"use strict";
import Actor = require("../../lib/scenes/actors/Actor");
import Scene = require("../../lib/scenes/Scene");

/**
 * Aye class
 */

class Aye extends Actor {
  constructor(scene:Scene, obj:any) {
    super(scene, obj);
    this.setAnchor(this.size.x/2, this.size.y-16);
    this.size.set(64, 32);
    this.addAnimation("idle", [0,1,2,3,4,5,6,7]);
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
      this.playAnimation("idle");
    }
    super.update();
  }

  /*
    _privates
  */

}
export = Aye;
