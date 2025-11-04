const questions = [
    {
      q: "1) What is the legal status of cryptocurrency in China?",
      options: ["Fully legal and supported", "Allowed only for mining", "Completely banned", "Allowed on licensed exchanges"],
      answer: 2,
      explanation: "Since 2021, China has completely banned all crypto trading and mining to protect financial stability."
    },
    {
      q: "2) What project is China developing instead of traditional crypto?",
      options: ["Ethereum", "ChinaChain", "Digital Yuan (e-CNY)", "Binance Coin"],
      answer: 2,
      explanation: "China created its own Central Bank Digital Currency (CBDC) called the digital yuan (e-CNY)."
    },
    {
      q: "3) What measures were applied to crypto mining in China?",
      options: ["Moved to state-owned farms", "Banned and expelled from the country", "Subsidized by government", "Taxed but allowed"],
      answer: 1,
      explanation: "In 2021, mining was banned due to high energy use and environmental concerns. Many miners moved abroad."
    },
    {
      q: "4) Which authority issues the digital yuan?",
      options: ["Ministry of Commerce", "People’s Bank of China (PBOC)", "SEC", "Provincial Governments"],
      answer: 1,
      explanation: "The People’s Bank of China (PBOC) manages and controls all operations of the digital yuan."
    },
    {
      q: "5) What happened to crypto exchanges in China?",
      options: ["They operate freely", "They left the country", "They are provincially regulated", "They became nationalized"],
      answer: 1,
      explanation: "After the 2021 ban, exchanges like Binance and Huobi left China to operate overseas."
    }
  ];
  
  const startBtn = document.getElementById('startBtn');
  const btnStart = document.getElementById('btnStart');
  const btnReset = document.getElementById('btnReset');
  const quizIntro = document.getElementById('quizIntro');
  const questionPanel = document.getElementById('questionPanel');
  const questionText = document.getElementById('questionText');
  const optionsList = document.getElementById('optionsList');
  const qIndexEl = document.getElementById('qIndex');
  const qTotalEl = document.getElementById('qTotal');
  const btnReveal = document.getElementById('btnReveal');
  const btnExplain = document.getElementById('btnExplain');
  const btnNext = document.getElementById('btnNext');
  const resultMsg = document.getElementById('resultMsg');
  const scoreBadge = document.getElementById('scoreBadge');
  const explanationBox = document.getElementById('explanationBox');
  const finalPanel = document.getElementById('finalPanel');
  const finalScoreEl = document.getElementById('finalScore');
  const finalTotalEl = document.getElementById('finalTotal');
  const btnRestart = document.getElementById('btnRestart');
  const btnShowFacts = document.getElementById('btnShowFacts');
  const facts = new bootstrap.Collapse(document.getElementById('facts'), {toggle:false});
  const btnToggleQ = document.getElementById('btnToggleQ');
  
  let order = [];
  let current = 0;
  let score = 0;
  let answered = false;
  
  function shuffle(arr){ return arr.map(v=>({v,sort:Math.random()})).sort((a,b)=>a.sort-b.sort).map(x=>x.v); }
  
  function renderQuestion(idx){
    const q = questions[order[idx]];
    qIndexEl.textContent = idx + 1;
    qTotalEl.textContent = questions.length;
    questionText.textContent = q.q;
    optionsList.innerHTML = '';
    explanationBox.classList.add('d-none');
    explanationBox.innerHTML = '';
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<b>${String.fromCharCode(65+i)}.</b> ${opt}`;
      btn.addEventListener('click', () => checkAnswer(i));
      optionsList.appendChild(btn);
    });
    btnNext.disabled = true;
    btnExplain.disabled = true;
    resultMsg.textContent = '';
    answered = false;
  }
  
  function checkAnswer(index){
    if(answered) return;
    answered = true;
    const q = questions[order[current]];
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);
  
    if(index === q.answer){
      buttons[index].classList.add('correct');
      resultMsg.textContent = "✅ Correct!";
      score++;
      scoreBadge.textContent = score;
    } else {
      buttons[index].classList.add('wrong');
      resultMsg.textContent = "❌ Wrong!";
      buttons[q.answer].classList.add('correct');
    }
    btnNext.disabled = false;
    btnExplain.disabled = false;
  }
  
  btnExplain.addEventListener('click', () => {
    const q = questions[order[current]];
    explanationBox.classList.remove('d-none');
    explanationBox.textContent = q.explanation;
    btnExplain.disabled = true;
  });
  
  btnReveal.addEventListener('click', () => {
    if(answered) return;
    const q = questions[order[current]];
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.disabled = true);
    buttons[q.answer].classList.add('correct');
    resultMsg.textContent = "✅ Revealed";
    answered = true;
    btnNext.disabled = false;
    btnExplain.disabled = false;
  });
  
  btnNext.addEventListener('click', () => {
    current++;
    if(current < questions.length) renderQuestion(current);
    else finishQuiz();
  });
  
  function startQuiz(){
    order = shuffle([...Array(questions.length).keys()]);
    current = 0; score = 0;
    scoreBadge.textContent = 0;
    quizIntro.classList.add('d-none');
    questionPanel.classList.remove('d-none');
    finalPanel.classList.add('d-none');
    renderQuestion(current);
  }
  
  function finishQuiz(){
    questionPanel.classList.add('d-none');
    finalPanel.classList.remove('d-none');
    finalScoreEl.textContent = score;
    finalTotalEl.textContent = questions.length;
  }
  
  btnStart.addEventListener('click', startQuiz);
  startBtn.addEventListener('click', startQuiz);
  btnRestart.addEventListener('click', ()=>location.reload());
  btnReset.addEventListener('click', ()=>location.reload());
  btnShowFacts.addEventListener('click', ()=>facts.toggle());
  btnToggleQ.addEventListener('click', ()=>questionPanel.classList.toggle('d-none'));
  