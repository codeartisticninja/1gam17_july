"use strict";
import Trigger = require("./Trigger");
import AdventureScene = require("../AdventureScene");

/**
 * Thing class
 */

class Thing extends Trigger {
  constructor(scene:AdventureScene, obj:any) {
    super(scene, obj);
  }

  activate() {
    this.frame++;
  }
  deactivate() {
    this.frame--;
  }

  /*
    _privates
  */

}
export = Thing;
