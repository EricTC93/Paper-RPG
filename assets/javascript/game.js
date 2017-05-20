// Declaring Variables
var mario = {
	name:"Mario",

	img: "assets/images/mario.png",
	imgAlt: "assets/images/mario.png",

	$container: $("#char0"),
	id: $("#char0").attr("id"),

	maxHp: 100,
	hp: 100,

	attackPower: 20,
	counterAttack: 20
};

var luigi = {
	name:"Luigi",

	img: "assets/images/luigi.png",
	imgAlt: "assets/images/luigiAlt.png",

	$container: $("#char1"),
	id: $("#char1").attr("id"),

	maxHp: 90,
	hp: 90,

	attackPower: 15,
	counterAttack: 25
};

var peach = {
	name:"Peach",

	img: "assets/images/peach.png",
	imgAlt: "assets/images/peachAlt.png",

	$container: $("#char2"),
	id: $("#char2").attr("id"),

	maxHp: 80,
	hp: 80,

	attackPower: 10,
	counterAttack: 30
};

var bowser = {
	name:"Bowser",

	img: "assets/images/bowser.png",
	imgAlt: "assets/images/bowser.png",

	$container: $("#char3"),
	id: $("#char3").attr("id"),

	maxHp: 120,
	hp: 120,

	attackPower: 30,
	counterAttack: 15
};

var characters = [mario,luigi,peach,bowser];

// console.log(mario);

// console.log($("#char3 > img").attr("src"));

// $("#char1 > p").text(luigi.hp);

// $("#selectRow").append(mario.$container);

// console.log(mario.$container.children("img"));

// $("#char1 > img").attr("src",luigi.imgAlt);

// Display players' hp
for (var i = 0; i < characters.length; i++) {
	$("#char" + i + " > p").text(characters[i].hp);
}

var playerSelected = false;
var defenderSelected = false;
var userPlayer;
var defendingEnemy;

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
				defendingEnemy = characters[i];
			}
		}
	}
});


$("#attack").on("click",battle);


function battle() {
	if (playerSelected && defenderSelected) {
		// console.log(userPlayer);
		// console.log(defendingEnemy);

		defendingEnemy.hp-=userPlayer.attackPower;
		userPlayer.hp-=defendingEnemy.counterAttack;

		userPlayer.attackPower+=10;

		updateDisplay();

	}
}

function updateDisplay() {
	userPlayer.$container.children("p").text(userPlayer.hp);
	defendingEnemy.$container.children("p").text(defendingEnemy.hp);
}
