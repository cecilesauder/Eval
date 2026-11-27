# Prototype Éval CM2 — HTML/JS

Prototype autonome de l'application d'évaluation CM2, conçu pour être ouvert directement dans un navigateur sur ordinateur ou tablette.

## Lancer le prototype

Ouvrir `index.html` dans un navigateur récent. Aucun serveur, compte, package ou connexion Internet n'est nécessaire.

## Parcours inclus

- identification locale de l'élève ;
- catalogue complet des 30 exercices affichés exactement dans l'ordre numérique du livret ;
- page de choix regroupée selon les 6 séquences numérotées du livret ;
- une activité interactive pour chacun des 30 exercices ;
- exercice 1 repris intégralement : texte complet « Le cerf-volant de Toshiro », paragraphes conservés sans les numéros de lignes et dix questions du livret avec leurs quatre propositions ;
- exercice 3 repris avec ses 6 problèmes, les six choix du livret lorsque nécessaire, le visuel original des quatre figures du problème 6 et un cadre de recherches ouvrable pour les calculs ;
- QCM, saisies numériques ou textuelles et réponses libres selon la nature de l'exercice ;
- texte complet de lecture pour l'exercice 30, avec saisie du nombre de mots lus ;
- texte complet de compréhension orale pour l'exercice 23, lisible autant de fois que nécessaire ;
- douze boutons « Lire le mot » pour l'exercice 9 et lecture répétable des nombres dictés de l'exercice 2 via la synthèse vocale du navigateur ;
- six demi-droites graduées fidèles à l'exercice 4 du livret, avec flèche, bornes et correction attendue ;
- exercice 30 de fluence présenté phrase par phrase avec bouton « Continuer », calcul des mots par minute et score de chaque tentative ;
- sortie et redémarrage disponibles depuis chaque exercice ;
- bouton « Mes scores » avec historique local des tentatives et évolution de la fluence ;
- réponses tactiles sous forme de QCM ;
- champs de réponse configurés sans suggestions de clavier, autocorrection, capitalisation automatique ni correcteur orthographique ;
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
