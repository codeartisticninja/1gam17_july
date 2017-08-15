"use strict";
import Trigger = require("./Trigger");
import AdventureScene = require("../AdventureScene");
import Sound = require("../../lib/utils/Sound");

/**
 * Thing class
 */

class Thing extends Trigger {
  public sfx:Sound;

  constructor(scene:AdventureScene, obj:any) {
    super(scene, obj);
    this._origFrame = this.frame;
    this.scene.game.loading++;
    this.sfx = new Sound("./assets/sounds/things.mp3", ()=>{
      this.scene.game.loaded++;
    });
    this.sfx.setMark("computer", 0, 10);
    this.sfx.setMark("fridge", 15, 10);
  }

  activate() {
    this.frame++;
    if (this._origFrame == 2) this.sfx.play("computer", true);
    if (this._origFrame == 4) this.sfx.play("fridge", true);
  }
  deactivate() {
    this.frame = this._origFrame;
    this.lock=0;
    this.sfx.stop();
  }

  /*
    _privates
  */
  private _origFrame:number;

}
export = Thing;
