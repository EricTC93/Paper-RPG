var mario = {
	name:"Mario",
	img: "assets/images/mario.png",
	$container: $("#char0")
};

var luigi = {
	name:"Luigi",
	img: "assets/images/luigi.png",
	$container: $("#char1")
};

var peach = {
	name:"Peach",
	img: "assets/images/peach.png",
	$container: $("#char2")
};

var bowser = {
	name:"Bowser",
	img: "assets/images/bowser.png",
	$container: $("#char3")
};

// console.log(mario);

$("#selectRow").append(mario.$container);