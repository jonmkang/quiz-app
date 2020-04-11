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

//This function removes previous question number label and adds a new one for each question
function printQuestionNumber(number){
    $('.question-number').remove();
    $('main').prepend(`<p class="question-number">Question ${number}</p>`);
};

//This function adds the number of questions correctly answered out of total questions answered
function printTotalCorrect(questionNumber, numberCorrect){
    if(questionNumber != 0){
    $('.total-correct').remove();
    $('main').prepend(`<p class="total-correct">${numberCorrect} correct out of ${questionNumber}`);
    };
};

//This function loads the current question at index from the array given
function loadQuestion(currentQuestion){
    printQuestion(produceQuestion()[currentQuestion].question);
};

//This function adds HTML code to the quiz-box 
function printQuestion(question){
    $('.quiz-box').append(`<div class="question-box"></div>`);
    $('.question-box').append(generateQuestionText(question));
};

//This function creates an element for a given question
function generateQuestionText(questionToPrint){
    return `<div class="question">${questionToPrint}</div>`;
};

//This function loads the current questions choices to print
function loadChoices(currentQuestion){
    printChoices(produceQuestion()[currentQuestion].choices);
};

//This function adds a form and the questions choices to the HTML doc
function printChoices(choices){
    $('.quiz-box').append(`<form action="submit" class='js-choices'></form>`)
    $('.js-choices').append(generateChoicesText(choices));
};

//This function iterates thru the choices array given and returns radio buttons for each choice.
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

//This function checks if a radio button is checked, submits the value, and allows the user to progess to the next question.
function submitAnswer(answered, number, numCorrect){
    createSubmitButton();
    highlightChoice();
    $('.quiz-box').on("click", ".submit-answer", function(event){
        event.preventDefault();
        if($("input[name='choice']:checked").val()){
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

//This function creates a submit button
function createSubmitButton(){
    $('.js-choices').append(`<button type="submit" class="submit-answer">Submit answer</button>`);
};

//This function clears the quiz-box container
function clearQuizBox(){
    $('.quiz-box').empty();
};

//This question returns the answer of the question index given
function loadAnswer(questionIndex){
    return produceQuestion()[questionIndex].answer;
};

//This function checks if the answer given matches the answer key.
function checkAnswer(userAnswer, answerKey){
    if(userAnswer == answerKey){
        return 1;
    } else {
        return 0;
    }
}

//This function provides the correct answer and prints a sorry statement because the answer given was incorrect.
function ifIncorrect(correctAns){
    clearQuizBox();
    $('.quiz-box').append(`<div class="question-box"></div>`);
    $('.question-box').append(`<div class="correctAnswer">Sorry! ${correctAns} is the correct answer</div>`)
    nextQuestionButton();
}

//This function congratulates the user on submitting a correct answer and prints the correct answer.
function ifCorrect(correctAns){
    clearQuizBox();
    $('.quiz-box').append(`<div class="question-box"></div>`);
    $('.question-box').append(`<div class="correctAnswer">You chose ${correctAns} and it is the correct answer!</div><br>`);
    nextQuestionButton();
}

//This function creates a button allowing the user to progess to the next question.
function nextQuestionButton(){
    $('.quiz-box').append(`<button type="button" class="next-question">Next question</button>`);
};

//This function highlights the selected choice by the user.
function highlightChoice(){
    $(".choice").click(function(event){
        $('.choice').removeClass("choice-selected");
        $(this).addClass("choice-selected");
    });
};

//This function clears the question number and total answered, prints a statement showing the user how many they got correct, and allows the user to try again.
function printResults(questionsAnswered, questionNumber, numberCorrect){
    $('.question-number').remove();
    $('.total-correct').remove();
    $('.quiz-box').append(`<div class="question">Congratulations! You got ${numberCorrect} out of ${questionsAnswered}.
    Would you like to try again?</div><br>`);
    restartButton();
};

//This function creates a button to start the quiz over.
function restartButton(){
    $('.quiz-box').append(`<button type="button" class="restartButton">Let me try again!</button>`);
    $('.quiz-box').on('click', ".restartButton", function(event){
        $('.quiz-box').empty();
        startQuiz();
    });
};

$(startButton);