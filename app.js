/*
 * Éval CM2 — prototype local
 *
 * Les 30 exercices du livret sont décrits dans `exercises`, avec leur durée
 * officielle extraite du guide professeur 26CM2P. Les exercices 1, 10 et 19
 * possèdent déjà des questions interactives dans cette version ; les autres
 * disposent d'une fiche de passation chronométrée, prête à recevoir leurs
 * interactions détaillées lors de la prochaine intégration.
 */

const STORAGE_KEY = "eval-cm2-prototype-session-v1";

const exercises = [
  { id: "ex-01", number: 1, sequence: "Français", title: "Comprendre un texte littéraire", activity: "Lire le texte « Le cerf-volant de Toshiro », puis répondre aux questions de compréhension.", durationSeconds: 39 * 60, durationLabel: "39 min", questionIds: ["lecture-1", "lecture-2", "lecture-3"] },
  { id: "ex-02", number: 2, sequence: "Mathématiques", title: "Les nombres entiers", activity: "Écrire sous la dictée des nombres entiers en chiffres.", durationSeconds: 150, durationLabel: "2 min 30", questionIds: [] },
  { id: "ex-03", number: 3, sequence: "Mathématiques", title: "Résoudre des problèmes", activity: "Lire ou écouter les problèmes et entourer la réponse numérique correcte parmi les propositions.", durationSeconds: 19 * 60, durationLabel: "19 min", questionIds: [] },
  { id: "ex-04", number: 4, sequence: "Mathématiques", title: "La demi-droite graduée", activity: "Repérer une position sur une ligne graduée et écrire le nombre correspondant.", durationSeconds: 4 * 60, durationLabel: "4 min", questionIds: [] },
  { id: "ex-05", number: 5, sequence: "Mathématiques", title: "Décompositions additives", activity: "Trouver le nombre correspondant à chacune des décompositions additives.", durationSeconds: 6 * 60, durationLabel: "6 min", questionIds: [] },
  { id: "ex-06", number: 6, sequence: "Mathématiques", title: "Additions et soustractions", activity: "Poser et effectuer des additions et des soustractions avec ou sans retenue.", durationSeconds: 6 * 60, durationLabel: "6 min", questionIds: [] },
  { id: "ex-07", number: 7, sequence: "Mathématiques", title: "Calcul mental", activity: "Résoudre le plus grand nombre de calculs sans les poser.", durationSeconds: 60, durationLabel: "1 min", questionIds: [] },
  { id: "ex-08", number: 8, sequence: "Français", title: "Comprendre un document composite", activity: "Lire un document composite et répondre aux questions de compréhension.", durationSeconds: 22 * 60, durationLabel: "22 min", questionIds: [] },
  { id: "ex-09", number: 9, sequence: "Français", title: "Mémoriser l'orthographe", activity: "Écrire les mots dictés.", durationSeconds: 4 * 60, durationLabel: "4 min", questionIds: [] },
  { id: "ex-10", number: 10, sequence: "Français", title: "Accorder les adjectifs", activity: "Reconnaître l'adjectif correctement accordé parmi quatre propositions.", durationSeconds: 80, durationLabel: "1 min 20", questionIds: ["grammaire-1", "grammaire-2"] },
  { id: "ex-11", number: 11, sequence: "Français", title: "Accorder les noms", activity: "Reconnaître le nom correctement accordé parmi quatre propositions.", durationSeconds: 80, durationLabel: "1 min 20", questionIds: [] },
  { id: "ex-12", number: 12, sequence: "Français", title: "Accorder le sujet et le verbe", activity: "Choisir la forme verbale correcte au pluriel parmi quatre propositions.", durationSeconds: 160, durationLabel: "2 min 40", questionIds: [] },
  { id: "ex-13", number: 13, sequence: "Français", title: "Conjugaison", activity: "Conjuguer un verbe au temps et à la personne demandés en contexte.", durationSeconds: 2 * 60, durationLabel: "2 min", questionIds: [] },
  { id: "ex-14", number: 14, sequence: "Mathématiques", title: "Représenter les fractions", activity: "Trouver la représentation d'un partage correspondant à une fraction.", durationSeconds: 60, durationLabel: "1 min", questionIds: [] },
  { id: "ex-15", number: 15, sequence: "Mathématiques", title: "Lire les nombres décimaux", activity: "Reconnaître l'écriture d'un nombre présenté sous différentes formes.", durationSeconds: 80, durationLabel: "1 min 20", questionIds: [] },
  { id: "ex-16", number: 16, sequence: "Mathématiques", title: "Placer un nombre décimal", activity: "Repérer une position sur une ligne graduée et écrire le nombre décimal.", durationSeconds: 200, durationLabel: "3 min 20", questionIds: [] },
  { id: "ex-17", number: 17, sequence: "Mathématiques", title: "Placer une fraction", activity: "Repérer une position sur une ligne graduée et entourer la fraction correspondante.", durationSeconds: 2 * 60, durationLabel: "2 min", questionIds: [] },
  { id: "ex-18", number: 18, sequence: "Mathématiques", title: "Résoudre des problèmes", activity: "Résoudre des problèmes de proportionnalité, de durée et de lecture de données.", durationSeconds: 16 * 60, durationLabel: "16 min", questionIds: [] },
  { id: "ex-19", number: 19, sequence: "Mathématiques", title: "Comparer des fractions à l'unité", activity: "Trouver la fraction supérieure, inférieure ou égale à 1 parmi quatre propositions.", durationSeconds: 90, durationLabel: "1 min 30", questionIds: ["fractions-1", "fractions-2"] },
  { id: "ex-20", number: 20, sequence: "Mathématiques", title: "Comparer des nombres décimaux", activity: "Trouver le plus grand nombre dans chaque rectangle.", durationSeconds: 4 * 60, durationLabel: "4 min", questionIds: [] },
  { id: "ex-21", number: 21, sequence: "Mathématiques", title: "Multiplications et divisions", activity: "Poser et effectuer des multiplications et des divisions.", durationSeconds: 390, durationLabel: "6 min 30", questionIds: [] },
  { id: "ex-22", number: 22, sequence: "Mathématiques", title: "Calcul mental rapide", activity: "Résoudre le plus grand nombre de calculs en trois minutes.", durationSeconds: 3 * 60, durationLabel: "3 min", questionIds: [] },
  { id: "ex-23", number: 23, sequence: "Français", title: "Comprendre un texte entendu", activity: "Écouter un texte puis répondre aux questions de compréhension.", durationSeconds: 15 * 60, durationLabel: "15 min", questionIds: [] },
  { id: "ex-24", number: 24, sequence: "Français", title: "Les classes de mots", activity: "Identifier la classe grammaticale du mot souligné parmi quatre propositions.", durationSeconds: 160, durationLabel: "2 min 40", questionIds: [] },
  { id: "ex-25", number: 25, sequence: "Français", title: "Identifier le verbe", activity: "Repérer le verbe conjugué dans une phrase parmi quatre propositions.", durationSeconds: 90, durationLabel: "1 min 30", questionIds: [] },
  { id: "ex-26", number: 26, sequence: "Français", title: "Identifier le sujet", activity: "Repérer le sujet dans une phrase parmi quatre propositions.", durationSeconds: 90, durationLabel: "1 min 30", questionIds: [] },
  { id: "ex-27", number: 27, sequence: "Français", title: "Identifier le complément d'objet", activity: "Repérer le complément d'objet direct dans une phrase parmi quatre propositions.", durationSeconds: 60, durationLabel: "1 min", questionIds: [] },
  { id: "ex-28", number: 28, sequence: "Français", title: "Les synonymes", activity: "Trouver la phrase dans laquelle le mot a le sens demandé.", durationSeconds: 4 * 60, durationLabel: "4 min", questionIds: [] },
  { id: "ex-29", number: 29, sequence: "Français", title: "Les familles de mots", activity: "Identifier l'intrus dans une famille de mots donnée.", durationSeconds: 3 * 60, durationLabel: "3 min", questionIds: [] },
  { id: "ex-30", number: 30, sequence: "Français", title: "Lire avec fluidité", activity: "Lire correctement le plus grand nombre de mots d'un texte en une minute.", durationSeconds: 60, durationLabel: "1 min", questionIds: [] }
];

const questions = {
  "lecture-1": { type: "choice", title: "Question 1", prompt: "Toshiro est « très fier » car…", options: ["il a fabriqué le cerf-volant avec son grand-père.", "le cerf-volant appartenait à son grand-père.", "son grand-père lui a acheté le cerf-volant.", "son grand-père a décoré lui-même le cerf-volant."], answer: 0 },
  "lecture-2": { type: "choice", title: "Question 2", prompt: "Toshiro est « très fier » car son cerf-volant est…", options: ["grand.", "léger.", "cher.", "coloré."], answer: 3 },
  "lecture-3": { type: "choice", title: "Question 3", prompt: "Lignes 1 à 10. Le cerf-volant a été fabriqué avec du…", options: ["bambou.", "carton.", "plastique.", "bois."], answer: 0 },
  "grammaire-1": { type: "choice", title: "Question 1", prompt: "Trouve l’adjectif correctement accordé : une lionne…", options: ["attentif", "attentives", "attentifs", "attentive"], answer: 3 },
  "grammaire-2": { type: "choice", title: "Question 2", prompt: "Trouve l’adjectif correctement accordé : des chaussettes…", options: ["verts", "vertes", "vert", "verte"], answer: 1 },
  "fractions-1": { type: "choice", title: "Question 1", prompt: "Trouve la fraction supérieure à 1.", options: ["4/6", "4/7", "4/10", "4/2"], answer: 3 },
  "fractions-2": { type: "choice", title: "Question 2", prompt: "Trouve la fraction égale à 1.", options: ["2/3", "3/3", "5/3", "8/3"], answer: 1 }
};

// Un item représentatif ou une courte série est associée à chacun des autres
// exercices. Les items dont la correction dépend d'un tracé ou d'une lecture
// orale restent enregistrables sans correction automatique.
Object.assign(questions, {
  "ex02-1": { type: "input", title: "Nombre 1", prompt: "Écris en chiffres le nombre dicté : cinq mille sept cents.", answer: "5700", placeholder: "Ex. 5700", inputMode: "numeric" },
  "ex03-1": { type: "choice", title: "Problème 1", prompt: "Le livre de Fatou a 330 pages et celui de Simon 280 pages. Combien de pages le livre de Fatou a-t-il de plus ?", options: ["50", "610", "100", "30"], answer: 0 },
  "ex04-1": { type: "input", title: "Droite graduée", prompt: "Écris dans le cadre le nombre indiqué par la flèche.", answer: null, placeholder: "Saisis le nombre", inputMode: "numeric", helper: "Dans le livret complet, la droite graduée est affichée à côté du champ." },
  "ex05-1": { type: "choice", title: "Question 1", prompt: "3 dizaines + 4 centaines + 5 milliers + 8 unités =", options: ["5 348", "3 458", "5 438", "50 438"], answer: 0 },
  "ex05-2": { type: "choice", title: "Question 2", prompt: "6 milliers + 4 dizaines + 5 unités =", options: ["645", "15", "6 045", "6 450"], answer: 2 },
  "ex06-1": { type: "input", title: "Opération 1", prompt: "Pose et calcule : 672 + 9 816 =", answer: "10488", placeholder: "Résultat", inputMode: "numeric" },
  "ex06-2": { type: "input", title: "Opération 2", prompt: "Pose et calcule : 301 − 23 =", answer: "278", placeholder: "Résultat", inputMode: "numeric" },
  "ex07-1": { type: "input", title: "Calcul mental", prompt: "Complète : 3 × 7 =", answer: "21", placeholder: "Résultat", inputMode: "numeric" },
  "ex08-1": { type: "choice", title: "Question 1", prompt: "L’information sur le régime alimentaire du fou de Bassan se trouve dans l’encadré…", options: ["1. Sa carte d’identité", "2. Sa nourriture", "3. L’origine de son nom", "5. Le saviez-vous ?"], answer: 1 },
  "ex08-2": { type: "choice", title: "Question 2", prompt: "Le fou de Bassan mange les poissons…", options: ["dans son nid.", "sous l’eau.", "sur les falaises.", "en l’air."], answer: 1 },
  "ex09-1": { type: "input", title: "Mot dicté", prompt: "Écris le mot dicté : un champignon.", answer: "champignon", placeholder: "Écris le mot", inputMode: "text" },
  "ex11-1": { type: "choice", title: "Question 1", prompt: "Trouve le nom correctement accordé : une meilleure…", options: ["danseur", "coureurs", "idée", "solutions"], answer: 2 },
  "ex11-2": { type: "choice", title: "Question 2", prompt: "Trouve le nom correctement accordé : cet horrible…", options: ["servantes", "sorcière", "dragons", "monstre"], answer: 3 },
  "ex12-1": { type: "choice", title: "Question 1", prompt: "L’oiseau vole au-dessus de la maison. Les oiseaux…", options: ["volent au-dessus de la maison.", "voles au-dessus de la maison.", "vole au-dessus de la maison.", "volez au-dessus de la maison."], answer: 0 },
  "ex12-2": { type: "choice", title: "Question 2", prompt: "Elle vient à mon anniversaire. Elles…", options: ["viens à mon anniversaire.", "viennes à mon anniversaire.", "venez à mon anniversaire.", "viennent à mon anniversaire."], answer: 3 },
  "ex13-1": { type: "input", title: "Question 1", prompt: "Tu (sauter / présent) sur le trampoline.", answer: "sautes", placeholder: "Forme du verbe", inputMode: "text" },
  "ex13-2": { type: "input", title: "Question 2", prompt: "Elle (être / imparfait) en vacances.", answer: "était", placeholder: "Forme du verbe", inputMode: "text" },
  "ex14-1": { type: "choice", title: "Question 1", prompt: "Quelle fraction représente une figure partagée en 3 parts égales dont 2 sont coloriées en gris ?", options: ["1/3", "2/3", "3/2", "1/2"], answer: 1 },
  "ex15-1": { type: "choice", title: "Question 1", prompt: "Quelle écriture correspond à « deux dixièmes » ?", options: ["2,10", "2/10", "10,2", "10/2"], answer: 1 },
  "ex16-1": { type: "input", title: "Droite graduée", prompt: "Écris le nombre décimal indiqué par la flèche.", answer: null, placeholder: "Saisis le nombre", inputMode: "decimal", helper: "La droite graduée du livret sera affichée dans la version complète avec les visuels." },
  "ex17-1": { type: "choice", title: "Droite graduée", prompt: "Parmi les propositions, entoure la fraction indiquée par la flèche.", options: ["1/4", "1/2", "3/4", "4/4"], answer: null, helper: "La correction de cet item dépend du visuel de la droite graduée." },
  "ex18-1": { type: "choice", title: "Problème 7", prompt: "3 amis se partagent un sac de 150 billes. Combien de billes ont-ils chacun ?", options: ["450", "147", "50", "153"], answer: 2 },
  "ex20-1": { type: "choice", title: "Comparaison 1", prompt: "Quel est le plus grand nombre : 7,3 ou 7,1 ?", options: ["7,3", "7,1"], answer: 0 },
  "ex21-1": { type: "input", title: "Opération 1", prompt: "Pose et calcule : 305 × 5 =", answer: "1525", placeholder: "Résultat", inputMode: "numeric" },
  "ex22-1": { type: "input", title: "Calcul mental", prompt: "Complète : 28 + 41 =", answer: "69", placeholder: "Résultat", inputMode: "numeric" },
  "ex23-1": { type: "choice", title: "Question 1", prompt: "L’étudiant va chaque jour au village voisin pour…", options: ["suivre un enseignement.", "parler avec le chien.", "rendre visite à ses parents.", "mener paître les buffles."], answer: 0 },
  "ex24-1": { type: "choice", title: "Question 1", prompt: "Dans « Ce musée expose des tableaux de Picasso », quelle est la nature de « musée » ?", options: ["verbe", "nom commun", "nom propre", "déterminant"], answer: 1 },
  "ex25-1": { type: "choice", title: "Question 1", prompt: "Dans « Je n’avance pas à cause des embouteillages », quel est le verbe conjugué ?", options: ["Je", "avance", "cause", "embouteillages"], answer: 1 },
  "ex26-1": { type: "choice", title: "Question 1", prompt: "Dans « Pour son anniversaire, Rémi soufflera toutes les bougies de son gâteau », quel est le sujet ?", options: ["Pour son anniversaire", "Rémi", "toutes les bougies", "son gâteau"], answer: 1 },
  "ex27-1": { type: "choice", title: "Question 1", prompt: "Dans « Lundi, Marguerite écrit à sa mamie », quel est le complément d’objet ?", options: ["Lundi", "Marguerite", "écrit", "à sa mamie"], answer: 3 },
  "ex28-1": { type: "choice", title: "Question 1", prompt: "Dans quelle phrase « carte » veut dire « menu » ?", options: ["Il a gagné une carte très rare à la récréation.", "Ici, on peut payer par carte bancaire.", "La carte de ce restaurant est variée.", "Un atlas est un ensemble de cartes du monde."], answer: 2 },
  "ex29-1": { type: "choice", title: "Question 1", prompt: "Quel est l’intrus dans la famille du mot « chaleur » ?", options: ["chaud", "chaussette", "réchauffer", "chaudière"], answer: 1 },
  "ex30-1": { type: "input", title: "Lecture fluide", prompt: "Lis le texte à voix haute pendant une minute, puis indique le nombre de mots correctement lus.", answer: null, placeholder: "Nombre de mots lus", inputMode: "numeric", helper: "Cet exercice nécessite une validation par l’enseignant." }
});

const exerciseQuestionMap = {
  2: ["ex02-1"], 3: ["ex03-1"], 4: ["ex04-1"], 5: ["ex05-1", "ex05-2"], 6: ["ex06-1", "ex06-2"], 7: ["ex07-1"], 8: ["ex08-1", "ex08-2"], 9: ["ex09-1"], 11: ["ex11-1", "ex11-2"], 12: ["ex12-1", "ex12-2"], 13: ["ex13-1", "ex13-2"], 14: ["ex14-1"], 15: ["ex15-1"], 16: ["ex16-1"], 17: ["ex17-1"], 18: ["ex18-1"], 20: ["ex20-1"], 21: ["ex21-1"], 22: ["ex22-1"], 23: ["ex23-1"], 24: ["ex24-1"], 25: ["ex25-1"], 26: ["ex26-1"], 27: ["ex27-1"], 28: ["ex28-1"], 29: ["ex29-1"], 30: ["ex30-1"]
};
exercises.forEach(exercise => { if (exerciseQuestionMap[exercise.number]) exercise.questionIds = exerciseQuestionMap[exercise.number]; });

// Supports autonomes : la synthèse vocale permet à l'élève de relancer une
// dictée autant de fois que nécessaire, sans afficher le mot avant sa saisie.
const dogOfStoneText = `L’histoire se déroule au Vietnam. Un mandarin est une personne importante, qui a du pouvoir. Autrefois, il y avait un étudiant qui se rendait tous les jours à un village voisin pour suivre les enseignements d’un lettré de renom. À l’entrée de ce village se dressait la statue en pierre d’un chien. Chaque fois qu’il passait devant le chien de pierre, comme par enchantement ce dernier se levait, remuant sa queue pour le saluer. Un jour, intrigué, l’étudiant s’arrêta et le questionna. Le chien de pierre lui annonça qu’il serait le seul de sa région à être reçu au concours et deviendrait mandarin. L’étudiant rapporta la nouvelle à ses parents. Ceux-ci se montrèrent alors hautains envers les gens du village et piétinèrent leurs récoltes. Les gens se plaignirent. Le chien de pierre prévint l’étudiant que son nom avait été rayé de la liste des lauréats. Les parents présentèrent leurs excuses et changèrent de conduite. L’étudiant poursuivit ses études avec application. Grâce à sa constance et au repentir de ses parents, il réussit finalement le concours et devint un gouverneur juste et efficace.`;
const mermaidPassage = `Ce château était construit de pierres jaunes et luisantes ; de grands escaliers de marbre conduisaient à l’intérieur et au jardin ; plusieurs dômes dorés brillaient sur le toit, et entre les colonnes des galeries se trouvaient des statues de marbre qui paraissaient vivantes. Les salles, magnifiques, étaient ornées de rideaux et de tapis incomparables, et les murs couverts de grandes peintures. Dans le grand salon, le soleil réchauffait, à travers un plafond de cristal, les plantes les plus rares, qui poussaient dans un grand bassin au-dessous de plusieurs jets d’eau. Dès lors, la petite sirène revint souvent à cet endroit, la nuit comme le jour ; elle s’approchait de la côte, et osait même s’asseoir sous le grand balcon de marbre qui projetait son ombre bien avant sur les eaux. De là, elle voyait au clair de la lune le jeune prince, qui se croyait seul ; souvent, au son de la musique, il passait devant elle dans un riche bateau pavoisé, et ceux qui apercevaient son voile blanc dans les roseaux verts la prenaient pour un cygne ouvrant ses ailes. Elle entendait aussi les pêcheurs dire beaucoup de bien du jeune prince, et alors elle se réjouissait de lui avoir sauvé la vie, quoiqu’il l’ignorât complètement.`;
const dictationNumbers = ["5 700", "52 365", "25 601", "352 468", "1 047", "900 000", "86 079", "7 098", "630 017", "310 040"];
const dictationWords = ["un champignon", "une dent", "un moment", "un ordinateur", "beaucoup", "une direction", "gourmand", "souvent", "un téléphone", "maintenant", "une médaille", "pourquoi"];

Object.assign(questions, {
  "ex02-1": { type: "input", title: "Nombre 1 sur 10", prompt: "Écoute le nombre puis écris-le en chiffres.", answer: "5700", placeholder: "Écris le nombre", inputMode: "numeric", speakText: "cinq mille sept cents" },
  "ex09-1": { type: "input", title: "Mot 1 sur 12", prompt: "Écoute le mot puis écris-le. Tu peux relancer la lecture autant de fois que nécessaire.", answer: "champignon", placeholder: "Écris le mot", inputMode: "text", speakText: "un champignon" },
  "ex23-1": { type: "choice", title: "Question 1", prompt: "L’étudiant va chaque jour au village voisin pour…", options: ["suivre un enseignement.", "parler avec le chien.", "rendre visite à ses parents.", "mener paître les buffles."], answer: 0, audioText: dogOfStoneText },
  "ex30-1": { type: "input", title: "Lecture fluide", prompt: "Lis le texte à voix haute pendant une minute, puis indique le nombre de mots correctement lus.", answer: null, placeholder: "Nombre de mots lus", inputMode: "numeric", passage: mermaidPassage, helper: "Le texte contient 204 mots. Le chronomètre de l’exercice dure une minute." }
});

// Chaque mot et chaque nombre est un item distinct : l'élève avance sans
// adulte et peut réécouter uniquement l'élément en cours.
dictationNumbers.forEach((spoken, index) => { const id = `ex02-${index + 1}`; questions[id] = { type: "input", title: `Nombre ${index + 1} sur ${dictationNumbers.length}`, prompt: "Écoute le nombre puis écris-le en chiffres.", answer: spoken.replace(/\s/g, ""), placeholder: "Écris le nombre", inputMode: "numeric", speakText: spoken }; });
dictationWords.forEach((word, index) => { const id = `ex09-${index + 1}`; questions[id] = { type: "input", title: `Mot ${index + 1} sur ${dictationWords.length}`, prompt: "Écoute le mot puis écris-le. Tu peux relancer la lecture autant de fois que nécessaire.", answer: word.replace(/^(un|une) /, ""), placeholder: "Écris le mot", inputMode: "text", speakText: word }; });
exerciseQuestionMap[2] = dictationNumbers.map((_, index) => `ex02-${index + 1}`);
exerciseQuestionMap[9] = dictationWords.map((_, index) => `ex09-${index + 1}`);
exercises.forEach(exercise => { if (exerciseQuestionMap[exercise.number]) exercise.questionIds = exerciseQuestionMap[exercise.number]; });

const storyExcerpt = `Toshiro franchit le portail qui s’ouvrait sur le parc. Le matin même, ils avaient terminé le cerf-volant, fait de papier tendu sur des tiges de bambou entrecroisées. Il était magnifique, d’un rose lumineux sur lequel se détachait un dragon émeraude, et Toshiro en était très fier.\n\nPlus tard, une flaque d’eau offrit un miroir aux nuées. Puisque Grand-Père Satô ne pouvait plus lever la tête, c’est là qu’il contemplerait le merveilleux spectacle. À la fin de l’histoire, Toshiro trouve les mots pour décrire la beauté du paysage à son grand-père.`;

const defaultState = { screen: "home", student: "", sequenceId: null, questionIndex: 0, answers: {}, timerEndAt: null };
let state = loadState();
const screen = document.querySelector("#screen");
const resetButton = document.querySelector("#reset-button");
let timerInterval = null;

function loadState() { try { const saved = { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) }; const legacyIds = { lecture: "ex-01", grammaire: "ex-10", fractions: "ex-19" }; if (legacyIds[saved.sequenceId]) saved.sequenceId = legacyIds[saved.sequenceId]; return saved; } catch { return { ...defaultState }; } }
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function setState(changes) { state = { ...state, ...changes }; saveState(); render(); }
function escapeHTML(value) { return String(value).replace(/[&<>\"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[char])); }
function currentSequence() { return exercises.find(item => item.id === state.sequenceId); }
function currentQuestion() { return questions[currentSequence().questionIds[state.questionIndex]]; }
function allQuestionIds() { return exercises.flatMap(exercise => exercise.questionIds); }
function answeredCount() { return allQuestionIds().filter(id => state.answers[id] !== undefined).length; }
function totalQuestions() { return allQuestionIds().length; }
function button(label, action, className = "primary-button") { return `<button type="button" class="${className}" data-action="${action}">${label}</button>`; }
function formatTime(seconds) { const minutes = Math.floor(seconds / 60); const remainingSeconds = seconds % 60; return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`; }
function stopTimer() { if (timerInterval) { clearInterval(timerInterval); timerInterval = null; } }
function finishSequence(reason = "completed") { stopTimer(); state = { ...state, screen: "sequences", sequenceId: null, questionIndex: 0, timerEndAt: null }; saveState(); render(); if (reason === "timeout") showToast("Le temps est écoulé. L’exercice est terminé."); }
function updateTimer() { const badge = document.querySelector("#timer-badge"); if (!badge || !state.timerEndAt) return; const remaining = Math.max(0, Math.ceil((state.timerEndAt - Date.now()) / 1000)); badge.textContent = `Temps restant : ${formatTime(remaining)}`; badge.classList.toggle("warning", remaining <= 30 && remaining > 0); if (remaining === 0) finishSequence("timeout"); }

function render() { stopTimer(); resetButton.hidden = state.screen === "home"; if (state.screen === "home") renderHome(); if (state.screen === "student") renderStudent(); if (state.screen === "sequences") renderSequences(); if (state.screen === "question") renderQuestion(); if (state.screen === "intro") renderExerciseIntro(); if (state.screen === "results") renderResults(); }

function renderHome() { screen.innerHTML = `<section class="hero"><div><p class="eyebrow">Prototype tablette • CM2 2026</p><h1>Les évaluations, autrement.</h1><p class="lead">Un parcours calme et guidé pour répondre aux exercices de français et de mathématiques sur tablette.</p><div class="button-row">${button("Commencer une évaluation", "start")}${state.student ? button("Reprendre la session", "resume", "secondary-button") : ""}</div></div></section>`; }
function renderStudent() { screen.innerHTML = `<section class="panel narrow"><p class="eyebrow">Avant de commencer</p><h2>Qui passe l’évaluation ?</h2><p>Cette information reste uniquement sur cette tablette. Elle permet de reprendre la session si elle est interrompue.</p><label class="field-label" for="student-name">Prénom de l’élève</label><input id="student-name" class="text-input" type="text" autocomplete="off" value="${escapeHTML(state.student)}" placeholder="Ex. Camille"><div class="button-row">${button("Continuer", "save-student")}</div></section>`; document.querySelector("#student-name").focus(); }
function renderSequences() {
  const completed = answeredCount();
  const groups = ["Français", "Mathématiques"].map(group => `<div class="exercise-group"><p class="eyebrow">${group}</p><div class="sequence-grid">${exercises.filter(exercise => exercise.sequence === group).map(exercise => `<button class="sequence-card" type="button" data-sequence="${exercise.id}"><span class="sequence-number">${String(exercise.number).padStart(2, "0")}</span><h3>Exercice ${exercise.number} · ${exercise.title}</h3><p>${exercise.activity}</p><small>${exercise.questionIds.length ? `${exercise.questionIds.length} questions interactives` : "Fiche de passation"} · ${exercise.durationLabel}</small></button>`).join("")}</div></div>`).join("");
  screen.innerHTML = `<section><div class="progress-wrap"><div class="progress-meta"><span>Progression des questions interactives</span><strong>${completed}/${totalQuestions()} réponses</strong></div><div class="progress-track"><div class="progress-bar" style="width:${(completed / totalQuestions()) * 100}%"></div></div></div><p class="eyebrow">Bonjour ${escapeHTML(state.student || "élève")} !</p><h2>Choisis un exercice</h2><p class="instruction">Les durées affichées sont celles du guide professeur. Chaque carte ouvre une activité adaptée au type de l’exercice.</p>${groups}${completed ? `<div class="button-row">${button("Voir mon bilan", "results", "secondary-button")}</div>` : ""}</section>`;
}
function renderExerciseIntro() {
  const exercise = currentSequence();
  if (!state.timerEndAt) { state.timerEndAt = Date.now() + exercise.durationSeconds * 1000; saveState(); }
  if (state.timerEndAt <= Date.now()) { finishSequence("timeout"); return; }
  screen.innerHTML = `<section class="panel narrow"><p class="eyebrow">${exercise.sequence} · Exercice ${exercise.number}</p><div id="timer-badge" class="timer-badge">Temps restant : ${formatTime(Math.max(0, Math.ceil((state.timerEndAt - Date.now()) / 1000)))}</div><h2>${exercise.title}</h2><p class="lead">${exercise.activity}</p><p>La durée officielle de cet exercice est de <strong>${exercise.durationLabel}</strong>. La version interactive détaillée de cet exercice sera ajoutée à cette fiche sans modifier le temps prévu.</p><div class="button-row">${button("Terminer l’exercice", "complete-preview")}</div></section>`;
  timerInterval = setInterval(updateTimer, 1000);
}
function renderAnswerControl(question, savedAnswer) {
  const audioButton = question.audioText ? `<button type="button" class="secondary-button speak-button" data-speak="${encodeURIComponent(question.audioText)}">Écouter le texte</button><details><summary>Afficher le texte</summary><div class="source-text reading-text">${question.audioText}</div></details>` : "";
  if (question.type === "choice") return `${audioButton}<form id="answer-form" class="option-list">${question.options.map((option, index) => `<label class="option"><input type="radio" name="answer" value="${index}" ${Number(savedAnswer) === index ? "checked" : ""}><span>${option}</span></label>`).join("")}</form>`;
  const value = savedAnswer === undefined ? "" : escapeHTML(savedAnswer);
  const helper = question.helper ? `<p class="instruction">${question.helper}</p>` : "";
  const passage = question.passage ? `<div class="source-text reading-text">${question.passage}</div>` : "";
  const speakButton = question.speakText ? `<button type="button" class="secondary-button speak-button" data-speak="${encodeURIComponent(question.speakText)}">Lire le mot</button>` : "";
  return `${passage}${audioButton}${speakButton}${helper}<form id="answer-form"><label class="field-label" for="free-answer">Ta réponse</label><input id="free-answer" class="text-input" name="answer" type="text" inputmode="${question.inputMode || "text"}" value="${value}" placeholder="${question.placeholder || "Écris ta réponse"}"></form>`;
}
function renderQuestion() {
  const exercise = currentSequence(); const question = currentQuestion();
  if (!state.timerEndAt) { state.timerEndAt = Date.now() + exercise.durationSeconds * 1000; saveState(); }
  if (state.timerEndAt <= Date.now()) { finishSequence("timeout"); return; }
  const savedAnswer = state.answers[exercise.questionIds[state.questionIndex]]; const progress = ((state.questionIndex) / exercise.questionIds.length) * 100;
  screen.innerHTML = `<div class="progress-wrap"><div class="progress-meta"><span>Exercice ${exercise.number} · ${exercise.title}</span><strong>Question ${state.questionIndex + 1} sur ${exercise.questionIds.length}</strong></div><div class="progress-track"><div class="progress-bar" style="width:${progress}%"></div></div></div><div class="question-layout"><article class="panel"><p class="eyebrow">${exercise.sequence}</p><div id="timer-badge" class="timer-badge">Temps restant : ${formatTime(Math.max(0, Math.ceil((state.timerEndAt - Date.now()) / 1000)))}</div><h2>${question.title}</h2><p class="instruction">${question.prompt}</p>${exercise.id === "ex-01" ? `<details open><summary>Relire l’extrait</summary><div class="source-text">${storyExcerpt.replace(/\n\n/g, "<br><br>")}</div></details>` : ""}${renderAnswerControl(question, savedAnswer)}<div class="button-row">${state.questionIndex > 0 ? button("Question précédente", "previous", "secondary-button") : ""}${button(state.questionIndex === exercise.questionIds.length - 1 ? "Terminer la séquence" : "Valider et continuer", "next")}</div></article><aside class="question-side"><h3>Petit rappel</h3><p>Il n’y a pas de piège. Prends le temps de lire et choisis la réponse qui te semble la plus juste.</p><p>La durée réglementaire reste visible en haut de l’exercice.</p></aside></div>`;
  timerInterval = setInterval(updateTimer, 1000);
}
function normalized(value) { return String(value ?? "").trim().toLocaleLowerCase("fr-FR").replace(/\s+/g, " "); }
function isCorrect(id) { const expected = questions[id].answer; return expected !== null && normalized(state.answers[id]) === normalized(expected); }
function renderResults() { const ids = allQuestionIds(); const score = ids.reduce((total, id) => total + (isCorrect(id) ? 1 : 0), 0); const detailed = exercises.filter(exercise => exercise.questionIds.length).map(exercise => { const seqScore = exercise.questionIds.reduce((n, id) => n + (isCorrect(id) ? 1 : 0), 0); return `<div class="result-item"><span>Exercice ${exercise.number} · ${exercise.title}</span><strong>${seqScore}/${exercise.questionIds.length}</strong></div>`; }).join(""); screen.innerHTML = `<section class="panel narrow"><p class="eyebrow">Bilan de la session</p><h2>Bravo ${escapeHTML(state.student || "")}, tu as terminé le prototype.</h2><div class="result-score"><div class="score-circle">${score}/${ids.length}</div><p>Les réponses libres et les exercices nécessitant une lecture ou un visuel restent enregistrés pour validation par l’enseignant.</p></div><div class="result-list">${detailed}</div><div class="button-row">${button("Choisir un autre exercice", "sequences", "secondary-button")}${button("Recommencer l’évaluation", "restart")}</div></section>`; }

function readAnswer() { const selected = document.querySelector("input[name=answer]:checked"); if (selected) return Number(selected.value); const text = document.querySelector("#free-answer"); return text && text.value.trim() ? text.value.trim() : undefined; }
function showToast(message) { const toast = document.createElement("div"); toast.className = "toast"; toast.textContent = message; document.body.append(toast); setTimeout(() => toast.remove(), 2400); }

screen.addEventListener("click", event => {
  const exerciseButton = event.target.closest("[data-sequence]");
  if (exerciseButton) { const exercise = exercises.find(item => item.id === exerciseButton.dataset.sequence); setState({ screen: exercise.questionIds.length ? "question" : "intro", sequenceId: exercise.id, questionIndex: 0, timerEndAt: null }); return; }
  const speakButton = event.target.closest("[data-speak]");
  if (speakButton) {
    if (!("speechSynthesis" in window)) { showToast("La lecture audio n’est pas disponible dans ce navigateur."); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(decodeURIComponent(speakButton.dataset.speak));
    utterance.lang = "fr-FR";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
    return;
  }
  const actionButton = event.target.closest("[data-action]"); if (!actionButton) return;
  const action = actionButton.dataset.action;
  if (action === "start") setState({ screen: "student" });
  if (action === "resume") setState({ screen: state.sequenceId ? (currentSequence().questionIds.length ? "question" : "intro") : "sequences" });
  if (action === "save-student") { const name = document.querySelector("#student-name").value.trim(); if (!name) { showToast("Écris ton prénom pour continuer."); return; } setState({ student: name, screen: "sequences" }); }
  if (action === "sequences") setState({ screen: "sequences" });
  if (action === "previous") setState({ questionIndex: Math.max(0, state.questionIndex - 1) });
  if (action === "complete-preview") finishSequence();
  if (action === "next") { const answer = readAnswer(); if (answer === undefined) { showToast("Choisis une réponse avant de continuer."); return; } const id = currentSequence().questionIds[state.questionIndex]; const answers = { ...state.answers, [id]: answer }; if (state.questionIndex < currentSequence().questionIds.length - 1) setState({ answers, questionIndex: state.questionIndex + 1 }); else { state = { ...state, answers, screen: "sequences", sequenceId: null, questionIndex: 0, timerEndAt: null }; saveState(); render(); } }
  if (action === "results") setState({ screen: "results" });
  if (action === "restart") { state = { ...defaultState, student: state.student }; saveState(); render(); }
});
resetButton.addEventListener("click", () => { state = { ...defaultState }; saveState(); render(); });
render();
