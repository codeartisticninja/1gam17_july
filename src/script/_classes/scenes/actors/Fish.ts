"use strict";
import Actor = require("../../lib/scenes/actors/Actor");
import Scene = require("../../lib/scenes/Scene");

/**
 * Fish class
 */

class Fish extends Actor {
  public state:string;

  constructor(scene:Scene, obj:any) {
    super(scene, obj);
    this.addAnimation("swim",  [ 0, 1, 2, 3, 4, 5, 6, 7]);
    this.playAnimation("swim");
    this.velocity.x = 8;
  }

  update() {
    super.update();
    if (this.position.x < -this.size.x) {
      this.scale.x = -1;
      this.position.y = Math.random() * this.scene.size.y;
    }
    if (this.position.x > this.scene.size.x + this.size.x) {
      this.scale.x = 1;
      this.position.y = Math.random() * this.scene.size.y;
      this.velocity.x = Math.random() * 16;
    }
    this.velocity.x = Math.abs(this.velocity.x) * -this.scale.x;
  }


  /*
    _privates
  */

}
export = Fish;
