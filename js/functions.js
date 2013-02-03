/**
 * Functions
 */
$f = {};

$f.consoleLog = function(){
  if ('console' in this && 'log' in this.console) {
    try {
      return this.console.log.apply(this.console, arguments);
    } catch (err) {// For IE
      var args = Array.prototype.slice.apply(arguments);
      return this.console.log(args.join(' '));
    }
  }
}

/** String formatter like Python 3
    @example format('My name is {0}, {1} years old', 'kjirou', 34)
             format('I like {0} and {1}', ['sushi', 'sukiyaki'])
             format('{0.x} {1.y}', {x:11}, {y:22})
    @author http://d.hatena.ne.jp/ajalabox/20110223/1298448703 */
$f.format = function() {
  var args, fmt, result;

  args = Array.apply([], arguments);
  fmt = typeof this === "string" ? this : args.shift();

  if (args.length === 1 && typeof args[0] === "object") {
    args = args[0];
  }

  result = fmt.replace(/{([^}]+)}/g, function (s, id) {
    var chain = id.split("."), substr, i;
    if (chain.length >= 2) {
      substr = args[chain[0]];
      for (i = 1; i < chain.length; i++) {
          substr = substr[chain[i]];
      }
    } else {
      substr = args[id];
    }
    return substr;
  });

  return result;
}

$f.mixin = function(SubClass, superObj, SuperClass){
  var k;
  if (superObj !== undefined && superObj !== null) {
    for (k in superObj) {
      SubClass.prototype[k] = superObj[k]
    }
  }
  if (SuperClass !== undefined && SuperClass !== null) {
    for (k in SuperClass) {
      if (SuperClass.hasOwnProperty(k) && k !== 'prototype') {
        SubClass[k] = SuperClass[k]
      }
    }
  }
}
$f.inherit = function(SubClass, superObj, SuperClass){
  SubClass.prototype = superObj;
  SubClass.prototype.__myClass__ = SubClass;
  $f.mixin(SubClass, null, SuperClass);
}

$f.getMyNames = function(scope, obj){
    var list = [], k;
    for (k in scope) { if (obj === scope[k]) list.push(k) };
    return list;
}

$f.getMyName = function(scope, obj){
    var names = $f.getMyNames(scope, obj);
    if (names.length !== 1) throw new Error('$f.getMyName: Invalid situation');
    return names[0];
}

/**
 * Return coordinates that is created by dividing large square by same small square
 *
 * @param partSize [width,height]
 * @param targetSize [width,height]
 * @param borderWidth default=0
 * @return arr [[top,left], ...], Order by 1) left to right 2) top to bottom
 */
$f.squaring = function(partSize, targetSize, borderWidth) {
  if (borderWidth === undefined) borderWidth = 0;
  var coords = [], top, left;
  for (top = 0; targetSize[1] >= top + partSize[1]; top += partSize[1] + borderWidth) {
    for (left = 0; targetSize[0] >= left + partSize[0]; left += partSize[0] + borderWidth) {
      coords.push([top, left]);
    }
  }
  return coords;
}

$f.escapeHTML = function(str){
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/'/g, '&#039;');
  return str;
}

$f.nl2br = function(str){
  return str.replace(/(?:\r\n|\n|\r)/g, '<br />');
}

/** For jQuery.Deferred.then */
$f.wait = function(ms){
  return function(){
    var d = $.Deferred();
    setTimeout(function(){
      d.resolve();
    }, ms);
    return d;
  }
}

$f.argumentsToArray = function(args){
  var arr = [], i;
  for (i = 0; i < args.length; i += 1) { arr.push(args[i]) }
  return arr;
}


/**
 * Classes
 */
$f.ReceivableOptionsMixin = (function(){
//{{{
    var cls = function(){
        this.__options = undefined;
    };
    cls.prototype.setOptions = function(options){
        this.__options = options || {};
    };
    cls.prototype.getOptions = function(/* args */){
        var self = this;

        var optionKeys = [];
        if (arguments.length === 1 && _.isArray(arguments[0])) {
            optionKeys = arguments[0];
        } else if (arguments.length > 0) {
            optionKeys = $f.argumentsToArray(arguments);
        }

        var i, extracted;
        if (optionKeys.length === 0) {
            return this.__options;
        } else {
            extracted = {};
            _.each(optionKeys, function(optionKey, i){
                if (optionKey in self.__options) {
                    extracted[optionKey] = self.__options[optionKey];
                }
            });
            return extracted;
        }
    };
    cls.prototype.getOption = function(key){
        return this.__options[key];
    };
    return cls;
//}}}
}());


$f.Sprite = (function(){
//{{{
    var cls = function(){
        this._view = undefined;
        this._pos = undefined;
        this._size = undefined;
        this._zIndex = 0;
        this._elementId = null;
        this._objectId = undefined;
    };
    $f.mixin(cls, new $f.ReceivableOptionsMixin());

    // Default settings, now this is used only for initialization
    cls.POS = [undefined, undefined];
    cls.SIZE = [undefined, undefined];

    var __CURRENT_OBJECT_ID = 1;
    var __OBJECTS = {};

    function __INITIALIZE(self){
        self._pos = self.__myClass__.POS.slice();
        self._size = self.__myClass__.SIZE.slice();

        self._objectId = __CURRENT_OBJECT_ID;
        if (self._elementId === null) {
            self._elementId = $c.CSS_PREFIX + 'sprite-' + self._objectId;
        }

        self._view = $('<div />').attr({ id:self._elementId }).addClass('sprite');

        __OBJECTS[self._elementId] = self;
        __CURRENT_OBJECT_ID += 1;
    };

    cls.prototype.draw = function(){
        this._view.css({
            // 'position:absolute' must not be defined in CSS.
            //   because jQuery.ui.draggable add 'position:relative' to it
            // Ref) jquery-ui-1.9.2.custom.js#L5495
            position: 'absolute',
            top: this.getTop(),
            left: this.getLeft(),
            width: this.getWidth(),
            height: this.getHeight(),
            zIndex: this._zIndex
        });
    };

    cls.prototype.drawZIndexOnly = function(zIndex){
        this._zIndex = zIndex;
        this._view.css({ zIndex:zIndex });
    };

    cls.prototype.getView = function(){ return this._view };

    cls.prototype.setPos = function(v){ this._pos = v };
    cls.prototype.getPos = function(){ return this._pos };
    cls.prototype.getTop = function(){ return this._pos[0] };
    cls.prototype.getLeft = function(){ return this._pos[1] };

    cls.prototype.setSize = function(v){ this._size = v };
    cls.prototype.getSize = function(){ return this._size };
    cls.prototype.getWidth = function(){ return this._size[0] };
    cls.prototype.getHeight = function(){ return this._size[1] };

    cls.prototype.setZIndex = function(v){ this._zIndex = v };

    cls.getByElementId = function(elementId){
        var obj = __OBJECTS[elementId];
        if (obj === undefined) throw new Error('Sprite.getByElementId: Not found object');
        return obj;
    }

    cls.create = function(options){
        var obj = new this();
        obj.setOptions(options);
        __INITIALIZE(obj);
        return obj;
    }

    return cls;
//}}}
}());


/**
 * Shortcuts
 */
$d = function(){
  if ($e.debug === false) return;
  return $f.consoleLog.apply(this, arguments);
}
