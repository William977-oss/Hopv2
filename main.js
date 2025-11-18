import { questions } from "./questions.js";

// Initialize HTML variables
const app = document.getElementById("app");
const quizBtn = document.getElementById("quizBtn");
const homeBtn = document.getElementById("homeBtn");

// Initialize variables
let index = parseInt(localStorage.getItem("currentQuestion")) || 0;;
let showAnswer = false;

// Text on homepage
function renderHome() {
    app.innerHTML = `
        <h2>Welcome</h2>
        <p>Press "Quiz" to begin.</p>
    `;
}

function renderQuiz() {
    const q = questions[index];

    // Displays questions and answers
    app.innerHTML = `
        <div class="quiz-container">
        <h2>Question ${index + 1} of ${questions.length}</h2>
        <p>${q.q}</p>

        <button id="toggleAnswer">Show Answer</button>
        <p id="answer" style="display:none; font-weight:bold; margin-top:10px;">${q.a}</p>

        <div class="buttons">
            <button id="prev" ${index === 0 ? "disabled" : ""}>Previous</button>
            <button id="next" ${index === questions.length - 1 ? "disabled" : ""}>Next</button>
        </div>
        </div>
    `;

    // Reset each time
    showAnswer = false;

    // Toggle Answer
    const ans = document.getElementById("answer");
    const tgl = document.getElementById("toggleAnswer");
    tgl.onclick = () => {
        showAnswer = !showAnswer;
        ans.style.display = showAnswer ? "block" : "none";
        tgl.textContent = showAnswer ? "Hide Answer" : "Show Answer";
    };

    // Save new index location
    const changeIndex = (newIndex) => {
        index = newIndex;
        localStorage.setItem("currentQuestion", index);
        renderQuiz();
    };    

    // Navigation
    document.getElementById("prev").onclick = () => changeIndex(index - 1);
    document.getElementById("next").onclick = () => changeIndex(index + 1);
}

// Buttons
quizBtn.onclick = () => { renderQuiz(); };
homeBtn.onclick = renderHome;

// Start on home screen
renderHome();
