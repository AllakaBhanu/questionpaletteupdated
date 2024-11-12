let timerInterval;
let timeLeftInMinutes = 10; // Duration of exam in minutes
let currentQuestionIndex = 0;
let questions = [
    { id: 1, question: "What is the capital of France?", options: ["Paris", "Berlin", "Madrid", "Rome"], answer: "", status: "not_visited" },
    { id: 2, question: "Who developed the theory of relativity?", options: ["Newton", "Einstein", "Darwin", "Tesla"], answer: "", status: "not_visited" },
    { id: 3, question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "H2"], answer: "", status: "not_visited" },
    { id: 4, question: "What is the largest planet in our solar system?", options: ["Earth", "Jupiter", "Mars", "Saturn"], answer: "", status: "not_visited" },
    { id: 5, question: "What is the capital of Japan?", options: ["Seoul", "Tokyo", "Beijing", "Bangkok"], answer: "", status: "not_visited" },
    { id: 6, question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], answer: "", status: "not_visited" },
    { id: 7, question: "Who is the father of modern physics?", options: ["Einstein", "Newton", "Galileo", "Bohr"], answer: "", status: "not_visited" },
    { id: 8, question: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "", status: "not_visited" },
    { id: 9, question: "What is the formula for water?", options: ["H2O", "H2", "O2", "HO"], answer: "", status: "not_visited" },
    { id: 10, question: "Which planet is closest to the sun?", options: ["Earth", "Venus", "Mercury", "Mars"], answer: "", status: "not_visited" }
];

// Timer function
function startTimer() {
    let totalTimeInSeconds = timeLeftInMinutes * 60;
    timerInterval = setInterval(function() {
        totalTimeInSeconds--;
        let minutes = Math.floor(totalTimeInSeconds / 60);
        let seconds = totalTimeInSeconds % 60;
        document.getElementById('timeLeft').textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        
        if (totalTimeInSeconds <= 0) {
            clearInterval(timerInterval);
            alert("Time is up!");
            submitExam();
        }
    }, 1000);
}

// Load the questions dynamically
function loadQuestions() {
    const questionContainer = document.getElementById('questionContainer');
    const questionPallet = document.getElementById('questionPallet');
    questionContainer.innerHTML = '';  // Clear existing content

    let currentQuestion = questions[currentQuestionIndex];

    // Display the current question
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    const questionText = document.createElement('p');
    questionText.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    questionDiv.appendChild(questionText);

    const optionsDiv = document.createElement('div');
    currentQuestion.options.forEach(option => {
        const radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = `question${currentQuestion.id}`;
        radioButton.value = option;
        radioButton.onclick = () => selectAnswer(option);
        const label = document.createElement('label');
        label.appendChild(radioButton);
        label.appendChild(document.createTextNode(option));
        optionsDiv.appendChild(label);
    });
    questionDiv.appendChild(optionsDiv);
    questionContainer.appendChild(questionDiv);

    // Update the question pallet with the current status
    updateQuestionPallet();
}

// Function to select an answer
function selectAnswer(answer) {
    questions[currentQuestionIndex].answer = answer;
    questions[currentQuestionIndex].status = "answered"; // Update status to answered
    updateQuestionPallet();
}

// Function to update the question palette
function updateQuestionPallet() {
    const questionPallet = document.getElementById('questionPallet');
    questionPallet.innerHTML = ''; // Clear existing pallet

    questions.forEach((question, index) => {
        const palletButton = document.createElement('button');
        palletButton.textContent = index + 1;

        // Change color based on status
        if (question.status === "answered") {
            palletButton.style.backgroundColor = 'green';
        } else if (question.status === "not_visited") {
            palletButton.style.backgroundColor = 'gray';
        } else if (question.status === "skipped") {
            palletButton.style.backgroundColor = 'red';
        }

        palletButton.onclick = function() {
            currentQuestionIndex = index;
            loadQuestions();
        };
        questionPallet.appendChild(palletButton);
    });
}

// Function to go to the next question
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        // If the user skips the question without answering it, mark it as skipped
        if (questions[currentQuestionIndex].status === "not_visited") {
            questions[currentQuestionIndex].status = "skipped";
        }
        currentQuestionIndex++;
        loadQuestions();
    }
}

// Function to go to the previous question
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        // If the user skips the question without answering it, mark it as skipped
        if (questions[currentQuestionIndex].status === "not_visited") {
            questions[currentQuestionIndex].status = "skipped";
        }
        currentQuestionIndex--;
        loadQuestions();
    }
}

// Function to submit the exam
function submitExam() {
    clearInterval(timerInterval);
    alert("Exam submitted!");
    // Optionally, you can send the answers to the server
    console.log(questions);
}

// Initialize the exam page
window.onload = function() {
    startTimer();
    loadQuestions();
};

