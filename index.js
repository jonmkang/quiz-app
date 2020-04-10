'use strict'

//This function returns an array of questions, choices, and answers.
function produceQuestion() {
    const questionsAndAnswers = [
        {question: "What is my favorite type of food?", 
        choices: ["Korean BBQ", "Steak", "Pho", "Donuts"], 
        answer: "Korean BBQ"},
        {question: "What university did I attend?",
        choices: ["Michigan State University", "NYU", "Boston College", "University of Michigan"],
        answer: "University of Michigan"},
        {question: "What was my last occupation?",
        choices: ["Assistant Manager", "Bartender", "Busser", "Accountant"],
        answer: "Bartender"},
        {question: "What is my favorite hobby?",
        choices: ["Tennis", "Video Games", "Rock Climbing", "Cooking"],
        answer: "Rock Climbing"},
        {question: "What is my favorite drink?",
        choices: ["Coffee", "Beer", "Whiskey", "Tea"],
        answer: "Coffee"}];

    return questionsAndAnswers;
};

//This function begins the quiz when the start quiz button is clicked
function startButton(){
    $('.js-startQuiz').click(function(event){
        event.preventDefault();
        $(this).hide();
        startQuiz();
    });
};

//This function intiates the quiz function and stops at the end of questions array length.
function startQuiz(questionsAnswered = 0, questionNumber = 1, numberCorrect = 0){

    if(questionsAnswered < produceQuestion().length){
        printQuestionNumber(questionNumber);
        printTotalCorrect(questionsAnswered, numberCorrect)
        loadQuestion(questionsAnswered);
        loadChoices(questionsAnswered);
        if($('.quiz-box').find('.radio-button').val()){
            submitAnswer(questionsAnswered, questionNumber, numberCorrect);
        };
    } else{
        printResults(questionsAnswered, questionNumber, numberCorrect);
    }
};

function printQuestionNumber(number){
    $('.question-number').remove();
    $('main').prepend(`<p class="question-number">Question ${number}</p>`);
};

function printTotalCorrect(questionNumber, numberCorrect){
    if(questionNumber != 0){
    $('.total-correct').remove();
    $('main').prepend(`<p class="total-correct">${numberCorrect} correct out of ${questionNumber}`);
    };
};

function loadQuestion(currentQuestion){
    const questionProduced = produceQuestion();
    printQuestion(questionProduced[currentQuestion].question);
};

function printQuestion(question){
    const questionText = generateQuestionText(question);
    $('.quiz-box').append(`<div class="question-box"></div>`);
    $('.question-box').append(questionText);
};

function generateQuestionText(questionToPrint){
    return `<div class="question">${questionToPrint}</div>`;
};

function loadChoices(currentQuestion){
    const choicesProduced = produceQuestion();
    printChoices(choicesProduced[currentQuestion].choices);
};

function printChoices(choices){
    const choicesText = generateChoicesText(choices);
    $('.quiz-box').append(`<form action="submit" class='js-choices'></form>`)
    $('.js-choices').append(choicesText);
};

function generateChoicesText(choicesToPrint){
    let choices = [];
    let i = 0;
    while(i < choicesToPrint.length){
        let currentChoice = choicesToPrint[i];
        let radioChoice = `<label class="choice"><input type="radio" name="choice" class="radio-button" value="${currentChoice}">${currentChoice}</label><br>`;
        choices.push(radioChoice);
        i++;
    };
    return choices;
};

function submitAnswer(answered, number, numCorrect){
    createSubmitButton();
    highlightChoice();
        $('.quiz-box').on("click", ".submit-answer", function(event){
            event.preventDefault();
            if($("input[name='choice']:checked").val()){
                // console.log(checkAnswer($("input[name='choice']:checked").val(), loadAnswer(answered)));
                if(checkAnswer($("input[name='choice']:checked").val(), loadAnswer(answered))){
                    ifCorrect(loadAnswer(answered));
                    numCorrect ++;
                } else{
                    ifIncorrect(loadAnswer(answered));
                }
                answered ++;
                number ++;
                
                
                $('.quiz-box').on("click", ".next-question", function(event){
                    clearQuizBox();
                    startQuiz(answered, number, numCorrect);
                });
                
            };
        });

};

function createSubmitButton(){
    $('.js-choices').append(`<button type="submit" class="submit-answer">Submit answer</button>`);
};

function clearQuizBox(){
    $('.quiz-box').empty();
};


function loadAnswer(questionIndex){
    return produceQuestion()[questionIndex].answer;
};

function checkAnswer(userAnswer, answerKey){
    if(userAnswer == answerKey){
        console.log(userAnswer);
        console.log(answerKey);
        return 1;
    } else {
        return 0;
    }
}

function ifIncorrect(correctAns){
    clearQuizBox();
    $('.quiz-box').append(`<div class="question-box"></div>`);
    $('.question-box').append(`<div class="correctAnswer">Sorry! ${correctAns} is the correct answer</div>`)
    nextQuestionButton();
}

function ifCorrect(correctAns){
    clearQuizBox();
    $('.quiz-box').append(`<div class="question-box"></div>`);
    $('.question-box').append(`<div class="correctAnswer">You chose ${correctAns} and it is the correct answer!</div><br>`);
    nextQuestionButton();
}

function nextQuestionButton(){
    $('.quiz-box').append(`<button type="button" class="next-question">Next question</button>`);
};

function highlightChoice(){
    $(".choice").click(function(event){
        $('.choice').removeClass("choice-selected");
        $(this).addClass("choice-selected");
    });
};

function printResults(questionsAnswered, questionNumber, numberCorrect){
    $('.question-number').remove();
    $('.total-correct').remove();
    $('.quiz-box').append(`<div class="question">Congratulations! You got ${numberCorrect} out of ${questionsAnswered}.
    Would you like to try again?</div><br>`);
    restartButton();
};

function restartButton(){
    $('.quiz-box').append(`<button type="button" class="restartButton">Let me try again!</button>`);
    $('.quiz-box').on('click', ".restartButton", function(event){
        $('.quiz-box').empty();
        startQuiz();
    });
};

$(startButton);