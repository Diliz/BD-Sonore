Ionic app

Pour lancer l'application en mode serveur, il faudra les prérequis suivant sur ton pc:

Git:

windows: https://git-scm.com/download/win
mac: https://git-scm.com/download/mac (généralement j'utilise la version dispo dans xcode)


Node:

https://nodejs.org/en/

Ionic: (dans un terminal une fois le reste installé, utiliser git bash sur windows)

si windows:
sudo npm i -g cordova ionic

si mac, mettre sudo:
sudo npm i -g cordova ionic

Ensuite, dans le dossier racine du projet (à côté des dossiers www/scss et hooks), toujours dans un terminal, faire ionic serveur

Normalement cela devrait lancer un serveur local avec l'application lancée dedans, et ça devrait t'ouvrir une page web, sinon le terminal devrait t'avoir dit un truc du genre:

running dev server: http://localhost:8100 (ou un autre port pour le localhost)

récupère le localhost:8100 et ouvre une page web avec cette adresse, tu devrais voir ton application lancée.
