// Declaring Variables
var mario = {
	name:"Mario",
	type:"player",

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
	type:"player",

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
	type:"enemy",

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

var enemiesLeft;

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
				enemiesLeft = scene.length - 1;
			}
		}
	}

	// Selects Defender
	else if (this.id != userPlayer.id) {
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

		defendingEnemy.hp-=userPlayer.attackPower;
		$("#message").html("<p>" + userPlayer.name + " did " + userPlayer.attackPower + " damage</p>" );

		if (defendingEnemy.hp <= 0) {
			defendingEnemy.$container.hide();
			enemiesLeft--;
			$("#message").html("<p> You have defeated " + defendingEnemy.name +  "</p>");
		}

		updateDisplay();

		enemyTurn();

		defenderSelected = false;
		
	}
}

function enemyTurn() {

	for( var i = 0; i < enemies.length; i++) {

		if (enemies[i].hp > 0) {
			userPlayer.hp-=enemies[i].attackPower;
			$("#message").append("<p>" + enemies[i].name + " did " + defendingEnemy.attackPower + " damage</p>" );
		}	
	}

	updateDisplay();
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

	else if (enemiesLeft === 0) {
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

	for (var i = 0; i < 3; i++) {

		enemies[i].name = goomba.name;
		enemies[i].hp = goomba.hp;
		enemies[i].attackPower = goomba.attackPower;
		enemies[i].img = goomba.img;

		enemies[i].$container.children("h3").text(enemies[i].name);
		enemies[i].$container.children("img").attr("src",enemies[i].img);
		enemies[i].$container.children("p").text(enemies[i].hp);
		enemies[i].$container.show();

		scene.push(enemies[i]);
	}

	updateDisplay();

}