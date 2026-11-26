# Prototype Éval CM2 — HTML/JS

Prototype autonome de l'application d'évaluation CM2, conçu pour être ouvert directement dans un navigateur sur ordinateur ou tablette.

## Lancer le prototype

Ouvrir `index.html` dans un navigateur récent. Aucun serveur, compte, package ou connexion Internet n'est nécessaire.

## Parcours inclus

- identification locale de l'élève ;
- catalogue complet des 30 exercices répartis entre français et mathématiques ;
- une activité interactive pour chacun des 30 exercices ;
- QCM, saisies numériques ou textuelles et réponses libres selon la nature de l'exercice ;
- réponses tactiles sous forme de QCM ;
- temps réglementaire affiché et décompté pour chaque exercice : 39 min (exercice 1), 1 min 20 (exercice 10) et 1 min 30 (exercice 19) ;
- progression par séquence et bilan final ;
- sauvegarde locale automatique via `localStorage` ;
- bouton « Recommencer » pour effacer la session.

Les questions et activités sont reprises du livret élève `26CM2E` et des consignes du guide professeur `26CM2P`. Les réponses libres, les lectures à voix haute et les éléments dépendant d'un visuel sont enregistrés pour validation par l'enseignant lorsqu'une correction automatique n'est pas possible.

Le chronomètre démarre au lancement d'un exercice, reste actif entre ses questions, est conservé en cas de rechargement de la page et termine automatiquement l'exercice lorsque le temps réglementaire est écoulé.

## Structure

- `index.html` : structure de la page et point d'entrée ;
- `styles.css` : interface tablette responsive, couleurs et composants ;
- `app.js` : données des exercices, état de session, rendu et interactions.

## Prochaines étapes possibles

1. intégrer chaque exercice du livret avec son type d'interaction réel ;
2. distinguer le mode élève et le mode enseignant ;
3. ajouter les consignes de passation et les durées du guide professeur ;
4. produire une restitution exportable par élève et par compétence ;
5. ajouter des tests d'accessibilité et une gestion plus fine des réponses non renseignées.
