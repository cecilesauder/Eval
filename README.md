# Éval CM2

Prototype d'application web pour faire passer des évaluations de CM2 sur tablette plutôt que sur papier.

## Tester en ligne

La version publiée est accessible ici : [https://cecilesauder.github.io/Eval/](https://cecilesauder.github.io/Eval/)

L'application fonctionne côté navigateur, sans compte et sans serveur. Les réponses de la session sont conservées localement dans le navigateur de la tablette.

## Prototype inclus

- saisie du prénom de l'élève ;
- parcours guidé avec progression ;
- compréhension du texte **Le cerf-volant de Toshiro** ;
- accord des adjectifs ;
- lecture de fractions ;
- 30 exercices interactifs avec QCM, saisie numérique ou textuelle et réponses libres adaptées à chaque activité ;
- textes intégrés pour la lecture et la compréhension orale, avec boutons de synthèse vocale répétables pour les dictées ;
- bilan final par séquence ;
- reprise locale d'une session interrompue ;
- durée officielle affichée et décomptée pour chacun des 30 exercices, selon le guide professeur ;
- bouton de remise à zéro de la session.

Les contenus de la démonstration sont repris du livret élève CM2 fourni dans le projet (`26CM2E`). Le guide professeur (`26CM2P`) est conservé dans l'espace de travail pour guider l'intégration des exercices suivants et des consignes de passation.

## Structure du prototype

- `index.html` : point d'entrée et structure de l'interface ;
- `styles.css` : mise en page responsive pensée pour une tablette ;
- `app.js` : données des exercices, état de la session, rendu et interactions ;
- `README-prototype.md` : notes de développement et prochaines étapes.

## Développement local

Ouvrir `index.html` directement dans un navigateur, ou lancer un serveur statique local :

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000/`.

## Prochaines étapes

1. intégrer l'ensemble des exercices du livret ;
2. respecter les durées et les consignes du guide professeur ;
3. ajouter des interactions spécifiques (saisie, classement, glisser-déposer) selon chaque exercice ;
4. créer un espace enseignant avec restitution par élève et par compétence ;
5. ajouter les tests d'accessibilité et les tests sur tablette.
