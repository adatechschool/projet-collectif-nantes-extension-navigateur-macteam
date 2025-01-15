# Organisation de l'équipe

### Git workflow

#### Branches primordiales

- **main** : branche principale à ne pas toucher _(sauf pour les mise en production)_

- **dev** : branche de développement _(à partir de laquelle on crée des branches de fonctionnalités et on merge les branches de fonctionnalités)_

#### Branches de fonctionnalités

- **feature/(nom-de-la-fonctionnalité-initiale-dev)** : branche de fonctionnalité _(à partir de la branche dev)_

## Processus git flow pour une nouvelle fonctionnalité

Avant de commencer :

1. `git checkout dev` : on se place sur la branche dev
2. `git pull origin dev` : on s'assure de récupérer les mises à jour de la branche dev
3. `git branch feature/(nom-de-la-fonctionnalité)` : on crée une nouvelle branche de fonctionnalité
4. `git checkout feature/(nom-de-la-fonctionnalité)` : on se place sur la nouvelle branche de fonctionnalité

Après avoir effectué des modifications :


5. `git add .` : on ajoute les fichiers modifiés
6. `git commit -m "message"` : on commit les modifications
7. `git push origin feature/(nom-de-la-fonctionnalité)` : on push la branche de fonctionnalité sur le repo distant
8. on crée une pull request sur github pour merger la branche de fonctionnalité sur la branche dev
9. En cas de conflit, on résout le conflit en local, on commit et on push à nouveau. Pour cela, il faut:

- `git checkout dev` : on se place sur la branche dev
- `git pull origin dev` : on s'assure de récupérer les mises à jour de la branche dev
- `git checkout feature/(nom-de-la-fonctionnalité)` : on se place sur la branche de fonctionnalité
- `git rebase dev` : on rebase la branche de fonctionnalité sur la branche dev
- on résout les conflits en local
- `git add .` : on ajoute les fichiers modifiés (résolution des conflits)
- `git rebase --continue` : on continue le rebase
- `git push origin feature/(nom-de-la-fonctionnalité)` : on push la branche de fonctionnalité sur le repo distant
- on crée une pull request sur github pour merger la branche de fonctionnalité sur la branche dev
