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


$a.$cards.ReorganizationCard = (function(){
//{{{
  var cls = function(){
    this._title = '配置換え';
    this._description = 'コスト: 2\n行動回数: 1\n任意の枚数を捨て同数カードを引く';
    this._cost = 2;
    this._actionCount = 1;
  }
  $f.inherit(cls, new $a.Card(), $a.Card);
  return cls;
//}}}
}());


$a.$cards.ObjectorientedCard = (function(){
//{{{
  var cls = function(){
    this._title = 'OOP';
    this._cost = 3;
    this._coin = 2;
    this._buyCount = 1;
  }
  $f.inherit(cls, new $a.Card(), $a.Card);
  return cls;
//}}}
}());


$a.$cards.HealthCard = (function(){
//{{{
  var cls = function(){
    this._title = '体調管理';
    this._cost = 3;
    this._card = 1;
    this._actionCount = 1;
    this._score = 1;
  }
  $f.inherit(cls, new $a.Card(), $a.Card);
  return cls;
//}}}
}());


$a.$cards.ModularizationCard = (function(){
//{{{
  var cls = function(){
    this._title = 'モジュール化';
    this._description = 'コスト: 3\n4コストまでのカードを獲得する';
    this._cost = 3;
  }
  $f.inherit(cls, new $a.Card(), $a.Card);
  return cls;
//}}}
}());


$a.$cards.ScalabilityCard = (function(){
//{{{
  var cls = function(){
    this._title = '大規模対応';
    this._cost = 4;
    this._card = 3;
  }
  $f.inherit(cls, new $a.Card(), $a.Card);
  return cls;
//}}}
}());


$a.$cards.LeadershipCard = (function(){
//{{{
  var cls = function(){
    this._title = '責任感';
    this._cost = 5;
    this._card = 1;
    this._actionCount = 1;
    this._buyCount = 1;
    this._coin = 1;
  }
  $f.inherit(cls, new $a.Card(), $a.Card);
  return cls;
//}}}
}());
