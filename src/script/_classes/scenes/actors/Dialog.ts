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
      "y":scene.game.canvas.height-64,
      "width":scene.game.canvas.width,
      "height":48,
      "visible":false,
      "properties":{
        "parallax":0,
        "order": 1024,
        "opacity": .75
      }
    });
    var m = 20;
    this._text = new Text(scene, {
      "x":m,
      "y":0,
      "width":this.size.x-2*m,
      "height":this.size.y,
      "properties":{
        "fontFamily":"Coming Soon"
      },
      "text":{
        "color":"#bef",
        "pixelsize":32,
        "text":"Oh.. Hello there..",
        "wrap":true,
        "halign": "center"
      }
    });
  }

  update() {
    let joy = this.scene.game.joypad;
    if (!this._msg) {
      return this.visible = false;
    }
    if (this._chars < this._msg.length) {
      this._chars+=2;
      this._text.text = this._msg.substr(0, this._chars);
    } else {
      this._text.text = this._msg;
    }
    if (joy.delta.fire === 1) {
      if (this._chars < this._msg.length) {
        this._chars = this._msg.length;
      } else {
        this._msg = this._lines.shift();
        this._chars = 0;
      }
    }
    if (this._msg instanceof Function) {
      let cb = this._msg;
      this._msg = this._lines.shift();
      this._chars = 0;
      return cb();
    }
  }

  render() {
    let g = this.scene.game.ctx;
    super.render();
    g.fillStyle = "#ffffee";
    // g.clearRect(this.offset.x, this.offset.y, this.size.x, this.size.y);
    g.translate(this.offset.x, this.offset.y);
    g.translate(this._text.position.x+Math.random(), this._text.position.y+Math.random());
    this._text.render();
  }

  say(txt:string, cb:Function) {
    this._text.text = txt;
    this._text.render();
    this._lines = this._lines.concat(this._text.lines);
    this._lines.push(cb);
    if (!this._msg) {
      this._msg = this._lines.shift();
      this._chars = 0;
    }
    this.visible = true;
  }

  /*
    _privates
  */
  private _msg:any="";
  private _chars:number=0;
  private _text:Text;
  private _lines:any[]=[];


}
export = Dialog;
