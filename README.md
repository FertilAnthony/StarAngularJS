# Niji AngularJS Boilerplate v0.7.0

Fournit une structure de base pour les projets AngularJS

## Installation

> L'installation en globale de gulp et bower est optionelle

```sh
# Depuis le réseau Niji uniquement, configuration de git pour bower
git config url."https://".insteadOf git://
```

```sh
# Démarre le boilerplate
npm start
```

## Production

Pour packager l'application en environnement de production (sans sourcemaps)

```sh
npm run build
```

## Tests

> Installation de protractor en global obligatoire

```sh
npm install -g protractor
```

Execution des tests e2e

```sh
npm run protractor
```

## FAQ

- L'installation ne fonctionne pas
  - Vérifier que le fichier .bowerrc est bien présent dans votre installation
- Le dossier vendor n'est pas créé apres un `npm install`
  - Cela peut venir du faire que le fichier `.bowerrc` n'a pas été copié lors de l'installation
- La commande `npm install` n'a pas fonctionné
  - Supprimer le dossier node_modules et relancer la commande `npm install`
- Comment installer une nouvelle dépendance npm ou bower
  - Ajouter une entrée dans le fichier bower.json ou package.json puis executer la commande npm install
