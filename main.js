document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const startButton = document.querySelector(".start-btn");
  const restartButton = document.getElementById("restart-btn");
  const container = document.querySelector(".item-container");

  let animationDuration = 6;
  let totalImages = 9;
  let timer;
  let countdown = 90;
  let isGameRunning = false;

  const emotions = [
    "La Colère",
    "L'Envie",
    "Le Dégoût",
    "La Peur",
    "La Joie",
    "La Tristesse",
    "L'Anxiété",
    "L'Ennui",
    "L'Embarras",
  ];

  const contextMessages = [
    [
      "tu viens de rater ton bus, ton train 2 fois d'affilé et tu viens de te faire chier dessus par un pigeon",
      "Tu arrives enfin à ton rendez-vous après avoir lutté contre une pluie battante, seulement pour découvrir que ton portable s'est éteint à cause de la batterie vide, et tu t'es trompé de lieu. En plus, ton rendez-vous est déjà parti",
    ],
    [
      `Tu es en train de regarder un ami qui dévore une pizza énorme devant toi, les yeux pleins de satisfaction, mais tu sais que tu dois aller continuer ta diet`,
      `Tu passes devant une boulangerie et tu vois une vitrine pleine de pâtisseries. Tu imagines comment ce croissant au chocolat fondant te ferait tellement plaisir, mais tu te rends compte que tu n'as que 10ct en poche, et tu dois choisir entre de l'air ou du vide`,
    ],
    [
      `Tu trouves un vieux yaourt au fond de ton frigo, et en lisant la date de péremption, tu réalises qu'il est là depuis plus de deux mois. Tu hésites à l'ouvrir, mais ta curiosité te pousse à le faire. Quand tu découvres la texture et l'odeur, tu es à deux doigts de courir à la salle de bain.`,
      `Après avoir mangé un repas délicieux, tu vas dans le jardin et tu croises un insecte géant qui semble vouloir t'attaquer. C'est la panique, tu veux absolument l'éviter, mais au moment où tu t'éloignes, tu t'assois sur une chaise… qui, malheureusement, est envahie par des fourmis.`,
    ],
    [
      `Tu es seul(e) à la maison, et en allumant une lumière, tu vois une silhouette floue dans le miroir. Tu sursautes, puis tu réalises que c'est juste ton reflet après avoir mangé une pizza à minuit, et tu es à moitié déguisé(e) en zombie.`,
      `En rentrant chez toi tard, tu entends des bruits bizarres venant de l'étage. En te dirigeant prudemment, tu réalises que c'est juste ton chat qui a décidé de jouer avec un rouleau de papier toilette… Mais pendant un moment, tu as cru que c'était un fantôme.`,
    ],
    [
      `Tu passes un entretien d'embauche catastrophique, et quand tu rentres chez toi, tu pleures presque. Mais le lendemain, tu reçois un appel… c'était pour t'annoncer que tu as été retenu, et là tu réalises que t'as carrément oublié pourquoi tu pleurais !`,
      `Tu décides de te lancer dans un régime et de commencer à faire du sport. Après une semaine de sacrifices et d'efforts, tu te pèses… tu as perdu 100 grammes. Et là, tu éclates de rire en te disant : "Bah, c'est déjà mieux que rien !"`,
    ],
    [
      `Tu prépares un café pour te remonter le moral, mais à chaque gorgée, tu te rends compte qu'il n'y a plus de sucre, plus de lait et que le café est devenu aussi amer que ta journée. Et tu te dis… C'est le café qui me déteste maintenant.`,
      `Tu fais du ménage et tu retrouves un vieux cadeau d'anniversaire de ton ex. Tu le regardes longuement, et tout à coup, tu réalises que l'emballage est toujours intact... La tristesse te frappe en pensant qu'il/elle t"avait acheté un cadeau, mais que toi, tu l"as jamais déballé.`,
    ],
    [
      `Tu attends un appel important et, à chaque vibration de ton téléphone, tu sursautes, même si c'est juste une notification Instagram.
    `,
      `Tu essaies de t'endormir, mais tu n'arrêtes pas de penser : "Et si j'ai laissé la lumière allumée ? Et si mon téléphone explose ?"`,
    ],
    [
      `Pendant un cours, tu regardes l'horloge toutes les deux secondes, et tu réalises que le temps avance… à reculons.`,
      `Tu es dans une réunion ennuyeuse et tu te retrouves à dessiner des bonhommes sur ta feuille. Quand tu te rends compte, tu as passé 20 minutes à dessiner un éléphant.`,
    ],
    [
      `En envoyant un message à ton pote, tu te rends compte que tu as accidentellement écrit "Je t'aime" à ton boss. Tu paniques et essaies de rattraper ça avec un "C'était une faute de frappe !".`,
      `Tu veux faire une blague pendant un dîner, mais en te levant pour aller chercher un verre d'eau, tu trébuches et renverses ton plat sur la personne en face de toi.`,
    ],
  ];

  startButton.addEventListener("click", function () {
    if (!isGameRunning) {
      resetGame();
      slowDownAnimation();
    }
  });

  restartButton.addEventListener("click", function () {
    resetGame();
    slowDownAnimation();
  });

  function resetGame() {
    animationDuration = 6;
    countdown = 90;
    isGameRunning = true;

    slider.style.animation = "none";
    slider.style.transform = "";
    startButton.style.display = "none";
    restartButton.style.display = "none";
    container.style.display = "none"; // Cacher le bloc contexte

    clearInterval(timer); // Empêcher les timers superposés
  }

  function slowDownAnimation() {
    let interval = setInterval(() => {
      animationDuration += 1.5;
      slider.style.animation = `autoRun ${animationDuration}s linear infinite`;

      if (animationDuration >= 8) {
        clearInterval(interval);
        setTimeout(() => {
          let randomIndex = Math.floor(Math.random() * totalImages);
          stopAtImage(randomIndex);
        }, 1000);
      }
    }, 700);
  }

  function stopAtImage(imageIndex) {
    let anglePerImage = 360 / totalImages;
    let rotationAngle = imageIndex * anglePerImage;
    slider.style.top = "20%";
    slider.style.animation = "none";
    slider.style.transform = `perspective(1000px) rotateX(-5deg) rotateY(-${rotationAngle}deg)`;

    setTimeout(() => {
      showItemBlock(imageIndex);
    }, 1000);
  }

  function showItemBlock(imageIndex) {
    if (!contextMessages[imageIndex]) return;

    container.style.display = "flex"; // Afficher le contexte

    const boxes = container.children;
    boxes[0].querySelector("p").innerText = emotions[imageIndex];

    const phrases = contextMessages[imageIndex];
    const selectedPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    boxes[1].querySelector("p").innerHTML = selectedPhrase;

    const timerDisplay = boxes[2].querySelector("p");
    timerDisplay.id = "timerDisplay";
    timerDisplay.innerHTML = `Timer: ${countdown}s`;

    restartButton.style.display = "block"; // Afficher "Rejouer"
    startTimer();
  }

  function startTimer() {
    clearInterval(timer); // Arrêter le précédent timer pour éviter la superposition
    const timerDisplay = document.getElementById("timerDisplay");

    timer = setInterval(() => {
      if (countdown > 0) {
        countdown--;
        timerDisplay.innerHTML = `Timer: ${countdown}s`;
      } else {
        clearInterval(timer);
        timerDisplay.innerHTML = "Temps écoulé!";
        restartButton.style.display = "block";
      }
    }, 1000);
  }
});
