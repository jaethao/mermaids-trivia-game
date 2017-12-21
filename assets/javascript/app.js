$(document).ready(function(){

  var triviaQuestions = [{
  	question: "One of the earliest mermaid legends came from?",
  	answerList: ["Syria", "Egypt", "Iceland", "China"],
  	answer: 0
  },{
  	question: "What coffee shop/brand uses a mermaid as their logo?",
  	answerList: ["Caribou", "Birch", "Starbucks", "Dunn Brothers"],
  	answer: 2
  },{
  	question: "Sailors once mistook what animal as mermaids?",
  	answerList: ["Whale", "Shark", "Dolphin", "Manatee"],
  	answer: 3
  },{
  	question: "In ancient time, mermaids were known as?",
  	answerList: ["Sea Cows", "Sirens", "Sea Monsters", "Water Angels"],
  	answer: 1
  },{
  	question: "What power does the mermaid not possess?",
  	answerList: ["Telepathy", "Immortality", "X-ray vision", "Hypnosis"],
  	answer: 2
  },{
  	question: "Auquamarine, the gemstone is believed to be from mermaids __?",
  	answerList: ["Tears", "Songs", "Eyes", "Scales"],
  	answer: 0
  },{
  	question: "According to ancient folklores, a kiss from a mermaid gives you the ability to __?",
  	answerList: ["Swim", "Sing", "Breathe underwater", "Read mind"],
  	answer: 2
  },{
  	question: "The color of the mermaids tails depict her __?",
  	answerList: ["Relationship Status", "Race", "Age", "Mood"],
  	answer: 3
  }];


  var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
  var messages = {
  	correct: "Yes, that's right!",
  	incorrect: "No, that's not it.",
  	endTime: "Out of time!",
  	finished: "Alright! Let's see how well you did."
  }

  $('#startBtn').on('click', function(){
  	$(this).hide();
  	newGame();
  });

  $('#startOverBtn').on('click', function(){
  	$(this).hide();
  	newGame();
  });

  function newGame(){
  	$('#finalMessage').empty();
  	$('#correctAnswers').empty();
  	$('#incorrectAnswers').empty();
  	$('#unanswered').empty();
    $('#images').empty();
  	currentQuestion = 0;
  	correctAnswer = 0;
  	incorrectAnswer = 0;
  	unanswered = 0;
  	newQuestion();
  }

  function newQuestion(){
  	$('#message').empty();
  	$('#correctedAnswer').empty();
  	$('#images').empty();
  	answered = true;

  	//sets up new questions & answerList
  	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
  	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
  	for(var i = 0; i < 4; i++){
  		var choices = $('<div>');
  		choices.text(triviaQuestions[currentQuestion].answerList[i]);
  		choices.attr({'data-index': i });
  		choices.addClass('thisChoice');
  		$('.answerList').append(choices);
      $('#images').empty();
  	}
  	countdown();
  	//clicking an answer will pause the time and setup answerPage
  	$('.thisChoice').on('click',function(){
  		userSelect = $(this).data('index');
  		clearInterval(time);
  		answerPage();
  	});
  }

  function countdown(){
  	seconds = 15;
  	$('#timeLeft').html('<h2>Time Remaining: ' + seconds + '</h2>');
  	answered = true;
  	//sets timer to go down
  	time = setInterval(showCountdown, 1000);
  }

  function showCountdown(){
  	seconds--;
  	$('#timeLeft').html('<h2>Time Remaining: ' + seconds + '</h2>');
  	if(seconds < 1){
  		clearInterval(time);
  		answered = false;
  		answerPage();
  	}
  }

  function answerPage(){
  	$('#currentQuestion').empty();
  	$('.thisChoice').empty(); //Clears question page
  	$('.question').empty();


  	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
  	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

  	//checks to see correct, incorrect, or unanswered
  	if((userSelect == rightAnswerIndex) && (answered == true)){
  		correctAnswer++;
  		$('#message').html(messages.correct);
      $('#images').html('<img src="assets/images/correct.jpg"/>');
  	} else if((userSelect != rightAnswerIndex) && (answered == true)){
  		incorrectAnswer++;
  		$('#message').html(messages.incorrect);
  		$('#correctedAnswer').html('<h4>The correct answer was: ' + rightAnswerText + '</h4>');
      $('#images').html('<img src="assets/images/wrong.jpg"/>');
  	} else{
  		unanswered++;
  		$('#message').html(messages.endTime);
  		$('#correctedAnswer').html('<h4>The correct answer was: ' + rightAnswerText + '</h4>');
  		answered = true;
  	}

  	if(currentQuestion == (triviaQuestions.length-1)){
  		setTimeout(scoreboard, 5000)
  	} else{
  		currentQuestion++;
  		setTimeout(newQuestion, 5000);
  	}
  };

  function scoreboard(){
  	$('#timeLeft').empty();
  	$('#message').empty();
  	$('#correctedAnswer').empty();
  	$('#images').empty();

  	$('#finalMessage').html(messages.finished);
  	$('#correctAnswers').html("<h4>Correct Answers:" + correctAnswer + "</h4>");
  	$('#incorrectAnswers').html("<h4>Incorrect Answers: " + incorrectAnswer + "</h4>");
  	$('#unanswered').html("<h4>Unanswered:" + unanswered + "</h4>");
  	$('#startOverBtn').addClass('reset');
  	$('#startOverBtn').show();
  	$('#startOverBtn').html('Start Over?');
  }





});
