// Declaring Variables
var mario = {
	name:"Mario",
	nameAlt:"Mr. M",

	img: "assets/images/mario.png",
	imgAlt: "assets/images/marioAlt.png",

	$container: $("#char0"),
	id: $("#char0").attr("id"),

	maxHp: 120,
	hp: 120,

	startingAttack: 15,
	attackPower: 15,
	counterAttack: 20
};

var luigi = {
	name:"Luigi",
	nameAlt:"Mr. L",

	img: "assets/images/luigi.png",
	imgAlt: "assets/images/luigiAlt.png",

	$container: $("#char1"),
	id: $("#char1").attr("id"),

	maxHp: 115,
	hp: 115,

	startingAttack: 13,
	attackPower: 13,
	counterAttack: 25
};

var peach = {
	name:"Peach",
	nameAlt:"Shadow Peach",

	img: "assets/images/peach.png",
	imgAlt: "assets/images/peachAlt.png",

	$container: $("#char2"),
	id: $("#char2").attr("id"),

	maxHp: 110,
	hp: 110,

	startingAttack: 11,
	attackPower: 11,
	counterAttack: 30
};

var bowser = {
	name:"Bowser",
	nameAlt:"Dark Bowser",

	img: "assets/images/bowser.png",
	imgAlt: "assets/images/bowserAlt.png",

	$container: $("#char3"),
	id: $("#char3").attr("id"),

	maxHp: 125,
	hp: 125,

	startingAttack: 17,
	attackPower: 17,
	counterAttack: 15
};

var characters = [mario,luigi,peach,bowser];

var playerSelected = false;
var defenderSelected = false;
var userPlayer;
var defendingEnemy;
var enemiesDefeated = 0;

// Display players' hp
for (var i = 0; i < characters.length; i++) {
	characters[i].$container.children("p").text(characters[i].hp);
}

$(".characterContainer").on("click",function() {

	// Selects Player
	if (!playerSelected) {

		playerSelected = true;

		for (var i = 0; i < characters.length; i++) {

			if (this.id != characters[i].id) {
				$("#selectRow").append(characters[i].$container);
				characters[i].$container.children("img").attr("src",characters[i].imgAlt);
				characters[i].$container.children("h3").text(characters[i].nameAlt);

			}

			else {
				$("#userRow").append(characters[i].$container);
				userPlayer = characters[i];
			}
		}
	}

	// Selects Defender
	else if (!defenderSelected && this.id != userPlayer.id) {
		for (var i = 0; i < characters.length; i++) {

			defenderSelected = true;
			$("#message").html("");

			if (this.id === characters[i].id) {
				$("#defenderRow").append(characters[i].$container);
				defendingEnemy = characters[i];
			}
		}
	}
});

// On Click Events
$("#attack").on("click",battle);
$("#reset").on("click",reset);

// Battle between attacker and defender
function battle() {
	if (playerSelected && defenderSelected) {

		// Attacks the defender
		defendingEnemy.hp-=userPlayer.attackPower;
		$("#message").html("<p>" + userPlayer.name + " did " + userPlayer.attackPower + " damage</p>" );

		// Defender still has hp
		if (defendingEnemy.hp > 0) {
			userPlayer.hp-=defendingEnemy.counterAttack;
			$("#message").append("<p>" + defendingEnemy.nameAlt + " did " + defendingEnemy.counterAttack + " damage in return</p>" );
		}

		// Defender has no hp
		else if (defendingEnemy.hp <= 0) {
			defendingEnemy.$container.hide();
			defenderSelected = false;
			enemiesDefeated++;
			$("#message").html("<p> You have defeated " + defendingEnemy.nameAlt +  "</p>");
		}

		// Player's attack increases
		userPlayer.attackPower+=userPlayer.startingAttack;

		updateDisplay();

	}
}

// Update HP count, messages, containers, etc.
function updateDisplay() {

	// Updates each character's hp
	for (var i = 0; i < characters.length; i++) {
		characters[i].$container.children("p").text(characters[i].hp);
	}

	// Player loses
	if (userPlayer.hp <= 0) {
		$("#attack").hide();
		$("#reset").show();
		$("#message").html("<p> You have been defeated. Game Over </p>");
	}

	// Player wins
	else if (enemiesDefeated === 3) {
		$("#attack").hide();
		$("#reset").show();
		$("#message").html("<p> You Win. Game Over </p>");
	}
}

// Resets the game and its parameters for the next round
function reset () {
	for (var i = 0; i < characters.length; i++) {
		$("#startingRow").append(characters[i].$container);
		characters[i].$container.show();
		characters[i].hp = characters[i].maxHp;
		characters[i].attackPower = characters[i].startingAttack;
		characters[i].$container.children("img").attr("src",characters[i].img);
		characters[i].$container.children("h3").text(characters[i].name);
	}

	playerSelected = false;
	defenderSelected = false;
	enemiesDefeated = 0;

	$("#message").html("");
	$("#reset").hide();
	$("#attack").show();

	updateDisplay();
}