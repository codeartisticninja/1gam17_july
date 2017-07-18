"use strict";
import Actor          = require("../../lib/scenes/actors/Actor");
import AdventureScene = require("../AdventureScene");
import Text           = require("../../lib/scenes/actors/Text");

/**
 * Dialog class
 */

class Dialog extends Actor {
  public scene:AdventureScene;
  public lock=3;
  public text:Text;

  constructor(scene:AdventureScene) {
    super(scene, {
      "type":"Dialog",
      "x":0,
      "y":scene.game.canvas.height*.75,
      "width":scene.game.canvas.width,
      "height":scene.game.canvas.height*.25,
      "visible":false,
      "properties":{
        "parallax":0,
        "order": 1024,
        "opacity": .9
      }
    });
    var m = 20;
    this.text = new Text(scene, {
      "x":m,
      "y":m,
      "width":scene.game.canvas.width-2*m,
      "height":scene.game.canvas.height*.25-2*m,
      "properties":{
        "fontFamily":"Coming Soon",
        "outline":"#909999"
      },
      "text":{
        "color":"#223344",
        "pixelsize":32,
        "text":"Oh.. Hello there..",
        "wrap":true
      }
    });
  }

  update() {
    let joy = this.scene.game.joypad;
    if (this._cb && joy.delta.fire === 1) {
      this.visible = false;
      this._cb();
      this._cb = null;
    }
  }

  render() {
    let g = this.scene.game.ctx;
    super.render();
    g.fillStyle = "#ffffee";
    g.fillRect(this.offset.x, this.offset.y, this.size.x, this.size.y);
    g.translate(this.offset.x, this.offset.y);
    g.translate(this.text.position.x, this.text.position.y);
    this.text.render();
  }

  say(txt:string, cb:Function) {
    this.visible = true;
    this.text.text = txt;
    this._cb = null;
    setTimeout(()=>{
      this._cb = cb;
    }, 128);
  }

  /*
    _privates
  */
  private _cb:Function;

}
export = Dialog;
