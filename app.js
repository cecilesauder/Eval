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

const sequenceDetails = {
  1: { label: "Français" },
  2: { label: "Mathématiques" },
  3: { label: "Français" },
  4: { label: "Mathématiques" },
  5: { label: "Français" },
  6: { label: "Français" }
};
const sequenceByExercise = { 1: 1, 2: 2, 3: 2, 4: 2, 5: 2, 6: 2, 7: 2, 8: 3, 9: 3, 10: 3, 11: 3, 12: 3, 13: 3, 14: 4, 15: 4, 16: 4, 17: 4, 18: 4, 19: 4, 20: 4, 21: 4, 22: 4, 23: 5, 24: 5, 25: 5, 26: 5, 27: 5, 28: 5, 29: 5, 30: 6 };
exercises.forEach(exercise => { exercise.sequenceNumber = sequenceByExercise[exercise.number]; exercise.sequenceTitle = sequenceDetails[exercise.sequenceNumber].title; });

const questions = {
  "lecture-1": { type: "choice", title: "Question 1", prompt: "Toshiro est « très fier » car...", options: ["il a fabriqué le cerf-volant avec son grand-père.", "le cerf-volant appartenait à son grand-père.", "son grand-père lui a acheté le cerf-volant.", "son grand-père a décoré lui-même le cerf-volant."], answer: 0 },
  "lecture-2": { type: "choice", title: "Question 2", prompt: "Toshiro est « très fier » car son cerf-volant est…", options: ["grand.", "léger.", "cher.", "coloré."], answer: 3 },
  "lecture-3": { type: "choice", title: "Question 3", prompt: "Lignes 1 à 10. Le cerf-volant a été fabriqué avec du…", options: ["bambou.", "carton.", "plastique.", "bois."], answer: 0 },
  "lecture-4": { type: "choice", title: "Question 4", prompt: "Dans ce texte, Toshiro se montre…", options: ["égoïste.", "bavard.", "astucieux.", "adroit."], answer: 2 },
  "lecture-5": { type: "choice", title: "Question 5", prompt: "Le grand-père ne voit pas le cerf-volant dans le ciel car…", options: ["il a une mauvaise vue.", "il est courbé vers le sol.", "le soleil brille trop fort et l’éblouit.", "le cerf-volant est caché par des nuages."], answer: 1 },
  "lecture-6": { type: "choice", title: "Question 6", prompt: "Ligne 29. « Merci, garçon, merci, souffla-t-il. » Le vieil homme remercie Toshiro car…", options: ["le cerf-volant brille dans le ciel.", "Toshiro l’aide à diriger le cerf-volant.", "il peut voir le reflet du cerf-volant.", "Toshiro l’aide à se redresser."], answer: 2 },
  "lecture-7": { type: "choice", title: "Question 7", prompt: "Lignes 42 à 44. « Il emprunta un seau de bois au jardinier, le remplit à l’étang, et, pour ranimer leur précieux miroir, en versa plusieurs fois le contenu aux pieds du banc. » Le « précieux miroir » désigne...", options: ["le seau.", "l’étang.", "le banc.", "la flaque."], answer: 3 },
  "lecture-8": { type: "choice", title: "Question 8", prompt: "Cette histoire se déroule sur…", options: ["une année.", "une semaine.", "une saison.", "une soirée."], answer: 2 },
  "lecture-9": { type: "choice", title: "Question 9", prompt: "À la fin du texte, Toshiro se met à parler car…", options: ["il veut partager avec son grand-père ce qu’il voit.", "l’hiver est sa saison préférée.", "il rencontre une pie pour la première fois.", "son grand-père le lui a demandé."], answer: 0 },
  "lecture-10": { type: "choice", title: "Question 10", prompt: "Parmi les quatre informations suivantes, la plus importante pour l’histoire est :", options: ["un dragon est dessiné sur le cerf-volant", "la flaque permet de refléter le ciel", "la flaque est près d’un banc", "Toshiro est fier de son cerf-volant"], answer: 1 },
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
  "ex03-1": { type: "choice", title: "Problème 1", prompt: "Le livre de Fatou a 330 pages. Le livre de Simon a 280 pages. Combien de pages le livre de Fatou a-t-il de plus que celui de Simon ?", options: ["100", "150", "330", "30", "50", "610"], answer: 4, research: true },
  "ex03-2": { type: "choice", title: "Problème 2", prompt: "Une tablette de chocolat coûte 2,60 €. Léo a 8 € dans son porte-monnaie. Il décide d’acheter 3 tablettes de chocolat. Combien Léo va-t-il payer ? Parmi les opérations suivantes, une seule permet de trouver la bonne réponse. Laquelle ?", options: ["2,60 € + 8 €", "2,60 € × 8 €", "8 € + 3", "8 € × 3", "2,60 € × 3", "2,60 € + 3"], answer: 4, research: true },
  "ex03-3": { type: "choice", title: "Problème 3", prompt: "Ali a 150 € dans son porte-monnaie. Ali achète 3 livres à 20 € l’un et 4 magazines à 10 € l’un. Combien d’argent a-t-il après son achat ?", options: ["60 €", "40 €", "100 €", "120 €", "113 €", "50 €"], answer: 5, research: true },
  "ex03-4": { type: "choice", title: "Problème 4", prompt: "2 parts de gâteau coûtent 3 €. Combien 8 parts de gâteau coûtent-elles ?", options: ["9 €", "12 €", "24 €", "8 €", "11 €", "13 €"], answer: 1, research: true },
  "ex03-5": { type: "choice", title: "Problème 5", prompt: "Une trousse et un stylo coûtent 14 €. Trois stylos coûtent 12 €. Quel est le prix d’une trousse ?", options: ["14 €", "4 €", "12 €", "2 €", "7 €", "10 €"], answer: 3, research: true },
  "ex03-6": { type: "choice", title: "Problème 6", prompt: "Lis le programme de construction. Une seule figure correspond à ce programme de construction. Parmi les 4 figures proposées, entoure la figure correcte.", options: ["Figure 1", "Figure 2", "Figure 3", "Figure 4"], answer: 3, image: "assets/exercice-3-figures.png" },
  "ex04-1": { type: "input", title: "Droite 1", prompt: "Écris dans le cadre le nombre indiqué par la flèche.", answer: "58000", placeholder: "Saisis le nombre", inputMode: "numeric", numberLine: { min: 28000, max: 68000, minLabel: "28 000", maxLabel: "68 000", divisions: 4, targetIndex: 3 } },
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
  1: ["lecture-1", "lecture-2", "lecture-3", "lecture-4", "lecture-5", "lecture-6", "lecture-7", "lecture-8", "lecture-9", "lecture-10"],
  2: ["ex02-1"], 3: ["ex03-1", "ex03-2", "ex03-3", "ex03-4", "ex03-5", "ex03-6"], 4: ["ex04-1"], 5: ["ex05-1", "ex05-2"], 6: ["ex06-1", "ex06-2"], 7: ["ex07-1"], 8: ["ex08-1", "ex08-2"], 9: ["ex09-1"], 11: ["ex11-1", "ex11-2"], 12: ["ex12-1", "ex12-2"], 13: ["ex13-1", "ex13-2"], 14: ["ex14-1"], 15: ["ex15-1"], 16: ["ex16-1"], 17: ["ex17-1"], 18: ["ex18-1"], 20: ["ex20-1"], 21: ["ex21-1"], 22: ["ex22-1"], 23: ["ex23-1"], 24: ["ex24-1"], 25: ["ex25-1"], 26: ["ex26-1"], 27: ["ex27-1"], 28: ["ex28-1"], 29: ["ex29-1"], 30: ["ex30-1"]
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
const numberLines = [
  { min: 28000, max: 68000, minLabel: "28 000", maxLabel: "68 000", divisions: 4, targetIndex: 3, answer: "58000" },
  { min: 0, max: 20000, minLabel: "0", maxLabel: "20 000", divisions: 2, targetIndex: 1, answer: "10000" },
  { min: 2050, max: 6050, minLabel: "2 050", maxLabel: "6 050", divisions: 4, targetIndex: 3, answer: "5050" },
  { min: 9800, max: 10200, minLabel: "9 800", maxLabel: "10 200", divisions: 4, targetIndex: 3, answer: "10100" },
  { min: 0, max: 600000, minLabel: "0", maxLabel: "600 000", divisions: 6, targetIndex: 4, answer: "400000" },
  { min: 38900, max: 39100, minLabel: "38 900", maxLabel: "39 100", divisions: 2, targetIndex: 1, answer: "39000" }
];
numberLines.forEach((line, index) => {
  questions[`ex04-${index + 1}`] = { type: "input", title: `Droite ${index + 1} sur ${numberLines.length}`, prompt: "Écris dans le cadre le nombre indiqué par la flèche.", answer: line.answer, placeholder: "Saisis le nombre", inputMode: "numeric", numberLine: line };
});
exerciseQuestionMap[2] = dictationNumbers.map((_, index) => `ex02-${index + 1}`);
exerciseQuestionMap[4] = numberLines.map((_, index) => `ex04-${index + 1}`);
exerciseQuestionMap[9] = dictationWords.map((_, index) => `ex09-${index + 1}`);
exercises.forEach(exercise => { if (exerciseQuestionMap[exercise.number]) exercise.questionIds = exerciseQuestionMap[exercise.number]; });

const storyExcerpt = `Le cerf-volant de Toshiro

1    Toshiro franchit le portail qui s’ouvrait sur le parc, puis longea l’allée de sable. Derrière lui, Grand-Père Satô marchait lentement, les yeux sur ses sandales.
     - Tu vas voir, garçon, dit le vieil homme. C’est une belle journée pour essayer un cerf-volant.

5    Le matin même, ils avaient terminé l’objet, fait de papier tendu sur des tiges de bambou entrecroisées. Il était magnifique, d’un rose lumineux sur lequel se détachait un dragon émeraude, et Toshiro en était très fier.
     L’enfant s’arrêta à l’intersection des chemins qui sillonnaient le jardin. Il interrogea son grand-père du regard et celui-ci approuva son choix :
     - Oui, ici, ce sera parfait.
     Toshiro s’éloigna et posa le cerf-volant bien à plat sur la mousse.
     - Arrange le ruban ! conseilla son grand-père. S’il s’emmêle, tu sais ce qui arrivera !
     Le garçon lissa le papier du plat de la main et rejoignit le vieil homme. D’un même geste, ils tendirent la ficelle. Le cerf-volant sursauta et fila aussitôt vers la cime des sapins.

15   Toshiro riait aux éclats, tout à la joie de voir le vert de leur dragon se dessiner dans les airs. Mais Grand-Père Satô ne pouvait pas voir ce qui rendait son petit-fils si heureux.
     Depuis longtemps déjà, son corps fatigué se courbait vers la terre qu’il avait travaillée durant tant d’années. Depuis longtemps déjà, son dos douloureux l’empêchait de regarder le ciel.

20   Toshiro prit alors la main du vieil homme et l’emmena vers un tronc couché dont on avait fait un banc. À cet endroit, une grande flaque d’eau laissée par la dernière pluie offrait un miroir aux nuées qui défilaient, poussées par la brise de cette fin d’hiver.
     Puisque Grand-Père Satô ne pouvait plus lever la tête, c’est là qu’il contemplerait le merveilleux spectacle qui se jouait là-haut.

25   Fier de son idée, Toshiro rembobina la ficelle pour ramener le dragon à l’aplomb de la flaque.

     Les yeux du vieil homme s’éclairèrent et un sourire apparut à travers la broussaille de sa barbe blanche.
     - Merci, garçon, merci, souffla-t-il. Il est beau, n’est-ce pas ? Il prend bien le vent !

30   Toshiro acquiesça d’un signe de tête. Juste de la tête. Car Toshiro ne parlait pas. Les mots frappaient pourtant très fort dans son cœur, comme s’ils demandaient à s’en échapper, à rejoindre les mots des autres, ceux de sa famille, des livres que sa mère lui lisait ou ceux, vifs et joyeux, des enfants qui jouaient plus loin dans le parc. Mais les siens restaient au plus profond de lui et ne franchissaient jamais ses lèvres.

35   Le banc de bois devint, au fil des jours, un point de rendez-vous, et la flaque une fenêtre grande ouverte sur les nuages.
     Au printemps, Toshiro et son grand-père encourageaient les grues remontant hardiment vers le nord. Puis vinrent les chaleurs de l’été. Au grand désespoir de Toshiro, la flaque s’assécha. Grand-Père Satô se résignait déjà à ne plus voir les arabesques du cerf-volant et l’enfant découvrait dans les yeux du vieil homme une ombre de tristesse qu’il ne connaissait pas.

40   Alors, une fois encore, Toshiro trouva comment redessiner un sourire sur le visage de son grand-père. Il emprunta un seau de bois au jardinier, le remplit à l’étang, et, pour ranimer leur précieux miroir, en versa plusieurs fois le contenu aux pieds du banc.

45   Chaque jour, ils passaient ainsi les heures les plus moites sous les catalpas, à observer les papillons attirés par les fleurs nacrées. Chaque jour, Toshiro remplissait la flaque avec le seau, puis se blottissait contre le vieil homme pour mieux ressentir la joie qui le traversait.
     Plus tard, l’automne leur offrit les mille bruns des érables. Le reflet des grues, à nouveau, traversa la flaque vers le sud, cette fois. Il ne fallait pas oublier son écharpe.
     Souvent, Grand-Père Satô racontait son enfance, les ombrelles des dames et leurs beaux kimonos de soie. Toshiro écoutait.
     Mais si parfois ses yeux s’étonnaient, jamais sa bouche ne prononçait une parole. Puis ce fut l’hiver.

55   Un matin de silence ouaté, ils se réveillèrent dans le blanc. Toshiro tira Grand-Père Satô par la manche jusqu’à ce que celui-ci accepte la promenade. Quand ils parvinrent au banc, la flaque était recouverte de neige. Toshiro fila vers l’étang pour y remplir le seau, mais l’eau était gelée. Toshiro et son grand-père étaient là, côte à côte, frissonnants, abattus, lorsque le cri d’une pie toute proche les fit sursauter.

60   Le garçon leva les yeux et vit l’oiseau perché au-dessus d’eux. C’était comme si un artiste avait effacé les couleurs et repeint le monde à l’encre de Chine sur un papier de riz immaculé. Les branches se détachaient sur le gris doux du ciel.
     Quel tableau magnifique ! Il n’y manquait que le dragon émeraude. Mais à quoi bon le faire voler, pensait Toshiro, puisque son grand-père ne pourrait pas le voir ?

65   Sans doute parce que le laisser par terre aurait encore ajouté à leur chagrin, Toshiro choisit tout de même de déployer le cerf-volant.
     Il écarta lentement les bras, renversa la tête en arrière et ouvrit grand la bouche, pour y recevoir la neige qui tourbillonnait. Et les pépites de glace réveillèrent les mots qui sommeillaient.

70   - Comme c’est beau, grand-père, chuchota-t-il à l’oreille du vieil homme. Notre cerf-volant danse avec les flocons !
     Et ses paroles, hésitantes d’abord, dessinèrent peu à peu un paysage. Il dit le noir, il dit le blanc. Le bec luisant de l’oiseau, les branches alourdies, les glaçons suspendus. Le vieil homme fermait les yeux, écoutait, sans broncher, ce que disait l’enfant. Il ne manifestait ni surprise ni joie, comme s’il avait peur d’effrayer un petit animal tout juste apprivoisé.
     Quand, bien plus tard, il se leva enfin, il prit la main de son petit-fils et murmura :
     -Tu vois, Toshiro, c’était encore une belle journée pour essayer un cerf-volant !
     Et Toshiro répondit :
     - Oui !

Le cerf-volant de Toshiro, Ghislaine Roman, éditions Nathan.`;
function storyForDisplay() { return storyExcerpt.replace(/^\s*\d+\s+/gm, "").replace(/^ {5}/gm, ""); }

const defaultState = { screen: "home", student: "", sequenceId: null, questionIndex: 0, answers: {}, research: {}, timerEndAt: null, history: [], fluencySentenceIndex: 0, fluencyStartedAt: null, fluencyResult: null };
let state = loadState();
const screen = document.querySelector("#screen");
const resetButton = document.querySelector("#reset-button");
const scoresButton = document.querySelector("#scores-button");
let timerInterval = null;

function loadState() { try { const saved = { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY)) }; const legacyIds = { lecture: "ex-01", grammaire: "ex-10", fractions: "ex-19" }; if (legacyIds[saved.sequenceId]) saved.sequenceId = legacyIds[saved.sequenceId]; if (!Array.isArray(saved.history)) saved.history = []; return saved; } catch { return { ...defaultState }; } }
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
function recordAttempt(exercise, metric, score, maximum) { const history = [...state.history, { exerciseNumber: exercise.number, title: exercise.title, metric, score, maximum, completedAt: new Date().toISOString() }]; state.history = history.slice(-100); }
function finishSequence(reason = "completed") { stopTimer(); const exercise = currentSequence(); if (exercise && exercise.questionIds.length) { const score = exercise.questionIds.filter(id => isCorrect(id)).length; recordAttempt(exercise, "score", score, exercise.questionIds.length); } state = { ...state, screen: "sequences", sequenceId: null, questionIndex: 0, timerEndAt: null, fluencySentenceIndex: 0, fluencyStartedAt: null }; saveState(); render(); if (reason === "timeout") showToast("Le temps est écoulé. L’exercice est terminé."); }
function updateTimer() { const badge = document.querySelector("#timer-badge"); if (!badge || !state.timerEndAt) return; const remaining = Math.max(0, Math.ceil((state.timerEndAt - Date.now()) / 1000)); badge.textContent = `Temps restant : ${formatTime(remaining)}`; badge.classList.toggle("warning", remaining <= 30 && remaining > 0); if (remaining === 0) finishSequence("timeout"); }

function render() { stopTimer(); resetButton.hidden = state.screen === "home"; scoresButton.hidden = !state.student; if (state.screen === "home") renderHome(); if (state.screen === "student") renderStudent(); if (state.screen === "sequences") renderSequences(); if (state.screen === "question") renderQuestion(); if (state.screen === "fluency") renderFluency(); if (state.screen === "fluency-result") renderFluencyResult(); if (state.screen === "intro") renderExerciseIntro(); if (state.screen === "results") renderResults(); if (state.screen === "scores") renderScores(); }

function renderHome() { screen.innerHTML = `<section class="hero"><div><p class="eyebrow">Prototype tablette • CM2 2026</p><h1>Les évaluations, autrement.</h1><p class="lead">Un parcours calme et guidé pour répondre aux exercices de français et de mathématiques sur tablette.</p><div class="button-row">${button("Commencer une évaluation", "start")}${state.student ? button("Reprendre la session", "resume", "secondary-button") : ""}</div></div></section>`; }
function renderStudent() { screen.innerHTML = `<section class="panel narrow"><p class="eyebrow">Avant de commencer</p><h2>Qui passe l’évaluation ?</h2><p>Cette information reste uniquement sur cette tablette. Elle permet de reprendre la session si elle est interrompue.</p><label class="field-label" for="student-name">Prénom de l’élève</label><input id="student-name" class="text-input" type="text" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" data-form-type="other" value="${escapeHTML(state.student)}" placeholder="Ex. Camille"><div class="button-row">${button("Continuer", "save-student")}</div></section>`; document.querySelector("#student-name").focus(); }
function renderSequences() {
  const completed = answeredCount();
  const orderedExercises = [...exercises].sort((a, b) => a.number - b.number);
  const groups = [...new Set(orderedExercises.map(exercise => exercise.sequenceNumber))].sort((a, b) => a - b).map(sequenceNumber => {
    const details = sequenceDetails[sequenceNumber];
    const cards = orderedExercises.filter(exercise => exercise.sequenceNumber === sequenceNumber).map(exercise => `<button class="sequence-card" type="button" data-sequence="${exercise.id}"><span class="sequence-number">${String(exercise.number).padStart(2, "0")}</span><h3>Exercice ${exercise.number} · ${exercise.title}</h3><p>${exercise.activity}</p><small>${exercise.questionIds.length ? `${exercise.questionIds.length} questions interactives` : "Fiche de passation"} · ${exercise.durationLabel}</small></button>`).join("");
    return `<div class="exercise-group"><div class="sequence-heading"><p class="eyebrow">Séquence ${sequenceNumber} · ${details.label}</p></div><div class="sequence-grid">${cards}</div></div>`;
  }).join("");
  screen.innerHTML = `<section><div class="progress-wrap"><div class="progress-meta"><span>Progression des questions interactives</span><strong>${completed}/${totalQuestions()} réponses</strong></div><div class="progress-track"><div class="progress-bar" style="width:${(completed / totalQuestions()) * 100}%"></div></div></div><p class="eyebrow">Bonjour ${escapeHTML(state.student || "élève")} !</p><h2>Choisis ton exercice</h2><p class="instruction">Les exercices sont présentés dans l’ordre du livret et regroupés par séquence. Les durées affichées sont celles du guide professeur.</p>${groups}${completed ? `<div class="button-row">${button("Voir mon bilan", "results", "secondary-button")}</div>` : ""}</section>`;
}
function renderExerciseIntro() {
  const exercise = currentSequence();
  if (!state.timerEndAt) { state.timerEndAt = Date.now() + exercise.durationSeconds * 1000; saveState(); }
  if (state.timerEndAt <= Date.now()) { finishSequence("timeout"); return; }
  screen.innerHTML = `<section class="panel narrow"><p class="eyebrow">Séquence ${exercise.sequenceNumber} · ${exercise.sequence} · Exercice ${exercise.number}</p><div id="timer-badge" class="timer-badge">Temps restant : ${formatTime(Math.max(0, Math.ceil((state.timerEndAt - Date.now()) / 1000)))}</div><h2>${exercise.title}</h2><p class="lead">${exercise.activity}</p><p>La durée officielle de cet exercice est de <strong>${exercise.durationLabel}</strong>. La version interactive détaillée de cet exercice sera ajoutée à cette fiche sans modifier le temps prévu.</p><div class="button-row">${button("Terminer l’exercice", "complete-preview")}</div></section>`;
  timerInterval = setInterval(updateTimer, 1000);
}
function renderNumberLine(line) {
  const left = 8;
  const right = 92;
  const ticks = Array.from({ length: line.divisions + 1 }, (_, index) => {
    const x = left + ((right - left) * index / line.divisions);
    const isTarget = index === line.targetIndex;
    return `<line x1="${x}" y1="45" x2="${x}" y2="${isTarget ? 30 : 58}" class="number-line-tick" />${isTarget ? `<path d="M ${x - 1.5} 27 L ${x + 1.5} 27 L ${x} 33 Z" class="number-line-arrow" />` : ""}`;
  }).join("");
  return `<div class="number-line-wrap" aria-label="Demi-droite graduée de ${line.minLabel} à ${line.maxLabel}"><svg class="number-line" viewBox="0 0 100 72" role="img" aria-hidden="true"><line x1="${left}" y1="45" x2="${right}" y2="45" class="number-line-base" />${ticks}<text x="${left}" y="68" text-anchor="middle">${line.minLabel}</text><text x="${right}" y="68" text-anchor="middle">${line.maxLabel}</text></svg><p class="number-line-caption">La flèche indique une graduation entre ${line.minLabel} et ${line.maxLabel}.</p></div>`;
}
function renderAnswerControl(question, savedAnswer, savedResearch = "") {
  const audioButton = question.audioText ? `<button type="button" class="secondary-button speak-button" data-speak="${encodeURIComponent(question.audioText)}">Écouter le texte</button><details><summary>Afficher le texte</summary><div class="source-text reading-text">${question.audioText}</div></details>` : "";
  const researchBox = question.research ? `<details class="research-box"><summary>Ouvrir le cadre pour faire tes recherches</summary><textarea id="research-answer" class="research-area" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" placeholder="Écris ou pose tes calculs ici">${escapeHTML(savedResearch)}</textarea></details>` : "";
  const image = question.image ? `<figure class="question-image"><img src="${question.image}" alt="Les quatre figures proposées dans le problème 6 de l’exercice 3"><figcaption>Les quatre figures proposées dans le livret.</figcaption></figure>` : "";
  if (question.type === "choice") return `${image}${audioButton}${researchBox}<form id="answer-form" class="option-list">${question.options.map((option, index) => `<label class="option"><input type="radio" name="answer" value="${index}" autocomplete="off" ${Number(savedAnswer) === index ? "checked" : ""}><span>${option}</span></label>`).join("")}</form>`;
  const value = savedAnswer === undefined ? "" : escapeHTML(savedAnswer);
  const helper = question.helper ? `<p class="instruction">${question.helper}</p>` : "";
  const passage = question.passage ? `<div class="source-text reading-text">${question.passage}</div>` : "";
  const speakButton = question.speakText ? `<button type="button" class="secondary-button speak-button" data-speak="${encodeURIComponent(question.speakText)}">Lire le mot</button>` : "";
  const numberLine = question.numberLine ? renderNumberLine(question.numberLine) : "";
  return `${passage}${audioButton}${speakButton}${numberLine}${helper}${researchBox}<form id="answer-form"><label class="field-label" for="free-answer">Ta réponse</label><input id="free-answer" class="text-input" name="answer" type="text" inputmode="${question.inputMode || "text"}" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" data-form-type="other" value="${value}" placeholder="${question.placeholder || "Écris ta réponse"}"></form>`;
}
function renderQuestion() {
  const exercise = currentSequence(); const question = currentQuestion();
  if (!state.timerEndAt) { state.timerEndAt = Date.now() + exercise.durationSeconds * 1000; saveState(); }
  if (state.timerEndAt <= Date.now()) { finishSequence("timeout"); return; }
  const questionId = exercise.questionIds[state.questionIndex]; const savedAnswer = state.answers[questionId]; const savedResearch = state.research[questionId] || ""; const progress = ((state.questionIndex) / exercise.questionIds.length) * 100;
  screen.innerHTML = `<div class="progress-wrap"><div class="progress-meta"><span>Exercice ${exercise.number} · ${exercise.title}</span><strong>Question ${state.questionIndex + 1} sur ${exercise.questionIds.length}</strong></div><div class="progress-track"><div class="progress-bar" style="width:${progress}%"></div></div></div><div class="question-layout"><article class="panel"><p class="eyebrow">${exercise.sequence}</p><div id="timer-badge" class="timer-badge">Temps restant : ${formatTime(Math.max(0, Math.ceil((state.timerEndAt - Date.now()) / 1000)))}</div><h2>${question.title}</h2><p class="instruction">${question.prompt}</p>${exercise.id === "ex-01" ? `<details open><summary>Lire le texte intégral</summary><div class="source-text">${storyForDisplay().replace(/\n\n/g, "<br><br>")}</div></details>` : ""}${renderAnswerControl(question, savedAnswer, savedResearch)}<div class="button-row">${state.questionIndex > 0 ? button("Question précédente", "previous", "secondary-button") : ""}${button(state.questionIndex === exercise.questionIds.length - 1 ? "Terminer la séquence" : "Valider et continuer", "next")}${button("Quitter l’exercice", "exit-exercise", "secondary-button")}${button("Recommencer cet exercice", "restart-exercise", "secondary-button")}</div></article><aside class="question-side"><h3>Petit rappel</h3><p>Il n’y a pas de piège. Prends le temps de lire et choisis la réponse qui te semble la plus juste.</p><p>La durée réglementaire reste visible en haut de l’exercice.</p></aside></div>`;
  timerInterval = setInterval(updateTimer, 1000);
}
const fluencySentences = mermaidPassage.match(/[^.!?]+[.!?]+/g) || [mermaidPassage];
function fluencyWordCount() { return mermaidPassage.trim().split(/\s+/).length; }
function updateFluencyTimer() { const badge = document.querySelector("#fluency-timer"); if (!badge || !state.fluencyStartedAt) return; const elapsed = Math.floor((Date.now() - state.fluencyStartedAt) / 1000); badge.textContent = `Temps de lecture : ${formatTime(elapsed)} · objectif : 1:00`; badge.classList.toggle("warning", elapsed >= 60); }
function renderFluency() {
  const exercise = currentSequence();
  const sentence = fluencySentences[state.fluencySentenceIndex];
  const started = Boolean(state.fluencyStartedAt);
  screen.innerHTML = `<section class="panel narrow"><p class="eyebrow">Français · Exercice 30</p><div id="fluency-timer" class="timer-badge">${started ? `Temps de lecture : ${formatTime(Math.floor((Date.now() - state.fluencyStartedAt) / 1000))} · objectif : 1:00` : "Prêt pour la lecture"}</div><h2>Lecture de fluence</h2><p class="instruction">Lis la phrase à voix haute. Quand tu as fini, appuie sur « Continuer » pour afficher la phrase suivante.</p><div class="fluency-meta"><span>Phrase ${state.fluencySentenceIndex + 1} sur ${fluencySentences.length}</span><span>${fluencyWordCount()} mots au total</span></div><div class="fluency-sentence">${sentence}</div><div class="button-row">${!started ? button("Commencer la lecture", "start-fluency") : button(state.fluencySentenceIndex === fluencySentences.length - 1 ? "J’ai fini le texte" : "Continuer", "next-fluency")}${button("Quitter l’exercice", "exit-exercise", "secondary-button")}${button("Recommencer cet exercice", "restart-exercise", "secondary-button")}</div></section>`;
  if (started) timerInterval = setInterval(updateFluencyTimer, 1000);
}
function finishFluency() { stopTimer(); const elapsedSeconds = Math.max(1, (Date.now() - state.fluencyStartedAt) / 1000); const wpm = Math.round(fluencyWordCount() / (elapsedSeconds / 60)); const exercise = currentSequence(); recordAttempt(exercise, "mots/min", wpm, null); state = { ...state, screen: "fluency-result", fluencyResult: { wpm, elapsedSeconds: Math.round(elapsedSeconds), words: fluencyWordCount() }, timerEndAt: null }; saveState(); render(); }
function renderFluencyResult() { const result = state.fluencyResult; screen.innerHTML = `<section class="panel narrow"><p class="eyebrow">Exercice 30 terminé</p><h2>Ton score de fluence</h2><div class="score-summary"><div class="score-stat">Mots correctement lus<strong>${result.words}</strong></div><div class="score-stat">Temps de lecture<strong>${formatTime(result.elapsedSeconds)}</strong></div><div class="score-stat">Mots par minute<strong>${result.wpm}</strong></div></div><p>Pour progresser, recommence l’exercice et essaie de lire avec précision, sans accélérer au point de faire des erreurs.</p><div class="button-row">${button("Recommencer l’exercice", "restart-exercise")}${button("Voir mes scores", "scores", "secondary-button")}${button("Retour aux exercices", "sequences", "secondary-button")}</div></section>`; }
function renderScores() { const attempts = [...state.history].reverse(); const grouped = exercises.map(exercise => ({ exercise, attempts: state.history.filter(item => item.exerciseNumber === exercise.number) })).filter(item => item.attempts.length); const fluency = state.history.filter(item => item.exerciseNumber === 30 && item.metric === "mots/min"); const bestFluency = fluency.length ? Math.max(...fluency.map(item => item.score)) : 0; const bars = fluency.slice(-12).map((item, index) => `<div class="evolution-bar" style="height:${Math.max(12, Math.min(100, item.score / 2))}%"><span>${item.score}</span><small>${index + 1}</small></div>`).join(""); const rows = attempts.slice(0, 20).map(item => `<div class="result-item"><span>Exercice ${item.exerciseNumber} · ${item.title}<br><small>${new Date(item.completedAt).toLocaleString("fr-FR")}</small></span><strong>${item.metric === "mots/min" ? `${item.score} mots/min` : `${item.score}/${item.maximum}`}</strong></div>`).join(""); screen.innerHTML = `<section class="panel narrow"><p class="eyebrow">Entraînement personnel</p><h2>Mes scores et mon évolution</h2><div class="score-summary"><div class="score-stat">Tentatives<strong>${state.history.length}</strong></div><div class="score-stat">Exercices travaillés<strong>${grouped.length}/30</strong></div><div class="score-stat">Record de fluence<strong>${bestFluency ? `${bestFluency} mots/min` : "—"}</strong></div></div>${fluency.length ? `<h3>Évolution de la fluence</h3><div class="evolution">${bars}</div>` : `<p>Termine l’exercice 30 pour voir ton évolution de fluence ici.</p>`}<h3>Historique récent</h3><div class="result-list">${rows || "<p>Aucun score enregistré pour le moment.</p>"}</div><div class="button-row">${button("Retour aux exercices", "sequences", "secondary-button")}</div></section>`; }
function normalized(value) { return String(value ?? "").trim().toLocaleLowerCase("fr-FR").replace(/\s+/g, " "); }
function isCorrect(id) { const expected = questions[id].answer; return expected !== null && normalized(state.answers[id]) === normalized(expected); }
function renderResults() { const ids = allQuestionIds(); const score = ids.reduce((total, id) => total + (isCorrect(id) ? 1 : 0), 0); const detailed = exercises.filter(exercise => exercise.questionIds.length).map(exercise => { const seqScore = exercise.questionIds.reduce((n, id) => n + (isCorrect(id) ? 1 : 0), 0); return `<div class="result-item"><span>Exercice ${exercise.number} · ${exercise.title}</span><strong>${seqScore}/${exercise.questionIds.length}</strong></div>`; }).join(""); screen.innerHTML = `<section class="panel narrow"><p class="eyebrow">Bilan de la session</p><h2>Bravo ${escapeHTML(state.student || "")}, tu as terminé le prototype.</h2><div class="result-score"><div class="score-circle">${score}/${ids.length}</div><p>Les réponses libres et les exercices nécessitant une lecture ou un visuel restent enregistrés pour validation par l’enseignant.</p></div><div class="result-list">${detailed}</div><div class="button-row">${button("Choisir un autre exercice", "sequences", "secondary-button")}${button("Mes scores et mon évolution", "scores", "secondary-button")}${button("Recommencer l’évaluation", "restart")}</div></section>`; }

function readAnswer() { const selected = document.querySelector("input[name=answer]:checked"); if (selected) return Number(selected.value); const text = document.querySelector("#free-answer"); return text && text.value.trim() ? text.value.trim() : undefined; }
function readResearch() { const research = document.querySelector("#research-answer"); return research ? research.value : ""; }
function showToast(message) { const toast = document.createElement("div"); toast.className = "toast"; toast.textContent = message; document.body.append(toast); setTimeout(() => toast.remove(), 2400); }

screen.addEventListener("click", event => {
  const exerciseButton = event.target.closest("[data-sequence]");
  if (exerciseButton) { const exercise = exercises.find(item => item.id === exerciseButton.dataset.sequence); setState({ screen: exercise.id === "ex-30" ? "fluency" : (exercise.questionIds.length ? "question" : "intro"), sequenceId: exercise.id, questionIndex: 0, timerEndAt: null, fluencySentenceIndex: 0, fluencyStartedAt: null, fluencyResult: null }); return; }
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
  if (action === "resume") setState({ screen: state.sequenceId ? (state.sequenceId === "ex-30" ? "fluency" : (currentSequence().questionIds.length ? "question" : "intro")) : "sequences" });
  if (action === "save-student") { const name = document.querySelector("#student-name").value.trim(); if (!name) { showToast("Écris ton prénom pour continuer."); return; } setState({ student: name, screen: "sequences" }); }
  if (action === "sequences") setState({ screen: "sequences" });
  if (action === "previous") setState({ questionIndex: Math.max(0, state.questionIndex - 1) });
  if (action === "complete-preview") finishSequence();
  if (action === "start-fluency") { state = { ...state, fluencyStartedAt: Date.now(), fluencySentenceIndex: 0 }; saveState(); render(); }
  if (action === "next-fluency") { if (state.fluencySentenceIndex >= fluencySentences.length - 1) finishFluency(); else { state = { ...state, fluencySentenceIndex: state.fluencySentenceIndex + 1 }; saveState(); render(); } }
  if (action === "exit-exercise") { stopTimer(); state = { ...state, screen: "sequences", sequenceId: null, questionIndex: 0, timerEndAt: null, fluencyStartedAt: null, fluencySentenceIndex: 0 }; saveState(); render(); }
  if (action === "restart-exercise") { const exercise = currentSequence(); if (exercise) exercise.questionIds.forEach(id => { delete state.answers[id]; delete state.research[id]; }); state = { ...state, screen: state.sequenceId === "ex-30" ? "fluency" : "question", questionIndex: 0, timerEndAt: null, fluencySentenceIndex: 0, fluencyStartedAt: null, fluencyResult: null }; saveState(); render(); }
  if (action === "next") { const answer = readAnswer(); if (answer === undefined) { showToast("Choisis une réponse avant de continuer."); return; } const id = currentSequence().questionIds[state.questionIndex]; const answers = { ...state.answers, [id]: answer }; const research = { ...state.research, [id]: readResearch() }; if (state.questionIndex < currentSequence().questionIds.length - 1) setState({ answers, research, questionIndex: state.questionIndex + 1 }); else { state = { ...state, answers, research }; saveState(); finishSequence(); } }
  if (action === "results") setState({ screen: "results" });
  if (action === "scores") setState({ screen: "scores" });
  if (action === "restart") { state = { ...defaultState, student: state.student }; saveState(); render(); }
});
resetButton.addEventListener("click", () => { state = { ...defaultState }; saveState(); render(); });
scoresButton.addEventListener("click", () => { stopTimer(); setState({ screen: "scores" }); });
render();
