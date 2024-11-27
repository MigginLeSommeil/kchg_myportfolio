document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");
    const startupScreen = document.getElementById("startup-screen");
    const topBar = document.querySelector(".top-bar");
    const dock = document.querySelector(".dock");
    const windowsContainer = document.getElementById("windows-container");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (username === "visiteur" && password === "Explorer!") {
        // Identifiants corrects : masquer l'écran de démarrage et afficher le site
        startupScreen.style.display = "none";
        topBar.style.display = "flex";
        dock.style.display = "block";
        windowsContainer.style.display = "block";
      } else {
        // Identifiants incorrects : afficher un message d'erreur
        errorMessage.textContent = "Identifiant ou mot de passe incorrect.";
      }
    });
  });
  
const dockItems = document.querySelectorAll('.dock li');
const windowsContainer = document.getElementById('windows-container');
const dateTimeElement = document.querySelector('.date-time');

// Crée une nouvelle fenêtre
function createWindow(title, page) {
  const windowElement = document.createElement('div');
  windowElement.classList.add('window');
  windowElement.innerHTML = `
    <div class="window-header">
      <span class="title">${title}</span>
      <div class="controls">
        <button class="minimize">➖</button>
        <button class="maximize">🗖</button>
        <button class="close">✖</button>
      </div>
    </div>
    <div class="window-content">
      <iframe src="${page}" frameborder="0" style="width: 100%; height: 100%;"></iframe>
    </div>
  `;

  // Place initiale de la fenêtre
  windowElement.style.top = `${Math.random() * 200 + 50}px`; // Position initiale aléatoire
  windowElement.style.left = `${Math.random() * 200 + 50}px`;

  // Boutons de gestion
  const closeButton = windowElement.querySelector('.close');
  closeButton.addEventListener('click', () => windowElement.remove());

  const minimizeButton = windowElement.querySelector('.minimize');
  minimizeButton.addEventListener('click', () => {
    const content = windowElement.querySelector('.window-content');
    content.classList.toggle('hidden');
  });

  const maximizeButton = windowElement.querySelector('.maximize');
  maximizeButton.addEventListener('click', () => {
    windowElement.classList.toggle('maximized');
  });

  // Ajout du déplacement de la fenêtre
  addDragFunctionality(windowElement);

  // Ajoute la fenêtre au conteneur principal
  windowsContainer.appendChild(windowElement);
}

// Permet le glisser-déposer des fenêtres
function addDragFunctionality(windowElement) {
  const header = windowElement.querySelector('.window-header');

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - windowElement.offsetLeft;
    offsetY = e.clientY - windowElement.offsetTop;
    windowElement.style.zIndex = 1000; // Amène la fenêtre au premier plan
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      windowElement.style.left = `${e.clientX - offsetX}px`;
      windowElement.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

// Associe chaque icône à une fenêtre
dockItems.forEach((item) => {
  item.addEventListener('click', () => {
    const page = item.getAttribute('data-page');
    const title = item.textContent.trim();
    createWindow(title, page);
  });
});

// Fonction pour mettre à jour l'heure et la date actuelles
function updateDateTime() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString('fr-FR', options);
  const formattedTime = now.toLocaleTimeString('fr-FR');

  dateTimeElement.textContent = `${formattedDate} ${formattedTime}`;
}

// Met à jour l'heure toutes les secondes
setInterval(updateDateTime, 1000);

  
// Variables nécessaires pour le déplacement
let isDragging = false;
let offsetX = 0, offsetY = 0;

// On récupère l'élément du post-it et de l'en-tête
const postIt = document.getElementById('post-it');
const postItHeader = document.getElementById('post-it-header');

// Quand l'utilisateur commence à cliquer sur l'en-tête du post-it
postItHeader.addEventListener('mousedown', (e) => {
  // Indiquer qu'on commence à déplacer le post-it
  isDragging = true;
  
  // Calculer la position de la souris par rapport au coin supérieur gauche du post-it
  offsetX = e.clientX - postIt.offsetLeft;
  offsetY = e.clientY - postIt.offsetTop;
  
  // Ajouter les événements pour le déplacement
  document.addEventListener('mousemove', movePostIt);
  document.addEventListener('mouseup', stopDragging);
});

// Fonction pour déplacer le post-it
function movePostIt(e) {
  if (isDragging) {
    // Calculer la nouvelle position du post-it
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;
    
    // Appliquer la nouvelle position
    postIt.style.left = `${newX}px`;
    postIt.style.top = `${newY}px`;
  }
}

// Fonction pour arrêter le déplacement lorsque l'utilisateur relâche le clic
function stopDragging() {
  isDragging = false;
  document.removeEventListener('mousemove', movePostIt);
  document.removeEventListener('mouseup', stopDragging);
}

// Fonction pour fermer le post-it
function closePostIt() {
  document.querySelector('.post-it').style.display = 'none';
}
