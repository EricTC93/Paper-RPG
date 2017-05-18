var crystal0 = {
	name: "star",
	value: 0
};

var crystal1 = {
	name: "chaos",
	value: 0
};

var crystal2 = {
	name: "adamant",
	value: 0
};

var crystal3 = {
	name: "heart",
	value: 0
};

var targetScore;

var userScore;

var crystals = [crystal0, crystal1, crystal2, crystal3];

// console.log(crystals[1]);

startGame();

function startGame() {
	targetScore = Math.floor(Math.random()*102 + 19);
	$("#targetScore").text(targetScore);

	userScore = 0;
	$("#userScore").text(userScore);

	for (var i = 0; i < crystals.length; i++) {
		var rand = Math.floor(Math.random()*12 + 1);
		crystals[i].value = rand;

		for (var j = i-1; j >= 0; j--) {
			if (crystals[i].value === crystals[j].value ) {
				i--;
			}
		}

		console.log(crystals[i]);
	}
}






$(".imgContainer").on("click",function() {
	// console.log(this.id);
	if(this.id === "crystal0") {
		userScore+=crystal0.value;
	}

	else if(this.id === "crystal1") {
		userScore+=crystal1.value;
	}

	else if(this.id === "crystal2") {
		userScore+=crystal2.value;
	}

	else if(this.id === "crystal3") {
		userScore+=crystal3.value;
	}

	console.log(userScore);
	$("#userScore").text(userScore);
});