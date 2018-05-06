
function Book() { this.init() };

Book.prototype.init = function() {

  //  canvasからcanvasのステージを作成
  this.stage = new createjs.Stage('canvas');

  //  フレームレートの設定(easel.js)
  createjs.Ticker.framerate = 30;
  createjs.Ticker.addEventListener('tick', function() {
    this.stage.update();
  }.bind(this));

  //  画像の読み込み(preload.js)
  var manifest = [
    {'src': 'lib.jpg',    'id': 'lib'},
    {'src': 'white.jpg',  'id':'white'},
    {'src': 'wood.jpg',   'id':'wood'},
    {'src': 'blue.jpg',   'id': 'blue'},
    {'src': 'baloon.png', 'id': 'baloon'},
    {'src': 'up.png',     'id': 'up'},
    {'src': 'down.png',   'id': 'down'},
    {'src': 'a0.jpg',     'id':'a0'},
    {'src': 'a1.jpg',     'id':'a1'},
    {'src': 'a2.jpg',     'id':'a2'},
    {'src': 'a3.jpg',     'id':'a3'},
    {'src': 'a4.jpg',     'id':'a4'},
    {'src': 'a5.jpg',     'id':'a5'},
    {'src': 'a6.jpg',     'id':'a6'},
    {'src': 'a7.jpg',     'id':'a7'},
    {'src': 'a8.jpg',     'id':'a8'},
    {'src': 'a9.jpg',     'id':'a9'},
    {'src': 'a10.jpg',     'id':'a10'}
  ];

  this.loader = new createjs.LoadQueue(false);
  this.loader.loadManifest(manifest, true, 'img/');
  this.loader.on('complete', this.draw.bind(this));
};


//  描画
Book.prototype.draw = function() {
  this.back_image = new createjs.Bitmap(this.loader.getResult('lib'));
  this.stage.addChild(this.back_image);

  var up = new createjs.Bitmap(this.loader.getResult('up'));
  up.scaleX = up.scaleY = 2;
  up.x = 450;
  up.y = 100;
  this.stage.addChild(up);

  this.createBookShelf();
};


Book.prototype.createBookShelf = function() {
  var shelf_container = new createjs.Container();
  shelf_container.x = 500;
  shelf_container.y = 30;

  //	棚の設定
  var shelf = new createjs.Bitmap(this.loader.getResult('blue'));
  shelf_container.addChild(shelf);


  //	読み込みが終わり次第棚に追加していく
  var list = [];
  var self = this;
  for(var i = 0; i <= 10;i++)
  {
    (function() {

      //  本の位置の設定
      list[i] = new createjs.Bitmap(self.loader.getResult('a' + i));
      list[i].scaleX = list[i].scaleY = 0.4;
      if(i <= 4){
        list[i].x = 50 + i * 60;
        list[i].y = 10;
      } else if (i <= 9) {
        list[i].x = 50 + (i - 5) * 60;
        list[i].y = 130;
      } else if (i <= 14) {
        list[i].x = 50 + (i - 10) * 60;
        list[i].y = 240;
      }

      self.makeBaloon(list[i],i);
      shelf_container.addChild(list[i]);
    })();
  }

  this.stage.addChild(shelf_container);
};

Book.prototype.makeBaloon = function(book_, i) {

  book_.addEventListener('click', function() {

    var baloonContainer = new createjs.Container();
    baloonContainer.set({
      x: 60,
      y: 50
    });

    var baloon = new createjs.Bitmap(this.loader.getResult('baloon'));
    baloon.set({
      scaleX: 1.1,
      scaleY: 1.3
    });
    baloonContainer.addChild(baloon);

    var book_image = new createjs.Bitmap(this.loader.getResult('a' + String(i)));
    book_image.x = 20;
    book_image.y = 50;
    book_image.scaleX = book_image.scaleY = 0.6;
    baloonContainer.addChild(book_image);

    this.back_image.addEventListener('click', function() {
      this.stage.removeChild(baloonContainer);
    }.bind());

    this.stage.addChild(baloonContainer);
  }.bind(this));
};

var Bookshelf = new Book();
