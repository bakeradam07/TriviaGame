$(document).ready(function() {



    

    // array with questions and answers
    var questions = [{
        question: "What type of farm does Dwight own?",
        choice: ["Bear Farm", "Carrot Farm", "Beet Farm", "Beetle Farm",],
        answer: 2,
        pic: "assets/images/beetfarm.jpg",
    },
    {
        question: "Which of Angela's cats does Dwight freeze?",
        choice: ["Sprinkles", "Sparkles", "Bandit", "Fluffy"],
        answer: 0,
        pic: "assets/images/angelacat.jpg",
    },
    {
        question: "What tattoo is Andy forced to get?",
        choice: ["A Wolf", "A Nard Dog", "A Naked Man", "Cornell Logo"],
        answer: 1,
        pic: "assets/images/andytatoo.jpg",
    },
    {
        question: "Which office employee did Michael hit with his car?",
        choice: ["Meredith", "Oscar", "Pam", "Stanley"],
        answer: 0,
        pic: "assets/images/michaelcarhit.jpg",
    },
    {
        question: "Who started the fire?",
        choice: ["Michael", "Jim", "Dwight", "Angela"],
        answer: 2,
        pic: "assets/images/dwightfire.jpg"
    },
    {
        question: "In the pilot episode, who started their first day?",
        choice: ["Creed", "Jim", "Ryan", "Roy"],
        answer: 2,
        pic: "assets/images/firstday.jpg"
    },
    {
        question: "Who does Toby have a major crush on in the series?",
        choice: ["Phyllis", "Pam", "Kelly", "Angela"],
        answer: 1,
        pic: "assets/images/toby.jpg"
    },
    {
        question: "What is Michael's username for the online dating website?",
        choice: ["Ready for Marriage", "Kid Crazy", "Looking for Women", "Little Kid Lover"],
        answer: 3,
        pic: "assets/images/datingservice.jpg"
    }];


    var intervalId;
    var timer = 15;
    var qCount = questions.length;
    var userGuess = "";
    var running = false;
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var pick;
    var index;
    var newArray = [];
    var holder = [];

    $("#reset").hide();

    $("#start").on("click", function() {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < questions.length; i++) {
            holder.push(questions[i]);
        }
    })

    function runTimer() {
        if(!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }


    function decrement() {
        $("#timeLeft").html("<h3>Time Remaining: " + timer + "</h3>");
        timer --;


        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerBlock").html("<p>Out of time! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidePicture();
        }
    }


    function stop() {
        running = false;
        clearInterval(intervalId);
    }


    function displayQuestion() {

        index = Math.floor(Math.random()*questions.length);
        pick = questions[index];



        $("#questionBlock").html("<h2>" + pick.question + "</h2>");

        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerChoice");
            userChoice.html(pick.choice[i]);


            userChoice.attr("data-guessvalue", i);
            $("#answerBlock").append(userChoice);

        }
    


    $(".answerChoice").on("click", function() {

        userGuess = parseInt($(this).attr("data-guessvalue"));


        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess = "";
            $("#answerBlock").html("<p>Correct!</p>");
            hidePicture();
            // displayQuestion();

        } else {
            stop();
            wrongCount++;
            userGuess = "";
            $("#answerBlock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidePicture();
            // displayQuestion();
        }
    })
}

    function hidePicture() {
        $("#answerBlock").append("<img src =" + pick.pic + ">");
        newArray.push(pick);
        questions.splice(index, 1);


        var hidePic = setTimeout(function() {
            $("#answerBlock").empty();
            timer = 15;


            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionBlock").empty();
		        $("#questionBlock").html("<h3>Game Over!  Here's how you did: </h3>");
		        $("#answerBlock").append("<h4> Correct: " + correctCount + "</h4>" );
		        $("#answerBlock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		        $("#answerBlock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		        $("#reset").show();
		        correctCount = 0;
		        wrongCount = 0;
		        unanswerCount = 0;
            } else {
                runTimer();
                displayQuestion();

            }
        
        }, 2000);
    }




    $("#reset").on("click", function() {
        $("#reset").hide();
	    $("#answerBlock").empty();
	    $("#questionBlock").empty();
	    for(var i = 0; i < holder.length; i++) {
		questions.push(holder[i]);
	}
	    runTimer();
	    displayQuestion();
    })


})