"use strict";
import Trigger = require("./Trigger");
import AdventureScene = require("../AdventureScene");

/**
 * Thing class
 */

class Thing extends Trigger {
  constructor(scene:AdventureScene, obj:any) {
    super(scene, obj);
    this._origFrame = this.frame;
  }

  activate() {
    this.frame++;
  }
  deactivate() {
    this.frame = this._origFrame;
    this.lock=0;
  }

  /*
    _privates
  */
  private _origFrame:number;

}
export = Thing;
