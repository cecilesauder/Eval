/*
 * Éval CM2 — prototype local
 *
 * Le fichier contient trois choses volontairement séparées :
 * 1. les données pédagogiques du prototype ;
 * 2. l'état de la session (élève, réponses, écran courant) ;
 * 3. le rendu des écrans et les interactions.
 *
 * Pour ajouter un exercice, il suffit de l'ajouter dans `questions` avec un
 * type `choice` ou `text`, puis de le rattacher à une séquence.
 */

const STORAGE_KEY = "eval-cm2-prototype-session-v1";

// Les contenus de cette première démonstration sont repris du livret 26CM2E.
const sequences = [
  {
    id: "lecture",
    number: "01",
    title: "Exercice 1 · Comprendre un texte",
    description: "Le cerf-volant de Toshiro — répondre à des questions après lecture.",
    durationSeconds: 39 * 60,
    durationLabel: "39 minutes",
    questions: ["lecture-1", "lecture-2", "lecture-3"]
  },
  {
    id: "grammaire",
    number: "02",
    title: "Exercice 10 · Accorder les adjectifs",
    description: "Choisir la forme correctement accordée.",
    durationSeconds: 80,
    durationLabel: "1 min 20",
    questions: ["grammaire-1", "grammaire-2"]
  },
  {
    id: "fractions",
    number: "03",
    title: "Exercice 19 · Lire les fractions",
    description: "Identifier une fraction supérieure ou égale à 1.",
    durationSeconds: 90,
    durationLabel: "1 min 30",
    questions: ["fractions-1", "fractions-2"]
  }
];

const questions = {
  "lecture-1": {
    sequence: "lecture", type: "choice", title: "Question 1", prompt: "Toshiro est « très fier » car…",
    options: ["il a fabriqué le cerf-volant avec son grand-père.", "le cerf-volant appartenait à son grand-père.", "son grand-père lui a acheté le cerf-volant.", "son grand-père a décoré lui-même le cerf-volant."], answer: 0
  },
  "lecture-2": {
    sequence: "lecture", type: "choice", title: "Question 2", prompt: "Toshiro est « très fier » car son cerf-volant est…",
    options: ["grand.", "léger.", "cher.", "coloré."], answer: 3
  },
  "lecture-3": {
    sequence: "lecture", type: "choice", title: "Question 3", prompt: "Lignes 1 à 10. Le cerf-volant a été fabriqué avec du…",
    options: ["bambou.", "carton.", "plastique.", "bois."], answer: 0
  },
  "grammaire-1": {
    sequence: "grammaire", type: "choice", title: "Question 1", prompt: "Trouve l’adjectif correctement accordé : une lionne…",
    options: ["attentif", "attentives", "attentifs", "attentive"], answer: 3
  },
  "grammaire-2": {
    sequence: "grammaire", type: "choice", title: "Question 2", prompt: "Trouve l’adjectif correctement accordé : des chaussettes…",
    options: ["verts", "vertes", "vert", "verte"], answer: 1
  },
  "fractions-1": {
    sequence: "fractions", type: "choice", title: "Question 1", prompt: "Trouve la fraction supérieure à 1.",
    options: ["4/6", "4/7", "4/10", "4/2"], answer: 3
  },
  "fractions-2": {
    sequence: "fractions", type: "choice", title: "Question 2", prompt: "Trouve la fraction égale à 1.",
    options: ["2/3", "3/3", "5/3", "8/3"], answer: 1
  }
};

const storyExcerpt = `Toshiro franchit le portail qui s’ouvrait sur le parc. Le matin même, ils avaient terminé le cerf-volant, fait de papier tendu sur des tiges de bambou entrecroisées. Il était magnifique, d’un rose lumineux sur lequel se détachait un dragon émeraude, et Toshiro en était très fier.\n\nPlus tard, une flaque d’eau offrit un miroir aux nuées. Puisque Grand-Père Satô ne pouvait plus lever la tête, c’est là qu’il contemplerait le merveilleux spectacle. À la fin de l’histoire, Toshiro trouve les mots pour décrire la beauté du paysage à son grand-père.`;

const defaultState = { screen: "home", student: "", sequenceId: null, questionIndex: 0, answers: {}, completed: false, timerEndAt: null };
let state = loadState();
const screen = document.querySelector("#screen");
const resetButton = document.querySelector("#reset-button");
let timerInterval = null;

function loadState() {
  try { return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) }; }
  catch { return { ...defaultState }; }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function setState(changes) { state = { ...state, ...changes }; saveState(); render(); }
function escapeHTML(value) { return String(value).replace(/[&<>\"]/g, char => ({"&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;"}[char])); }
function currentSequence() { return sequences.find(item => item.id === state.sequenceId); }
function currentQuestion() { return questions[currentSequence().questions[state.questionIndex]]; }
function allQuestionIds() { return sequences.flatMap(sequence => sequence.questions); }
function answeredCount() { return allQuestionIds().filter(id => state.answers[id] !== undefined).length; }
function totalQuestions() { return allQuestionIds().length; }
function button(label, action, className = "primary-button") { return `<button type="button" class="${className}" data-action="${action}">${label}</button>`; }
function formatTime(seconds) { const minutes = Math.floor(seconds / 60); const remainingSeconds = seconds % 60; return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`; }
function stopTimer() { if (timerInterval) { clearInterval(timerInterval); timerInterval = null; } }
function finishSequence(reason = "completed") {
  stopTimer();
  state = { ...state, screen: "sequences", sequenceId: null, questionIndex: 0, timerEndAt: null };
  saveState();
  render();
  if (reason === "timeout") showToast("Le temps est écoulé. L’exercice est terminé.");
}
function updateTimer() {
  const badge = document.querySelector("#timer-badge");
  if (!badge || !state.timerEndAt) return;
  const remaining = Math.max(0, Math.ceil((state.timerEndAt - Date.now()) / 1000));
  badge.textContent = `Temps restant : ${formatTime(remaining)}`;
  badge.classList.toggle("warning", remaining <= 30 && remaining > 0);
  if (remaining === 0) finishSequence("timeout");
}

function render() {
  stopTimer();
  resetButton.hidden = state.screen === "home";
  if (state.screen === "home") renderHome();
  if (state.screen === "student") renderStudent();
  if (state.screen === "sequences") renderSequences();
  if (state.screen === "question") renderQuestion();
  if (state.screen === "results") renderResults();
}

function renderHome() {
  screen.innerHTML = `<section class="hero">
    <div>
      <p class="eyebrow">Prototype tablette • CM2 2026</p>
      <h1>Les évaluations, autrement.</h1>
      <p class="lead">Un parcours calme et guidé pour répondre aux exercices de français et de mathématiques sur tablette.</p>
      <div class="button-row">${button("Commencer une évaluation", "start")}${state.student ? button("Reprendre la session", "resume", "secondary-button") : ""}</div>
    </div>
  </section>`;
}

function renderStudent() {
  screen.innerHTML = `<section class="panel narrow">
    <p class="eyebrow">Avant de commencer</p><h2>Qui passe l’évaluation ?</h2>
    <p>Cette information reste uniquement sur cette tablette. Elle permet de reprendre la session si elle est interrompue.</p>
    <label class="field-label" for="student-name">Prénom de l’élève</label>
    <input id="student-name" class="text-input" type="text" autocomplete="off" value="${escapeHTML(state.student)}" placeholder="Ex. Camille">
    <div class="button-row">${button("Continuer", "save-student")}</div>
  </section>`;
  document.querySelector("#student-name").focus();
}

function renderSequences() {
  const completed = answeredCount();
  screen.innerHTML = `<section><div class="progress-wrap"><div class="progress-meta"><span>Progression générale</span><strong>${completed}/${totalQuestions()} réponses</strong></div><div class="progress-track"><div class="progress-bar" style="width:${(completed / totalQuestions()) * 100}%"></div></div></div>
    <p class="eyebrow">Bonjour ${escapeHTML(state.student || "élève")} !</p><h2>Choisis une séquence</h2><p class="instruction">Tu peux les faire dans l’ordre que tu veux. Lis bien chaque consigne avant de répondre.</p>
    <div class="sequence-grid">${sequences.map(sequence => `<button class="sequence-card" type="button" data-sequence="${sequence.id}"><span class="sequence-number">${sequence.number}</span><h3>${sequence.title}</h3><p>${sequence.description}</p><small>${sequence.questions.length} questions · ${sequence.durationLabel}</small></button>`).join("")}</div>
    ${completed ? `<div class="button-row">${button("Voir mon bilan", "results", "secondary-button")}</div>` : ""}
  </section>`;
}

function renderQuestion() {
  const sequence = currentSequence(); const question = currentQuestion();
  if (!state.timerEndAt) { state.timerEndAt = Date.now() + sequence.durationSeconds * 1000; saveState(); }
  if (state.timerEndAt <= Date.now()) { finishSequence("timeout"); return; }
  const savedAnswer = state.answers[sequence.questions[state.questionIndex]];
  const progress = ((state.questionIndex) / sequence.questions.length) * 100;
  screen.innerHTML = `<div class="progress-wrap"><div class="progress-meta"><span>${sequence.title}</span><strong>Question ${state.questionIndex + 1} sur ${sequence.questions.length}</strong></div><div class="progress-track"><div class="progress-bar" style="width:${progress}%"></div></div></div>
    <div class="question-layout"><article class="panel"><p class="eyebrow">${sequence.title}</p><div id="timer-badge" class="timer-badge" aria-live="polite">Temps restant : ${formatTime(Math.max(0, Math.ceil((state.timerEndAt - Date.now()) / 1000)))}</div><h2>${question.title}</h2><p class="instruction">${question.prompt}</p>
      ${sequence.id === "lecture" ? `<details open><summary>Relire l’extrait</summary><div class="source-text">${storyExcerpt.replace(/\n\n/g, "<br><br>")}</div></details>` : ""}
      <form id="answer-form" class="option-list">${question.options.map((option, index) => `<label class="option"><input type="radio" name="answer" value="${index}" ${Number(savedAnswer) === index ? "checked" : ""}><span>${option}</span></label>`).join("")}</form>
      <div class="button-row">${state.questionIndex > 0 ? button("Question précédente", "previous", "secondary-button") : ""}${button(state.questionIndex === sequence.questions.length - 1 ? "Terminer la séquence" : "Valider et continuer", "next")}</div>
    </article><aside class="question-side"><h3>Petit rappel</h3><p>Il n’y a pas de piège. Prends le temps de lire et choisis la réponse qui te semble la plus juste.</p><p>Tu peux revenir à la question précédente avant de terminer la séquence.</p></aside></div>`;
  timerInterval = setInterval(updateTimer, 1000);
}

function renderResults() {
  const ids = allQuestionIds(); const score = ids.reduce((total, id) => total + (Number(state.answers[id]) === questions[id].answer ? 1 : 0), 0);
  screen.innerHTML = `<section class="panel narrow"><p class="eyebrow">Bilan de la session</p><h2>Bravo ${escapeHTML(state.student || "")}, tu as terminé le prototype.</h2><div class="result-score"><div class="score-circle">${score}/${ids.length}</div><p>Ce résultat est une indication de démonstration. Dans la version complète, l’enseignant pourra consulter le détail par compétence.</p></div><div class="result-list">${sequences.map(sequence => { const seqScore = sequence.questions.reduce((n, id) => n + (Number(state.answers[id]) === questions[id].answer ? 1 : 0), 0); return `<div class="result-item"><span>${sequence.title}</span><strong>${seqScore}/${sequence.questions.length}</strong></div>`; }).join("")}</div><div class="button-row">${button("Choisir une autre séquence", "sequences", "secondary-button")}${button("Recommencer l’évaluation", "restart")}</div></section>`;
}

function readAnswer() {
  const selected = document.querySelector("input[name=answer]:checked");
  return selected ? Number(selected.value) : undefined;
}
function showToast(message) { const toast = document.createElement("div"); toast.className = "toast"; toast.textContent = message; document.body.append(toast); setTimeout(() => toast.remove(), 2400); }

screen.addEventListener("click", event => {
  const sequenceButton = event.target.closest("[data-sequence]");
  if (sequenceButton) { setState({ screen: "question", sequenceId: sequenceButton.dataset.sequence, questionIndex: 0, timerEndAt: null }); return; }
  const actionButton = event.target.closest("[data-action]"); if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === "start") setState({ screen: "student" });
  if (action === "resume") setState({ screen: state.sequenceId ? "question" : "sequences" });
  if (action === "save-student") { const name = document.querySelector("#student-name").value.trim(); if (!name) { showToast("Écris ton prénom pour continuer."); return; } setState({ student: name, screen: "sequences" }); }
  if (action === "sequences") setState({ screen: "sequences" });
  if (action === "previous") setState({ questionIndex: Math.max(0, state.questionIndex - 1) });
  if (action === "next") { const answer = readAnswer(); if (answer === undefined) { showToast("Choisis une réponse avant de continuer."); return; } const id = currentSequence().questions[state.questionIndex]; const answers = { ...state.answers, [id]: answer }; if (state.questionIndex < currentSequence().questions.length - 1) setState({ answers, questionIndex: state.questionIndex + 1 }); else { state = { ...state, answers, screen: "sequences", sequenceId: null, questionIndex: 0, timerEndAt: null }; saveState(); render(); } }
  if (action === "results") setState({ screen: "results" });
  if (action === "restart") { state = { ...defaultState, student: state.student }; saveState(); render(); }
});

resetButton.addEventListener("click", () => { state = { ...defaultState }; saveState(); render(); });
render();
