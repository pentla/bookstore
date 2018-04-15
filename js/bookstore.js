
var book = {};

//	ステージの作成、ステージ更新の設定、ステージに載せる画像の設定
book.init = function(){
  book.stage = new createjs.Stage('canvas');
  book.img = {};

  createjs.Ticker.framerate = 30;
  createjs.Ticker.addEventListener('tick', function(){
    book.stage.update();
  });

  var manifest = [
    {'src': 'lib.jpg', 'id': 'lib'},
    {'src': 'white.jpg', 'id':'white'},
    {'src': 'wood.jpg', 'id':'wood'},
    {'src': 'blue.jpg', 'id': 'blue'},
    {'src': 'baloon.png', 'id': 'baloon'},
    {'src': 'up.png', 'id': 'up'},
    {'src': 'down.png', 'id': 'down'},
    {'src': 'a0.jpg', 'id':'a0'},
    {'src': 'a1.jpg', 'id':'a1'},
    {'src': 'a2.jpg', 'id':'a2'},
    {'src': 'a3.jpg', 'id':'a3'},
    {'src': 'a4.jpg', 'id':'a4'},
    {'src': 'a5.jpg', 'id':'a5'},
    {'src': 'a6.jpg', 'id':'a6'},
    {'src': 'a7.jpg', 'id':'a7'},
    {'src': 'a8.jpg', 'id':'a8'},
    {'src': 'a9.jpg', 'id':'a9'},
    {'src': 'a10.jpg', 'id':'a10'},
  ];
  book.loader = new createjs.LoadQueue(false);
  book.loader.loadManifest(manifest, true, 'img/');
  book.loader.on('complete', book.drawCampus);
};


//	画像の読み込みが終わり次第呼ばれる
book.drawCampus = function(){
  book.img.backimg = new createjs.Bitmap(book.loader.getResult('lib'));
  book.stage.addChild(book.img.backimg);

  book.up = new createjs.Bitmap(book.loader.getResult('up'));
  book.up.scaleX = book.up.scaleY = 2;
  book.up.x = 450;
  book.up.y = 100;
  book.stage.addChild(book.up);

  book.createBookShelf_A(book.shelf_a);


};
book.init();

book.createBookShelf_A = function(){
  var bookShelf = new createjs.Container();
  bookShelf.x = 500;
  bookShelf.y = 30;
  //	棚の設定
  var shelf = new createjs.Bitmap(book.loader.getResult('blue'));
  bookShelf.addChild(shelf);

  //	本の画像の読み込み

  //	読み込みが終わり次第棚に追加していく
  book.list = [];
  for(var i = 0; i <= 10;i++)
  {
    (function(){
      book.list[i] = new createjs.Bitmap(book.loader.getResult('a' + String(i)));
      book.list[i].scaleX = book.list[i].scaleY = 0.4;
      if(i <= 4){
        book.list[i].x = 50 + i * 60;
        book.list[i].y = 10;
      } else if (i <= 9) {
        book.list[i].x = 50 + (i - 5) * 60;
        book.list[i].y = 130;
      } else if (i <= 14) {
        book.list[i].x = 50 + (i - 10) * 60;
        book.list[i].y = 240;
      }
      book.makeBaloon(book.list[i],i);
      bookShelf.addChild(book.list[i]);
    })();
  }
  // createBitmap_book();
  book.stage.addChild(bookShelf);
};

book.makeBaloon = function(book_,i)
{
  book_.addEventListener('click', function(){

    var baloonContainer = new createjs.Container();
    baloonContainer.set({
      x: 60,
      y: 50
    });
    var baloon = new createjs.Bitmap(book.loader.getResult('baloon'));
    baloon.set({
      scaleX: 1.1,
      scaleY: 1.3
    });
    baloonContainer.addChild(baloon);

    var bookimg = new createjs.Bitmap(book.loader.getResult('a' + String(i)));
    bookimg.x = 20;
    bookimg.y = 50;
    bookimg.scaleX = bookimg.scaleY = 0.6;
    baloonContainer.addChild(bookimg);
    book.img.backimg.addEventListener('click', function(){
      book.stage.removeChild(baloonContainer);
    });

    book.stage.addChild(baloonContainer);
  });
};
