
var book = {};
book.init = function(){
	book.stage = new createjs.Stage("canvas");
	book.img = {};

	createjs.Ticker.framerate = 30;
	createjs.Ticker.addEventListener("tick", function(event){
		book.stage.update();
	});

	var manifest = [
		{"src": "back.jpg", "id":"back"},
		{"src": "lib.jpg", "id": "lib"},
		{"src": "white.jpg", "id":"white"},
		{"src": "wood.jpg", "id":"wood"},
		{"src": "blue.jpg", "id": "blue"},
		{"src": "baloon.png", "id": "baloon"},
	];
	book.shelf_a = [
		{"src": "a0.jpg", "id":"a0"},
		{"src": "a1.jpg", "id":"a1"},
		{"src": "a2.jpg", "id":"a2"},
		{"src": "a3.jpg", "id":"a3"},
	];
	book.loader = new createjs.LoadQueue(false);
	book.loader.loadManifest(manifest, true, "img/");
	book.loader.addEventListener("complete", book.drawCampus);
};

book.drawCampus = function(){
	book.img.backimg = new createjs.Bitmap(book.loader.getResult("lib"));
	book.stage.addChild(book.img.backimg);

	book.createBookShelf_A(book.shelf_a);

};
book.init();

book.createBookShelf_A = function(manifest_){
	var blue = new createjs.Bitmap(book.loader.getResult("blue"));
	var loader = new createjs.LoadQueue(false);
	loader.loadManifest(book.shelf_a,true,"book/");
	loader.on("complete", function(){
		var books = [];
		var clicker = [];
		for(i = 0; i <= 4; i++){
			books[i] = new createjs.Bitmap(loader.getResult("a" + String(i)));
			books[i].scaleX = books[i].scaleY = 0.4;
		}
		book.createShelf(blue,books,1);
	});

};
book.createShelf = function(shelf_, books_, serial_){
	var bookshelf_set = ({
		x: 50,
		y: 20,
		scaleX: 1,
		scaleY: 1
	});
	var shelf = new createjs.Container();
	shelf.addChild(shelf_);

	for(var i = 0;i < books_.length; i++){
		books_[i].set({
			x: 50 + 50 * i,
			y: 10,
		});
		console.log(books_[i].getBounds());
		var clicker = createClicker(books_[i].x, books_[i].y,books_[i].getBounds());
		shelf.addChild(books_[i]);
		shelf.addChild(clicker);
	}
	shelf.set(bookshelf_set);
	book.stage.addChild(shelf);
	return shelf;
};
function createClicker(x_,y_,width_,height_){
	console.log(arguments[0]);
	console.log(arguments[1]);
	console.log(arguments[2]);
	console.log(arguments[3]);
	console.log()
	var shape = new createjs.Shape();
	shape.graphics.beginFill("blue").drawRect(x_,y_,width_,height_);
	return shape;
}

function showBaloon(){
	var baloon = new createjs.Bitmap(book.loader.getResult("baloon"));
	baloon.x = 500;
	book.stage.addEventListener('click', remove);
	function remove(){
		console.log("clicked");
	}
	book.stage.addChild(baloon);

}
