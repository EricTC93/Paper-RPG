// Declaring Variables
var mario = {
	name:"Mario",

	img: "assets/images/mario.png",
	imgAlt: "assets/images/mario.png",

	$container: $("#char0"),
	id: $("#char0").attr("id"),

	maxHp: 100,
	hp: 100,

	startingAttack: 20,
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

	startingAttack: 15,
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

	startingAttack: 10,
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

	startingAttack: 30,
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

// mario.$container.hide();

// $("#startingRow").append(mario.$container);

// Display players' hp
for (var i = 0; i < characters.length; i++) {
	// $("#char" + i + " > p").text(characters[i].hp);
	characters[i].$container.children("p").text(characters[i].hp);
}

var playerSelected = false;
var defenderSelected = false;
var userPlayer;
var defendingEnemy;

var enemiesDefeated = 0;

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


$("#attack").on("click",battle);
$("#reset").on("click",reset);


function battle() {
	if (playerSelected && defenderSelected) {
		// console.log(userPlayer);
		// console.log(defendingEnemy);

		defendingEnemy.hp-=userPlayer.attackPower;
		$("#message").html("<p>" + userPlayer.name + " did " + userPlayer.attackPower + " damage</p>" );

		if (defendingEnemy.hp > 0) {
			userPlayer.hp-=defendingEnemy.counterAttack;
			$("#message").append("<p>" + defendingEnemy.name + " did " + defendingEnemy.counterAttack + " damage in return</p>" );
		}

		userPlayer.attackPower+=10;

		updateDisplay();

	}
}

function updateDisplay() {
	// userPlayer.$container.children("p").text(userPlayer.hp);
	// defendingEnemy.$container.children("p").text(defendingEnemy.hp);

	for (var i = 0; i < characters.length; i++) {
		characters[i].$container.children("p").text(characters[i].hp);
	}

	if (userPlayer.hp <= 0) {
		$("#attack").hide();
		$("#reset").show();
		$("#message").html("<p> You have been defeated. Game Over </p>");
	}

	else if (defendingEnemy.hp <= 0) {
		defendingEnemy.$container.hide();
		defenderSelected = false;
		enemiesDefeated++;
		$("#message").html("<p> You have defeated " + defendingEnemy.name +  "</p>");
	}

	if (enemiesDefeated === 3) {
		$("#attack").hide();
		$("#reset").show();
		$("#message").html("<p> You Win. Game Over </p>");
	}
}

function reset () {
	for (var i = 0; i < characters.length; i++) {
		$("#startingRow").append(characters[i].$container);
		characters[i].$container.show();
		characters[i].hp = characters[i].maxHp;
		characters[i].attackPower = characters[i].startingAttack;
	}

	playerSelected = false;
	defenderSelected = false;
	enemiesDefeated = 0;

	$("#message").html("");
	$("#reset").hide();
	$("#attack").show();

	updateDisplay();
}