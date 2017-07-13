"use strict";
import Actor = require("../../lib/scenes/actors/Actor");
import Scene = require("../../lib/scenes/Scene");

/**
 * Anx class
 */

class Anx extends Actor {
  public anxiety=-100;

  constructor(scene:Scene) {
    super(scene);
    this.sprite = this.scene.spritesByName["anx_walk"];
    this.size.copyFrom(this.sprite.size);
    this.frame = 1;
    this.setAnchor(this.size.x/2, this.size.y/2);
    this.position.set(this.scene.game.canvas.width/2,this.scene.game.canvas.height/2);
    this.addAnimation("walk", [0,1,2,3]);
    this.addAnimation("idle", [2]);
  }

  update() {
    var joy = this.scene.game.joypad;
    if (joy.dir.magnitude) {
      if (this.anxiety > 16) {
        this.anxiety += -joy.dir.magnitude;
      }
      this.velocity.copyFrom(joy.dir).multiplyXY(8);
      this.playAnimation("walk");
      if (joy.dir.x < 0) {
        this.scale.x = -1;
      }
      if (joy.dir.x > 0) {
        this.scale.x = 1;
      }
    } else {
      // if (this.anxiety < 100) {
        this.anxiety += 1;
      // }
      if (joy.fire && this.anxiety > 200) {
        this.anxiety *= -1;
      }
      if (this.anxiety <= -1) {
        this.scale.set(Math.sqrt(Math.abs(this.anxiety)));
      }
      this.velocity.set(0);
      this.playAnimation("idle");
    }
    super.update();
  }

  render () {
    let g = this.scene.game.ctx;
    g.save();
    g.translate(this.anxiety*Math.random() - this.anxiety*.5, this.anxiety*Math.random() - this.anxiety*.5);
    super.render();
    g.restore();
    // this.scene.game.container.style.backgroundColor = "rgba(0,0,0,"+ ((100-this.anxiety)/100) +"), black";
  }

  /*
    _privates
  */

}
export = Anx;
