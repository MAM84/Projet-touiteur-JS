# Projet touiteur JS

CEFIM : Formation : Cours JS

Projet fil rouge à rendre en fin de formation

Touiteur est un micro réseau social ou chacun est libre de partager un message avec d'autres utilisateurs.

Consignes :

Projet fil-rouge - Prérequis de la session
    Pour cette session, il vous est simplement demandé d'avoir une page web HTML & CSS prête à être utilisée pour le projet. La page doit admettre :
        Un formulaire d'envoi de touits contenant :
            Un champs pour saisir son pseudo (limité à 16 caractères).
            Un champs pour saisir son message (limité à 256 caractères).
            Un bouton pour valider et envoyer le touit.
        Une zone dans laquelle afficher les touits reçus :
            Vous utiliserez grid ou flexbox comme système de placement dans le HTML.
            Il y aura un conteneur composé d'éléments. Chaque élément enfant du conteneur représentera un touit.
            Les éléments enfants seront "écrits" dans le HTML dans l'ordre chronologique (le plus récent à la fin), cependant l'affichage sera du plus récent vers le plus ancien.
            Chaque touit devra afficher le message ainsi que le pseudo de son auteur.

    Vous pouvez également voir d'ores et déjà plus loin dans le projet en y incluant le HTML & CSS des fonctionnalités suivantes (cette partie est facultative et pourra être fait ultérieurement) :
        Un système en grid ou flexbox pour afficher les mots les plus couramment utilisés (que l'on pourrait appeler "trending").
        Un système pour "aimer" un touit.
        Un système pour commenter et voir la liste des commentaires d'un touit (via une modal, autre fenêtre ou directement dans le touit).
        Une zone qui affiche les touits aillant reçus le plus de "like" (peut être comparable à la zone des touits reçus).
        Un moyen de mettre en évidence les touits des auteurs les plus actifs (que l'on pourrait appeler "influenceurs").

Projet fil-rouge - Ajout dynamique d'éléments dans le DOM
    Grace aux connaissances que vous avez accumulées jusqu'ici, vous allez préparez des fonctions et évènements pour un usage ultérieur :

    Une fonction addTouit permettant d'ajouter un nouveau touit (ayant un nom d'auteur et un message spécifié) à la zone de touits. Elle devra donc créer un nouvel élément du DOM et l'ajouter à la liste éxistante. Point important, les touits dans la zone de touits doivent être triés du plus récent au plus ancien. 

    Un évènement déclenché à l'envoi du formulaire. Lorsqu'un utilisateur appuiera sur le bouton pour envoyer le touit, son nom d'utilisateur et son message sera affiché dans la console (pour le moment). Attention, la page ne doit pas être rechargée !