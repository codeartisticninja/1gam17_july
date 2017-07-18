"use strict";
import Actor = require("../../lib/scenes/actors/Actor");
import Scene = require("../../lib/scenes/Scene");

/**
 * Trigger class
 */

class Trigger extends Actor {
  public lock=3;

  constructor(scene:Scene, obj:any) {
    super(scene, obj);
  }

  update() {
    if (this.lock > 0) this.lock--;
  }

  render() {
    this.scene.game.ctx.strokeStyle = this.lock?"red":"green";
    super.render();
  }

  trigger() {
    if (!this.lock) {
      console.log("triggered!!!");
    }
    this.lock = 3;
  }

  /*
    _privates
  */

}
export = Trigger;
