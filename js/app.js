// vim: set foldmethod=marker :
/**
 * Develion
 *
 * @dependency Underscore.js v1.4.4 <http://underscorejs.org/>
 *             jQuery v1.9.0 <http://jquery.com/>
 */
var $e, $c, $a; // $f, $d


$e = {
    debug: true,
    mediaUrl: '.',
    pcSize: [750, 600],
    kindleSize: [757, 897]
};


$c = {
  VERSION: '0.0.1',
  CSS_PREFIX: 'dvl-'
};



/**
 * Application
 */
$a = {
//{{{
  player: undefined,
  game: undefined,
  screen: undefined,
  statusbar: undefined,
  hand: undefined,

  $cards: {},

  catchError: function(err){
    $d('error =', err);
    $d('error.stack =', err.stack);
  },
  fontSize: function(px){
    return px;
  }//,
//}}}
};


$a.Sprite = (function(){
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


$a.Player = (function(){
//{{{
  var cls = function(){
  }

  function __INITIALIZE(self){
  }

  cls.create = function(){
    var obj = new this();
    __INITIALIZE(obj);
    return obj;
  }

  return cls;
//}}}
}());


$a.Game = (function(){
//{{{
  var cls = function(){

    this._score = 0;
    this._necessaryScore = 30;

    this._turn = 0;
    this._maxTurn = 10;

    this._baseActionCount = 1;
    this._modActionCount = 0;

    this._baseBuyCount = 1;
    this._modBuyCount = 0;

    this._baseCoin = 1;
    this._modCoin = 0;
  }

  function __INITIALIZE(self){
  }

  cls.prototype.getTurn = function(){ return this._turn; }
  cls.prototype.getMaxTurn = function(){ return this._maxTurn; }

  cls.prototype.getScore = function(){ return this._score; }
  cls.prototype.getNecessaryScore = function(){ return this._necessaryScore; }

  cls.prototype.getActionCount = function(){
    return this._baseActionCount + this._modActionCount;
  }

  cls.prototype.getBuyCount = function(){
    return this._baseBuyCount + this._modBuyCount;
  }

  cls.prototype.getCoin = function(){
    return this._baseCoin + this._modCoin;
  }

  cls.create = function(){
    var obj = new this();
    __INITIALIZE(obj);
    return obj;
  }

  return cls;
//}}}
}());


$a.Screen = (function(){
//{{{
  var cls = function(){
  }
  $f.inherit(cls, new $a.Sprite(), $a.Sprite);

  cls.ZINDEXES = {
  }

  cls.POS = [0, 0];
  cls.SIZE = $e.pcSize.slice(); // Must sync to CSS

  function __INITIALIZE(self){
    self._view.css({
      backgroundColor: '#EEE'
    });
  }

  cls.create = function(){
    var obj = $a.Sprite.create.apply(this);
    __INITIALIZE(obj);
    return obj;
  }

  return cls;
//}}}
}());


$a.Statusbar = (function(){
//{{{
  var cls = function(){
  }
  $f.inherit(cls, new $a.Sprite(), $a.Sprite);

  cls.POS = [0, 0];
  cls.SIZE = [$a.Screen.SIZE[0], 32];

  function __INITIALIZE(self){
    self._view.css({
      lineHeight: cls.SIZE[1] + 'px',
      fontSize: $a.fontSize(14),
      backgroundColor: '#FFF'
    });
  }

  cls.prototype.draw = function(){
    $a.Sprite.prototype.draw.apply(this);

    var t = '';
    t += $f.format('期間: {0}/{1}', $a.game.getTurn(), $a.game.getMaxTurn());
    t += $f.format(', 進捗: {0}/{1}', $a.game.getScore(), $a.game.getNecessaryScore());
    t += $f.format(', 行動回数: {0}', $a.game.getActionCount());
    t += $f.format(', 開発回数: {0}', $a.game.getBuyCount());
    t += $f.format(', 開発力: {0}', $a.game.getCoin());
    t += ', 山札: 00/00';
    t += ', フェーズ: 行動';
    this._view.text(t);
  }

  cls.create = function(){
    var obj = $a.Sprite.create.apply(this);
    __INITIALIZE(obj);
    return obj;
  };

  return cls;
//}}}
}());


$a.Hand = (function(){
//{{{
  var cls = function(){
  }
  $f.inherit(cls, new $a.Sprite(), $a.Sprite);

  cls.POS = [300, 0];
  cls.SIZE = [$a.Screen.SIZE[0], 300];

  function __INITIALIZE(self){
    self._view.css({
    });
  }

  cls.prototype.draw = function(){
    $a.Sprite.prototype.draw.apply(this);
  }

  cls.create = function(){
    var obj = $a.Sprite.create.apply(this);
    __INITIALIZE(obj);
    return obj;
  };

  return cls;
//}}}
}());


$a.Card = (function(){
//{{{
  var cls = function(){
    this._title = undefined;
    this._description = null;
    this._cost = 0;
    this._score = 0;
    this._actionCount = 0;
    this._buyCount = 0;
    this._coin = 0;
  }
  $f.inherit(cls, new $a.Sprite(), $a.Sprite);

  cls.POS = [0, 0];
  cls.SIZE = [80, 120];

  function __INITIALIZE(self){
    self._view.css({
      fontSize: $a.fontSize(12),
      backgroundColor: '#FFFF00'
    });

    self._titleView = $('<div />').css({
      width: cls.SIZE[0],
      height: 20,
      lineHeight: '20px',
      textAlign: 'center'//,
    }).appendTo(self._view);

    self._descriptionView = $('<div />').css({
      marginTop: 5,
      marginLeft: 5,
      width: cls.SIZE[0] - 10,
      height: 90,
      lineHeight: '20px',
      textAlign: 'left'//,
    }).appendTo(self._view);
  }

  cls.prototype.draw = function(){
    $a.Sprite.prototype.draw.apply(this);

    this._titleView.text(this._title);

    if (this._description === null) {
      this._descriptionView.html($f.nl2br($f.escapeHTML(this._createDescriptionText())));
    } else {
      this._descriptionView.html($f.nl2br($f.escapeHTML(this._description)));
    }
  }

  cls.prototype._createDescriptionText = function(){
    var lines = [];

    lines.push($f.format('コスト:{0}', this._cost));

    if (this._score !== 0) {
      lines.push($f.format('進捗:{0}', this._score));
    }
    if (this._coin !== 0) {
      lines.push($f.format('開発力:{0}', this._coin));
    }
    if (this._actionCount !== 0) {
      lines.push($f.format('行動回数:{0}', this._actionCount));
    }
    if (this._buyCount !== 0) {
      lines.push($f.format('開発回数:{0}', this._buyCount));
    }
    return lines.join('\n');
  }

  cls.create = function(){
    var obj = $a.Sprite.create.apply(this);
    __INITIALIZE(obj);
    return obj;
  };

  return cls;
//}}}
}());


$a.init = function(){
//{{{

  $a.player = $a.Player.create();
  $a.game = $a.Game.create();

  $a.screen = $a.Screen.create();
  $a.screen.draw();
  $('#game_container').append($a.screen.getView());

  $a.statusbar = $a.Statusbar.create();
  $a.statusbar.draw();
  $a.screen.getView().append($a.statusbar.getView());

  $a.hand = $a.Hand.create();
  $a.hand.draw();
  $a.screen.getView().append($a.hand.getView());

  var c1 = $a.$cards.Coin1Card.create();
  c1.draw();
  $a.hand.getView().append(c1.getView());

//}}}
}
