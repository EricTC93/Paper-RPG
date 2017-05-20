// Declaring Variables
var mario = {
	name:"Mario",
	img: "assets/images/mario.png",
	imgAlt: "assets/images/mario.png",
	$container: $("#char0"),
	id: $("#char0").attr("id")
};

var luigi = {
	name:"Luigi",
	img: "assets/images/luigi.png",
	imgAlt: "assets/images/luigiAlt.png",
	$container: $("#char1"),
	id: $("#char1").attr("id")
};

var peach = {
	name:"Peach",
	img: "assets/images/peach.png",
	imgAlt: "assets/images/peachAlt.png",
	$container: $("#char2"),
	id: $("#char2").attr("id")
};

var bowser = {
	name:"Bowser",
	img: "assets/images/bowser.png",
	imgAlt: "assets/images/bowser.png",
	$container: $("#char3"),
	id: $("#char3").attr("id")
};

var characters = [mario,luigi,peach,bowser];

// console.log(mario);

// $("#selectRow").append(mario.$container);


var playerSelected = false;
var defenderSelected = false;
var userPlayer

$(".characterContainer").on("click",function() {
	// console.log(this.id);
	// console.log(characters[0].id);
	// Selects Player
	if (!playerSelected) {

		playerSelected = true;

		for (var i = 0; i < characters.length; i++) {

			if (this.id != characters[i].id) {
				$("#selectRow").append(characters[i].$container);

			}

			else {
				userPlayer = characters[i];
			}
		}
	}

	// Selects Defender
	else if (!defenderSelected && this.id != userPlayer.id) {
		for (var i = 0; i < characters.length; i++) {

			defenderSelected = true;

			if (this.id === characters[i].id) {
				$("#defenderRow").append(characters[i].$container);

			}
		}
	}
});

