<!-- README.md -->

# Extension de navigateur: Help IA

**Description du projet**

**Help IA** est une extension chrome conçue pour aider les utilisateurs à obtenir rapidement des informations (résumés ou explications) fournies par l'IA pour tout texte mis en évidence sur une page web. Une fois installée, l'extension est à l'écoute des sélections de texte. Lorsque l'utilisateur surligne un texte sur une page et relâche la souris, une petite fenêtre contextuelle apparaît, offrant deux options : **"Résumer "** (Summarize) et **”Expliquer "** (Explain). 

Si l'utilisateur sélectionne l'une de ces options, l'extension ouvre automatiquement un nouvel onglet ChatGPT, où le texte choisi et une instruction pertinente (résumer ou expliquer) sont injectés dans la zone de saisie de ChatGPT. Cela simplifie le processus de recherche d'une assistance immédiate de l'IA sans qu'il soit nécessaire de copier, de changer d'onglet et de coller manuellement.

### Comment ça marche

1. **Détection de la sélection de texte**  
   - Un récepteur d'événements `mouseup` capture le texte mis en évidence par l'utilisateur.  
   - Si un texte valide est mis en évidence, une fenêtre contextuelle est créée à proximité du curseur de la souris.

2. **Création de la fenêtre contextuelle**
   - La fenêtre contextuelle (stylisée par CSS) contient une icône et deux boutons : _Summarize_ et _Explain_.  
   - En cliquant sur l'un de ces boutons, le texte mis en évidence et le mode choisi (résumé/explication) sont stockés dans la mémoire locale de Chrome.

3. **Pseudo-Intégration de ChatGPT**  
   - L'extension ouvre un nouvel onglet de navigateur pointant vers l'interface de ChatGPT (`https://www.chatgpt.com` dans l'exemple fourni).  
   - Un script de contenu (`script_chatgpt.js`) s'exécute sur la page de ChatGPT, récupère le texte et le mode stockés dans le stockage local, et injecte ce contenu dans la zone de texte de ChatGPT.  
   - Enfin, il simule un clic sur le bouton « Envoyer » du ChatGPT, ce qui incite le ChatGPT à traiter la demande immédiatement.

4. **Nettoyage automatique**  
   - Une fois que le texte de l'utilisateur est envoyé à ChatGPT, le texte stocké est supprimé de la mémoire locale.  
   - La fenêtre contextuelle est supprimée après l'interaction, ce qui garantit une expérience utilisateur propre.

### Caractéristiques principales

- _Assistance contextuelle de l'IA_ : Recherche rapide de résumés ou d'explications pour tout texte sélectionné.  
- _Intégration transparente avec ChatGPT_ : Ouvre et alimente automatiquement ChatGPT, éliminant ainsi les étapes manuelles de copier-coller.  
- _Interface utilisateur minimale_ : Une petite fenêtre intuitive apparaît lors de la sélection du texte, réduisant ainsi l'encombrement de la page.  
- _Personnalisable et extensible_ : Construit à l'aide de technologies web standard (JavaScript, HTML, CSS) et des API de Chrome, ce qui permet de l'adapter ou de l'étendre facilement.

### Points forts techniques

- _Manifeste Chrome V3_ : Garantit des normes d'extension de navigateur modernes et sûres.  
- _Utilisation du stockage local_ : Stocke le texte sélectionné par l'utilisateur et l'action choisie (résumer/expliquer) pour la récupération sur la page ChatGPT.  
- _Architecture pilotée par l'événement_ : Écoute des événements `mouseup` sur les pages web et des événements DOM sur ChatGPT.  
- _Intervalles et nettoyage programmés_ : Utilise des intervalles définis et des timeouts pour gérer l'injection de contenu asynchrone et pour nettoyer si l'interface de ChatGPT n'est pas disponible pendant une certaine durée.

En résumé, **Help IA** permet aux utilisateurs de tirer parti des capacités de traitement du langage naturel de ChatGPT pour comprendre ou résumer n'importe quel texte trouvé sur le web.