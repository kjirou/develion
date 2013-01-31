$a.$cards.Coin1Card = (function(){
//{{{
  var cls = function(){
    this._title = 'コーダー';
    this._coin = 1;
  }
  $f.inherit(cls, new $a.Card(), $a.Card);
  return cls;
//}}}
}());


$a.$cards.Coin2Card = (function(){
//{{{
  var cls = function(){
    this._title = 'プログラマー';
    this._cost = 3;
    this._coin = 2;
  }
  $f.inherit(cls, new $a.Card(), $a.Card);
  return cls;
//}}}
}());


$a.$cards.Coin3Card = (function(){
//{{{
  var cls = function(){
    this._title = 'ハッカー';
    this._cost = 6;
    this._coin = 3;
  }
  $f.inherit(cls, new $a.Card(), $a.Card);
  return cls;
//}}}
}());


$a.$cards.Score1Card = (function(){
//{{{
  var cls = function(){
    this._title = '小機能';
    this._cost = 2;
    this._score = 1;
  }
  $f.inherit(cls, new $a.Card(), $a.Card);
  return cls;
//}}}
}());


$a.$cards.Score3Card = (function(){
//{{{
  var cls = function(){
    this._title = '中機能';
    this._cost = 5;
    this._score = 3;
  }
  $f.inherit(cls, new $a.Card(), $a.Card);
  return cls;
//}}}
}());


$a.$cards.Score6Card = (function(){
//{{{
  var cls = function(){
    this._title = '大機能';
    this._cost = 8;
    this._score = 6;
  }
  $f.inherit(cls, new $a.Card(), $a.Card);
  return cls;
//}}}
}());
