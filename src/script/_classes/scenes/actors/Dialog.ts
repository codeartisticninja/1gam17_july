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
    this._text = new Text(scene, {
      "x":m,
      "y":m/2,
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
    let cb = this._cb;
    if (this._chars < this._msg.length) {
      this._chars+=2;
      this._text.text = this._msg.substr(0, this._chars);
    } else {
      this._text.text = this._msg;
    }
    if (cb && joy.delta.fire === 1) {
      if (this._chars < this._msg.length) {
        this._chars = this._msg.length;
      } else {
        this.visible = false;
        this._msg = "";
        this._cb = null;
        cb();
      }
    }
  }

  render() {
    let g = this.scene.game.ctx;
    super.render();
    g.fillStyle = "#ffffee";
    g.fillRect(this.offset.x, this.offset.y, this.size.x, this.size.y);
    g.translate(this.offset.x, this.offset.y);
    g.translate(this._text.position.x+Math.random(), this._text.position.y+Math.random());
    this._text.render();
  }

  say(txt:string, cb:Function) {
    this.visible = true;
    this._msg = txt;
    this._chars = 0;
    this._cb = cb;
  }

  /*
    _privates
  */
  private _msg:string="fuck";
  private _chars:number=0;
  private _cb:Function;
  private _text:Text;


}
export = Dialog;
