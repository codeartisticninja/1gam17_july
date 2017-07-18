"use strict";

/**
 * Script class
 * 
 * @date 18-jul-2017
 */

class Script {
  public storyTree:XMLDocument;
  public commands: { [key:string]:Function }={};
  public current:Element;
  // public next:Element;

  constructor(url?:string, public variables={}) {
    this.commands["p"] = (attrs:any, body:string, el:Element, next:Element) => {
      console.log(body);
      setTimeout(()=>{
        this.continue(next);
      }, body.length*100);
    }
    this.commands["pre"] = (attrs:any, body:string, el:Element, next:Element) => {
      this.goto(body.trim()||"+");
    }
    if (url) this.load(url, ()=>{ this.goto("story"); });
  }

  load(url:string, cb?:Function) {
    var r = new XMLHttpRequest();
    r.responseType = "document";
    r.open("GET", url, true);
    r.onreadystatechange = () => {
      if (r.readyState != 4 || r.status != 200) return;
      this.storyTree = r.response;
      // this.next = this.storyTree.firstElementChild;
      cb && cb();
    };
    r.send();
  }

  continue(current:Element) {
    this.current = current;
    if (!current) return;
    var cond = this._lazyJSON(this._evaluate(current.getAttribute("if") || "true"));
    if (!cond) {
      this.continue(current.nextElementSibling);
      return;
    }
    if (this.commands[current.tagName]) {
      this._IdChildren(current);
      var attrs = this._getAttributes(current);
      var el = <Element>this.storyTree.importNode(current, true);
      this._cullChildren(el);
      var body = this._evaluate(el.textContent);
      this.commands[current.tagName](attrs, body, el, current.nextElementSibling);
    } else {
      current.setAttribute("visits", this.getVisits("")+1);
      this.continue(current.firstElementChild);
    }
    this.current = null;
  }

  goto(path:string) {
    console.log("GOTO", path);
    this.continue(this.getElement(path));
  }

  getVisits(path:string, el?:Element) {
    var el = this.getElement(path, el);
    return this._lazyJSON(el.getAttribute("visits")) || 0;
  }
  getElement(path:string, el=this.current) {
    while (path) {
      switch (path[0]) {
        case ".":
          el = el.parentElement;
          path = path.substr(1).trim();
          break;
        case "/":
          el = el.firstElementChild;
          path = path.substr(1).trim();
          break;
        case "+":
          el = el.nextElementSibling;
          path = path.substr(1).trim();
          break;
        case "-":
          el = el.previousElementSibling;
          path = path.substr(1).trim();
          break;
      
        default:
          el = this.storyTree.querySelector(path);
          path = null;
          break;
      }
    }
    return el;
  }

  /*
    _privates
  */
  private _nextId=0;

  private _lazyJSON(json:string) {
    try {
      return JSON.parse(json);
    } catch (err) {
      return json;
    }
  }

  private _IdChildren(el:Element) {
    var child = el.firstElementChild;
    while (child) {
      if (!child.id) {
        child.id = "_" + (this._nextId++);
      }
      child = child.nextElementSibling;
    }
  }
  private _cullChildren(el:Element) {
    var child = el.firstElementChild;
    while (child) {
      var attrs = this._getAttributes(child);
      if (!attrs["if"]) {
        child.parentElement.removeChild(child);
      } else {
        for (var name in attrs) {
          child.setAttribute(name, attrs[name]);
        }
        child.innerHTML = "";
      }
      child = child.nextElementSibling;
    }
  }

  private _getAttributes(el:Element) {
    var out:{[key:string]:any} = { "if": true }
    for (var i=0;i<el.attributes.length;i++) {
      var attr = el.attributes[i];
      out[attr.name] = this._lazyJSON(this._evaluate(attr.value));
    }
    return out;
  }

  private _evaluate(str:string) {
    var pos = str.indexOf("{"), brack, res;
    while (pos !== -1) {
      brack = this._getBrack(str, pos);
      if (brack === false) return str;
      res = this._evaluateBrack(""+brack)
      str = str.replace("{"+brack+"}", res);
      pos = str.indexOf("{");
    }
    return str;
  }
  private _evaluateBrack(tag:string) {
    var parts = tag.split("|");
    var visits = this.getVisits(".");
    switch (tag[0]) {
      case "~":
        return parts[Math.floor(Math.random()*parts.length)];
      case "@":
        return parts[(visits-1)%parts.length];
      case "#":
        return parts[Math.min(visits,parts.length)-1];
    
      default:
        return this._evaluateJS(this._specialWords(tag));
    }
  }
  private _evaluateJS(_js:string) {
    var $ = this.variables, s=this;
    return ""+eval(_js);
  }

  private _getBrack(str:string, pos:number):boolean|string {
    var end = this._matchingBrack(str,pos);
    if (end < 0) {
      return false;
    } else {
      return str.substring(pos+1,end);
    }
  }
  private _matchingBrack(str:string, pos:number) {
    var opens = 1, openchar = str[pos], closechar;
    switch (openchar) {
      case "(":
        closechar = ")";
        break;
      case "{":
        closechar = "}";
        break;
      case "[":
        closechar = "]";
        break;
      case "<":
        closechar = ">";
        break;
      case "\"":
        closechar = "\"";
        break;
      case "'":
        closechar = "'";
        break;
    
      default:
        return -1;
    }
    while (opens > 0) {
      pos++;
      if (pos >= str.length) return -1;
      switch (str[pos]) {
        case openchar:
          opens++;
          break;
        case closechar:
          opens--;
          break;
      }
    }
    return pos;
  }
  private _specialWords(str:string) {
    str = str.replace(/(\s|^)AND(\s|$)/g, " && ");
    str = str.replace(/(\s|^)OR(\s|$)/g,  " || ");
    str = str.replace(/(\s|^)NEQ(\s|$)/g, " !== ");
    str = str.replace(/(\s|^)EQ(\s|$)/g,  " === ");
    str = str.replace(/(\s|^)LTE(\s|$)/g, " <= ");
    str = str.replace(/(\s|^)GTE(\s|$)/g, " >= ");
    str = str.replace(/(\s|^)LT(\s|$)/g,  " < ");
    str = str.replace(/(\s|^)GT(\s|$)/g,  " > ");
    return str;
  }

}
export = Script;
