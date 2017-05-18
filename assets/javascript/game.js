var crystal0 = {
	value: 7
};

var crystal1 = {
	value: 2
};

var crystal2 = {
	value: 6
};

var crystal3 = {
	value: 3
};

var targetScore;

var userScore;


startGame();

function startGame() {
	targetScore = Math.floor(Math.random()*102 + 19);
	$("#targetScore").text(targetScore);

	userScore = 0;
	$("#userScore").text(userScore);
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