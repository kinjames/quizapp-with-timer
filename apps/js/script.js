const startBtn = document.querySelector(".start-btn button");
const infoBox= document.querySelector(".info-box");
const exitBtn = infoBox.querySelector(".btns .quit");
const continueBtn = infoBox.querySelector(".btns .restart");
const quizBox = document.querySelector(".quiz-section");
const timeCounter = quizBox.querySelector(".timer .timer-sec");
const timeOff = quizBox.querySelector(".timer .timer-text");
const timeLine = document.querySelector("header .time-line")
const timeLineMobile = document.querySelector("header .time-line-mobile")

const optionList = document.querySelector(".option-list");

//Start Btn
startBtn.addEventListener('click', function(){
    infoBox.classList.add("activeInfo")
})

//Exit Btn
exitBtn.addEventListener('click', function(){
    infoBox.classList.remove("activeInfo")
})

//Continue Button When CLicked
continueBtn.addEventListener('click', function(){
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestions(0);
    questionCounter(1);
    startTimer(15);
    startTimerLine(0)
    startTimerLineMobile(0)
})


let questionCount = 0;
let bottomQuestionCounter = 1;
let timerCount;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let widthValueMobile = 0;
let userScore = 0;


const nextBtn = quizBox.querySelector('.next-btn');
const resultBox = document.querySelector(".result-box");
const restartQuiz = resultBox.querySelector(".btns .restart");
const quitQuiz = resultBox.querySelector(".btns .quit");

restartQuiz.onclick = () =>{
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    timeValue = 15;
    questionCount = 0;
    bottomQuestionCounter = 1;
    userScore = 0;
    widthValue = 0;
    widthValueMobile = 0;

    showQuestions(questionCount);
    questionCounter(bottomQuestionCounter);
    clearInterval(timerCount);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    clearInterval(counterLineMobile);
    startTimerLineMobile(widthValueMobile);
    nextBtn.style.display = "none";
    timeOff.textContent= "Time Left";

   
}

quitQuiz.onclick = () =>{
    window.location.reload();
}

nextBtn.addEventListener('click', function(){
    if (questionCount < questions.length - 1){
        questionCount++;
        bottomQuestionCounter++;
        showQuestions(questionCount);
        questionCounter(bottomQuestionCounter);
        clearInterval(timerCount);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        clearInterval(counterLineMobile);
        startTimerLineMobile(widthValueMobile);
        nextBtn.style.display = "none";
        timeOff.textContent="Time Left"
    } else {
        clearInterval(timerCount);
        clearInterval(counterLine);
        clearInterval(counterLineMobile);
        console.log("Completed")
        showResultBox();
    }
})


//Question and Options

function showQuestions(index){
    const questionText = document.querySelector(".question");
    let questionTag = '<span>'+ questions[index].num + ". " + questions[index].question +'</span>'

    let optionTag = '<div class="option flex flex-ai-c flex-jc-sb b-rad">'+ questions[index].options[0] + '<span></span></div>'
                    + '<div class="option flex flex-ai-c flex-jc-sb b-rad">' + questions[index].options[1] + '<span></span></div>'
                    + '<div class="option flex flex-ai-c flex-jc-sb b-rad">' + questions[index].options[2] + '<span></span></div>'
                    + '<div class="option flex flex-ai-c flex-jc-sb b-rad">' + questions[index].options[3] + '<span></span></div>'
    questionText.innerHTML = questionTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length ; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

//When Option is selected
let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>'
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>'

function optionSelected(answer){
    clearInterval(timerCount)
    clearInterval(counterLine)
    clearInterval(counterLineMobile)
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer){
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeend", tickIcon);
    } else {
        answer.classList.add("incorrect");
        console.log("Answer is wrong");
        answer.insertAdjacentHTML("beforeend", crossIcon);

        //show correct answer after wrong answer is selected

        for (let i = 0; i < allOptions; i++){
            if(optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute("class", "option correct flex flex-ai-c flex-jc-sb");
                optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
            }
        }
    }

    //disable options once one is selected

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add("disabled")
        
    }

    nextBtn.style.display = "block";

}



function showResultBox(){
    infoBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");

    const scoreText = resultBox.querySelector(".score");

    if (userScore > 10) {
        let scoreTag = '<span class="flex">and Congrats You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span class="flex">and sorry You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }

    // const totalText = resultBox.querySelector("");
}



function startTimer(time){
    timerCount = setInterval(timer, 1000);
    function timer(){
        timeCounter.textContent = time;
        time--;
        if (time < 9){
            let addZero = timeCounter.textContent;
            timeCounter.textContent = "0" + addZero
        }

        if (time < 0){
            clearInterval(timerCount)
            timeCounter.textContent = "00";
            timeOff.textContent= "Time Out"

            let correctAnswer = questions[questionCount].answer;
            let allOptions = optionList.children.length;

            for (let i = 0; i < allOptions; i++){
                if(optionList.children[i].textContent == correctAnswer){
                    optionList.children[i].setAttribute("class", "option correct flex flex-ai-c flex-jc-sb");
                    optionList.children[i].insertAdjacentHTML("beforeend", tickIcon);
                }
            }

            for (let i = 0; i < allOptions; i++) {
                optionList.children[i].classList.add("disabled")
                
            }
        
            nextBtn.style.display = "block";
        }
    }
}


function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width = time + "px"
        if (time > 549){
            clearInterval(counterLine)
        }
    }
}

function startTimerLineMobile(time){
    counterLineMobile = setInterval(timer, 32.5);
    function timer(){
        time += 1;
        timeLineMobile.style.width = time + "px"
        if (time > 375){
            clearInterval(counterLineMobile)
        }
    }
}






//Bottom Counter
function questionCounter(index){
    const bottomCounter = quizBox.querySelector('.total');
    let totalQuestionTag = '<span class="flex user-select"><p>'+ index + '</p>of<p>' + questions.length +'</p>Questions</span>';
    bottomCounter.innerHTML = totalQuestionTag;
}