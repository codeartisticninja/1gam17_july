"use strict";
import Actor = require("../../lib/scenes/actors/Actor");
import Scene = require("../../lib/scenes/Scene");

/**
 * Aye class
 */

class Aye extends Actor {
  public state:string;

  constructor(scene:Scene, obj:any) {
    super(scene, obj);
    this.setAnchor(this.size.x/2, this.size.y-15);
    this.size.set(60, 30);
    this.addAnimation("idle",  [ 0, 1, 2, 3, 4, 5, 6, 7]);
    this.addAnimation("walk",  [ 8, 9,10,11,12,13,14,15], 0);
    this.addAnimation("do",    [16,17,18,19,20,21,22,23]);
    this.addAnimation("sleep", [24,25,26,27,28,29,30,31]);
  }

  update() {
    var joy = this.scene.game.joypad;
    if (this.state) return super.update();
    if (joy.dir.magnitude && !this.scene.actorsByType["Dialog"][0].visible) {
      this.velocity.copyFrom(joy.dir).multiplyXY(8);
      this.playAnimation("walk");
      this.animationFrame += joy.dir.magnitude;
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
    this.scene.camera.copyFrom(this.position).subtractXY(this.scene.game.canvas.width/2, this.scene.game.canvas.height/2);
  }

  doNothing() {
    for(let thing of this.scene.actorsByType["Thing"]) {
      if (this.overlapsWith(thing)) {
        thing.deactivate();
      }
    }
    this.state = null;
  }

  doSomething() {
    for(let thing of this.scene.actorsByType["Thing"]) {
      if (this.overlapsWith(thing)) {
        this.position.x = thing.position.x;
        thing.activate();
      }
    }
    this.state = "doing";
    this.playAnimation("do");
    this.velocity.set(0);
  }

  sleep() {
    for(let thing of this.scene.actorsByType["Thing"]) {
      if (this.overlapsWith(thing)) {
        this.position.x = thing.position.x;
        thing.activate();
      }
    }
    this.state = "sleeping";
    this.scale.x = 1;
    this.playAnimation("sleep");
    this.velocity.set(0);
  }

  /*
    _privates
  */

}
export = Aye;
