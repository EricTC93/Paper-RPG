// Declaring Variables
var mario = {
	name:"Mario",

	img: "assets/images/mario.png",
	imgAlt: "assets/images/marioAlt.png",

	$container: $("#char0"),
	id: $("#char0").attr("id"),

	maxHp: 10,
	hp: 10,

	startingAttack: 1,
	attackPower: 1
};

var luigi = {
	name:"Luigi",

	img: "assets/images/luigi.png",
	imgAlt: "assets/images/luigiAlt.png",

	$container: $("#char1"),
	id: $("#char1").attr("id"),

	maxHp: 10,
	hp: 10,

	startingAttack: 1,
	attackPower: 1
};

var enemy0 = {
	name:"",

	img: "",

	$container: $("#enemy0"),
	id: $("#enemy0").attr("id"),

	maxHp: 0,
	hp: 0,

	startingAttack: 0,
	attackPower: 0
};

var enemy1 = {
	name:"",

	img: "",

	$container: $("#enemy1"),
	id: $("#enemy1").attr("id"),

	maxHp: 0,
	hp: 0,

	startingAttack: 0,
	attackPower: 0
};

var enemy2 = {
	name:"",

	img: "",

	$container: $("#enemy2"),
	id: $("#enemy2").attr("id"),

	maxHp: 0,
	hp: 0,

	startingAttack: 0,
	attackPower: 0
};


var goomba = {
	name:"Goomba",

	img: "assets/images/goomba.png",

	maxHp: 2,
	hp: 2,

	startingAttack: 1,
	attackPower: 1
};

var characters = [mario,luigi];
var enemyList = [goomba];
var enemies = [enemy0,enemy1,enemy2];
var scene = [];

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

	if (!playerSelected) {

		playerSelected = true;

		for (var i = 0; i < characters.length; i++) {

			if (this.id != characters[i].id) {

				characters[i].$container.hide();

			}

			else {
				$("#userRow").append(characters[i].$container);
				userPlayer = characters[i];
				scene.push(userPlayer);
				setEnemies();
				scene.push(enemy0);
			}
		}
	}

	// Selects Defender
	else if (!defenderSelected && this.id != userPlayer.id) {
		for (var i = 0; i < enemies.length; i++) {

			defenderSelected = true;
			$("#message").html("");

			if (this.id === enemies[i].id) {
				defendingEnemy = enemies[i];
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
			userPlayer.hp-=defendingEnemy.attackPower;
			$("#message").append("<p>" + defendingEnemy.name + " did " + defendingEnemy.attackPower + " damage in return</p>" );
		}

		defenderSelected = false;
		updateDisplay();

	}
}

function updateDisplay() {

	for (var i = 0; i < scene.length; i++) {
		scene[i].$container.children("p").text(scene[i].hp);
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

	if (enemiesDefeated === 1) {
		$("#attack").hide();
		$("#reset").show();
		$("#message").html("<p> You win the round </p>");
	}
}

function reset () {
	// for (var i = 0; i < characters.length; i++) {
	// 	$("#startingRow").append(characters[i].$container);
	// 	characters[i].$container.show();
	// 	characters[i].hp = characters[i].maxHp;
	// 	characters[i].attackPower = characters[i].startingAttack;
	// 	characters[i].$container.children("img").attr("src",characters[i].img);
	// }

	// playerSelected = false;
	// defenderSelected = false;
	// enemiesDefeated = 0;

	// $("#message").html("");
	// $("#reset").hide();
	// $("#attack").show();

	// updateDisplay();
}

function setEnemies () {
	enemy0.name = goomba.name;
	enemy0.hp = goomba.hp;
	enemy0.attackPower = goomba.attackPower;
	enemy0.img = goomba.img;

	enemy0.$container.children("h3").text(enemy0.name);
	enemy0.$container.children("img").attr("src",enemy0.img);
	enemy0.$container.children("p").text(enemy0.hp);
	enemy0.$container.show();

}