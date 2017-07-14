"use strict";
import Actor = require("./Actor");
import Scene = require("../Scene");

/**
 * Scenery class
 * 
 * @date 14-jul-2017
 */

class Scenery extends Actor {
  public img = new Image();

  constructor(scene:Scene, obj:any) {
    super(scene);
    this.name = obj.name;
    this.type = obj.type;
    this.position.x = obj.x || 0;
    this.position.y = obj.y || this.position.x;
    this.img.src = scene.mapUrl.substr(0, scene.mapUrl.lastIndexOf("/")+1) + obj.image;
    this.opacity = obj.opacity;
  }

  render () {
    if (!this.img.width) return;
    let g = this.scene.game.ctx;
    g.drawImage(this.img, 0, 0);
  }

  /*
    _privates
  */

}
export = Scenery;
