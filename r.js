let timeLeft = 600;
let timer;
let currentQuestion = 0;
const questions = [
  { q: "What does HTML stand for?", options: ["Hyper Text Markup Language","High Text Machine Language","Hyperlinks Text Mark Language","Home Tool Markup Language"] },
  { q: "Which language is used for styling web pages?", options: ["HTML","CSS","Java","Python"] },
  { q: "What does CSS stand for?", options: ["Cascading Style Sheets","Creative Style Sheets","Computer Style Sheets","Colorful Style Sheets"] },
  { q: "Which HTML tag is used to define a paragraph?", options: ["<p>","<para>","<h1>","<div>"] },
  { q: "Which language is used for backend development?", options: ["PHP","CSS","HTML","Bootstrap"] },
  { q: "Which symbol is used for comments in HTML?", options: ["<!-- Comment -->","// Comment","/* Comment */","# Comment"] },
  { q: "Which attribute is used to link a CSS file in HTML?", options: ["href","src","link","rel"] },
  { q: "Which tag is used for inserting an image in HTML?", options: ["<img>","<image>","<src>","<picture>"] },
  { q: "What is the correct HTML tag for a line break?", options: ["<br>","<break>","<lb>","<hr>"] },
  { q: "Which HTML tag is used to create a hyperlink?", options: ["<a>","<link>","<href>","<url>"] },
];

let answers = Array(questions.length).fill(null);

function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  if(user && pass){
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("examBox").classList.remove("hidden");
    showQuestion();
    startTimer();
  } else {
    alert("Please enter username and password");
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "Time: " + timeLeft + "s";
    if(timeLeft <= 0){
      clearInterval(timer);
      alert("Time up! Exam submitted.");
      submitExam();
    }
  }, 1000);
}

function showQuestion() {
  const container = document.getElementById("questionContainer");
  const q = questions[currentQuestion];
  let html = `<div class="question"><p>${currentQuestion+1}. ${q.q}</p><div class="options-grid">`;
  q.options.forEach((opt,i)=>{
    let checked = answers[currentQuestion] === i ? "checked" : "";
    html += `<label><input type="radio" name="option" value="${i}" ${checked}> ${opt}</label>`;
  });
  html += `</div></div>`;
  container.innerHTML = html;
  document.getElementById("prevBtn").style.display = currentQuestion === 0 ? "none" : "inline-block";
  document.getElementById("nextBtn").innerText = currentQuestion === questions.length - 1 ? "Submit" : "Save & Next";

  document.querySelectorAll('input[name="option"]').forEach(el => {
    el.addEventListener('change', ()=> {
      answers[currentQuestion] = parseInt(el.value);
    });
  });
}

function nextQuestion() {
  if(currentQuestion === questions.length - 1){
    submitExam();
  } else {
    currentQuestion++;
    showQuestion();
  }
}

function prevQuestion() {
  if(currentQuestion > 0){
    currentQuestion--;
    showQuestion();
  }
}

function submitExam() {
  clearInterval(timer);
  let score = 0;
  const correctAnswers = [0,1,0,0,0,0,3,0,0,0]; 
  answers.forEach((ans,i)=>{
    if(ans === correctAnswers[i]) score++;
  });
  alert("Exam submitted! Your score: "+score+"/"+questions.length);
  logout();
}

function logout() {
  document.getElementById("examBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
  timeLeft = 600;
  currentQuestion = 0;
  answers = Array(questions.length).fill(null);
}
