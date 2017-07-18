"use strict";
import Actor = require("../../lib/scenes/actors/Actor");
import AdventureScene = require("../AdventureScene");

/**
 * Trigger class
 */

class Trigger extends Actor {
  public scene:AdventureScene;
  public lock=3;
  public goto:string;

  constructor(scene:AdventureScene, obj:any) {
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
      this.scene.script.goto(this.goto);
    }
    this.lock = 3;
  }

  /*
    _privates
  */

}
export = Trigger;
