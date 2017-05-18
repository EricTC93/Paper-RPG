var targetScore;
var userScore = 0;


$(".imgContainer").on("click",function() {
	// console.log(this.id);
	if(this.id === "crystal0") {
		userScore+=1;
	}

	else if(this.id === "crystal1") {
		userScore+=2;
	}

	else if(this.id === "crystal2") {
		userScore+=3;
	}

	else if(this.id === "crystal3") {
		userScore+=4;
	}

	console.log(userScore);
});