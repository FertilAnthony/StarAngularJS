# Getting started

## Structure du projet

```sh
.
├── Gulpfile.js
├── README.md
├── bower.json      // Dépendances bower
├── vendor          // Les lib tierces chargées par bower
├── dist
├── package.json    // Dépendances npm
├── app
│   ├── images      // Les images
│   ├── scripts     // Les fichiers JS
│   ├── styles      // Les feuilles de styles Sass
│   ├── views       // Les vues HTML
│   └── index.html  // Le point d'entrée de l'application
├── e2e-tests       // Tests protractor
└── tasks           // Déclaration des tâches Gulp
```

#### Détail du dossier app/scripts

Ce dossier contient le code JS de l'application. Il est composé des éléments suivants:

```sh
.
├── main.js         // Initialise l'application
├── vendor.js       // Charge les vendors
└── modules
    ├── ui          // Eléments graphiques (controller, directives, filtres, ...)
    ├── data        // Couche d'acces aux données
    ├── ...         //
    └── common      // Services transverses
```

Chaque module est constitué d'un fichier module.js qui déclare les composants (directives, controllers, services).

> Exemple de modules

```js
'use strict';

module.exports = angular
  .module('boilerplate.ui', [
    'boilerplate.common'
    'boilerplate.data'
  ])
  .controller('WelcomeController', require('./controllers/welcome'))
;
```

#### Détail du index.html

```html
<!DOCTYPE html>
<html data-ng-app="boilerplate.ui" data-ng-strict-di>
  <head>
    <base href="/" />
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Niji Angular Boilerplate</title>
    <link rel="stylesheet" href="./css/main.css" />
  </head>
  <body>
    <main data-ng-controller="WelcomeController as vm">
      <h1>Niji Angular Boilerplate</h1>
      <p>{{vm.welcomeMessage}}</p>
    </main>
    <script src="./js/vendor.js"></script>
    <script src="./js/app.js"></script>
  </body>
</html>
```

La balise html

```html
<html data-ng-app="boilerplate.ui" data-ng-strict-di>
```

- data-ng-app qui pointe vers le module ui de l'application a démarrer.
- data-ng-strict-di est un nouveauté d'AngularJS 1.3, cet attribut oblige à ce que les dépendances d'injection soient faites de manière explicite
