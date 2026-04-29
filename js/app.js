/* ══════════════════════════════════════════════
   STATE══════════════════════════════════════════════ */
let currentStep = 0;
let currentView = 'hero';
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let chatHistory = [];

/* ══════════════════════════════════════════════
   VIEW MANAGEMENT
══════════════════════════════════════════════ */
function showView(view) {
  currentView = view;
  document.getElementById('hero-view').style.display = view === 'hero' ? 'flex' : 'none';
  const mainEl = document.getElementById('main-view');
  mainEl.classList.toggle('active', view === 'main');
  const quizEl = document.getElementById('quiz-view');
  quizEl.classList.toggle('active', view === 'quiz');
  const glossEl = document.getElementById('glossary-view');
  glossEl.classList.toggle('active', view === 'glossary');

  document.querySelectorAll('.nav-tab').forEach((t, i) => {
    t.classList.toggle('active', ['main','quiz','glossary'][i] === view);
  });

  if (view === 'main' && !document.getElementById('stepsContainer').children.length) {
    buildTimeline();
    renderStep(0);
  }
  if (view === 'quiz') renderQuiz();
  if (view === 'glossary') renderGlossary();
}

/* ══════════════════════════════════════════════
   TIMELINE
══════════════════════════════════════════════ */
function buildTimeline() {
  const c = document.getElementById('stepsContainer');
  c.innerHTML = '';
  STEPS.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'step-item' + (i === 0 ? ' active' : '');
    div.id = 'step-' + i;
    div.onclick = () => renderStep(i);
    div.innerHTML = `
      <div class="step-circle ${i === 0 ? 'active' : 'upcoming'}">${s.emoji}</div>
      <div class="step-info">
        <div class="step-name">${s.name}</div>
        <div class="step-meta">${s.meta}</div>
        <span class="step-tag tag-${s.tag}">${s.tagLabel}</span>
      </div>
    `;
    c.appendChild(div);
  });
}

function renderStep(idx) {
  currentStep = idx;
  const s = STEPS[idx];

  // Update step items
  document.querySelectorAll('.step-item').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
    el.classList.toggle('done', i < idx);
    const circle = el.querySelector('.step-circle');
    circle.className = 'step-circle ' + (i < idx ? 'done' : i === idx ? 'active' : 'upcoming');
  });

  // Progress
  const pct = Math.round(((idx + 1) / STEPS.length) * 100);
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('progressLabel').textContent = `Step ${idx + 1} of ${STEPS.length}`;

  // Detail card
  document.getElementById('detailNum').textContent = `STEP ${String(idx + 1).padStart(2, '0')}`;
  document.getElementById('detailTitle').textContent = s.title;
  document.getElementById('detailSub').textContent = s.subtitle;

  let html = '';
  s.sections.forEach(sec => {
    html += `<div class="detail-section">
      <div class="detail-section-title">${sec.title}</div>
      <ul class="detail-list">${sec.items.map(it => `<li>${it}</li>`).join('')}</ul>
    </div>`;
  });
  html += `<div class="detail-section">
    <div class="detail-section-title">Key Terms</div>
    <div class="detail-chips">${s.chips.map(c => `<span class="chip">${c}</span>`).join('')}</div>
  </div>`;

  const content = document.getElementById('detailContent');
  content.innerHTML = html;
  content.classList.remove('animate-in');
  void content.offsetWidth;
  content.classList.add('animate-in');

  document.getElementById('btnPrev').disabled = idx === 0;
  document.getElementById('btnNext').disabled = idx === STEPS.length - 1;

  // Auto-scroll step into view
  const stepEl = document.getElementById('step-' + idx);
  if (stepEl) stepEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function navigate(dir) {
  const next = currentStep + dir;
  if (next >= 0 && next < STEPS.length) renderStep(next);
}

/* ══════════════════════════════════════════════
   QUIZ
══════════════════════════════════════════════ */
function renderQuiz() {
  if (quizIndex >= QUIZ.length) {
    showScore();
    return;
  }
  const q = QUIZ[quizIndex];
  const card = document.getElementById('quizCard');
  card.innerHTML = `
    <div class="quiz-num">QUESTION ${quizIndex + 1} / ${QUIZ.length} &nbsp;·&nbsp; Score: ${quizScore}</div>
    <div class="quiz-q">${q.q}</div>
    <div class="quiz-options">
      ${q.opts.map((o, i) => `<button class="quiz-opt" id="qopt-${i}" onclick="answerQuiz(${i})">${o}</button>`).join('')}
    </div>
    <div id="quizExp" style="display:none"></div>
  `;
  quizAnswered = false;
  document.getElementById('quizStatus').textContent = `Question ${quizIndex + 1} of ${QUIZ.length}`;
  card.classList.remove('animate-in'); void card.offsetWidth; card.classList.add('animate-in');
}

function answerQuiz(idx) {
  if (quizAnswered) return;
  quizAnswered = true;
  const q = QUIZ[quizIndex];
  document.querySelectorAll('.quiz-opt').forEach((el, i) => {
    el.disabled = true;
    if (i === q.ans) el.classList.add('correct');
    if (i === idx && i !== q.ans) el.classList.add('wrong');
  });
  if (idx === q.ans) quizScore++;
  const exp = document.getElementById('quizExp');
  exp.style.display = 'block';
  exp.innerHTML = `<div class="quiz-explanation">💡 ${q.exp} <br><br><button class="btn-secondary" style="padding:0.4rem 1rem;font-size:0.8rem;margin-top:8px;" onclick="nextQuestion()">Next Question →</button></div>`;
}

function nextQuestion() {
  quizIndex++;
  renderQuiz();
}

function showScore() {
  const pct = Math.round((quizScore / QUIZ.length) * 100);
  const msg = pct === 100 ? "Perfect! 🏆 You're an election expert!" :
              pct >= 75  ? "Excellent! 🌟 You know your democracy well." :
              pct >= 50  ? "Good job! 📚 Keep learning about elections." :
                           "Keep studying! 📖 Democracy rewards informed citizens.";
  document.getElementById('quizCard').innerHTML = `
    <div class="quiz-score">
      <div style="font-size:3rem;margin-bottom:1rem;">🗳️</div>
      <div class="score-num">${quizScore}</div>
      <div class="score-total">/ ${QUIZ.length}</div>
      <div style="font-size:1.5rem;font-weight:600;margin:0.75rem 0;">${pct}%</div>
      <div style="color:var(--text-secondary);font-size:1rem;margin-bottom:1.5rem;">${msg}</div>
      <button class="btn-primary" onclick="restartQuiz()">Take Quiz Again</button>
    </div>
  `;
  document.getElementById('quizStatus').textContent = `Completed · ${quizScore}/${QUIZ.length} correct`;
}

function restartQuiz() {
  quizIndex = 0; quizScore = 0; quizAnswered = false;
  renderQuiz();
}

/* ══════════════════════════════════════════════
   GLOSSARY
══════════════════════════════════════════════ */
function renderGlossary() {
  const grid = document.getElementById('glossaryGrid');
  if (grid.children.length) return;
  GLOSSARY.forEach((g, i) => {
    const div = document.createElement('div');
    div.className = 'gloss-card animate-in';
    div.style.animationDelay = (i * 0.04) + 's';
    div.innerHTML = `
      <div class="gloss-term">${g.term}</div>
      <div class="gloss-def">${g.def}</div>
      <div class="gloss-badge ${g.badge}" style="background:transparent;border:1px solid currentColor;font-size:0.68rem;padding:2px 8px;">${g.badgeLabel}</div>
    `;
    grid.appendChild(div);
  });
}

/* ══════════════════════════════════════════════
   AI CHAT
══════════════════════════════════════════════ */
async function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;

  addMsg('user', text);
  input.value = '';
  document.getElementById('sendBtn').disabled = true;

  chatHistory.push({ role: 'user', content: text });

  // Typing indicator
  const typingId = addTyping();

  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: chatHistory.slice(-10)
      })
    });

    removeTyping(typingId);

    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    const reply = data.content?.[0]?.text || "I'm having trouble connecting. Please try again!";

    chatHistory.push({ role: 'assistant', content: reply });
    addMsg('ai', reply);
  } catch (e) {
    removeTyping(typingId);
    addMsg('ai', "⚠️ I'm having trouble connecting to my knowledge base right now. Please check your internet connection and try again! In the meantime, explore the Timeline and Glossary sections above.");
  }

  document.getElementById('sendBtn').disabled = false;
  input.focus();
}

function addMsg(role, text) {
  const box = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg ' + role;
  div.innerHTML = `
    <div class="msg-avatar ${role}">${role === 'ai' ? '🤖' : '👤'}</div>
    <div class="msg-bubble">${text.replace(/\n/g, '<br>')}</div>
  `;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  return div;
}

function addTyping() {
  const box = document.getElementById('chatMessages');
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'msg ai'; div.id = id;
  div.innerHTML = `<div class="msg-avatar ai">🤖</div><div class="msg-bubble" style="padding:6px 12px"><div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  return id;
}

function removeTyping(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function handleKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
}

function sendQuickPrompt(text) {
  document.getElementById('chatInput').value = text;
  sendMessage();
}

/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */
// Tag colors
document.head.insertAdjacentHTML('beforeend', `<style>
.tag-key { background: rgba(245,158,11,0.12); color: #f59e0b; }
.tag-legal { background: rgba(139,92,246,0.12); color: #a78bfa; }
.tag-civic { background: rgba(20,184,166,0.12); color: #2dd4bf; }
.tag-official { background: rgba(59,130,246,0.12); color: #60a5fa; }
.gloss-badge.tag-official { color: #60a5fa; border-color: rgba(59,130,246,0.4); }
.gloss-badge.tag-legal { color: #a78bfa; border-color: rgba(139,92,246,0.4); }
.gloss-badge.tag-civic { color: #2dd4bf; border-color: rgba(20,184,166,0.4); }
.gloss-badge.tag-key { color: #f59e0b; border-color: rgba(245,158,11,0.4); }
</style>`);