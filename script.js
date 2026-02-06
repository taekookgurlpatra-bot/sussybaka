window.onload = () => {

  const page1 = document.getElementById("page1");
  const page2 = document.getElementById("page2");
  const page3 = document.getElementById("page3");
  const page4 = document.getElementById("page4");

  const gameArea = document.getElementById("game-area");
  const catcher = document.getElementById("catcher");
  const scoreText = document.getElementById("score");

  let score = 0;
  const target = 15;
  let gameInterval;

  // --- Move catcher ---
  function moveCatcher(x) {
    const rect = gameArea.getBoundingClientRect();
    let newX = x - rect.left - catcher.offsetWidth/2;
    if(newX < 0) newX = 0;
    if(newX > gameArea.offsetWidth - catcher.offsetWidth) newX = gameArea.offsetWidth - catcher.offsetWidth;
    catcher.style.left = `${newX}px`;
  }

  gameArea.addEventListener("mousemove", e => moveCatcher(e.clientX));
  gameArea.addEventListener("touchmove", e => {
    e.preventDefault();
    moveCatcher(e.touches[0].clientX);
  }, { passive: false });

  // --- Hearts ---
  function createHearts(x, y) {
    for(let i=0;i<5;i++){
      const heart = document.createElement("div");
      heart.textContent = "❤️";
      heart.style.position = "absolute";
      heart.style.left = x + Math.random()*20 -10 + "px";
      heart.style.top = y + "px";
      heart.style.fontSize = "20px";
      heart.style.opacity = 1;
      gameArea.appendChild(heart);

      let top = y;
      let opacity = 1;
      const interval = setInterval(()=>{
        top -= 2;
        opacity -= 0.03;
        heart.style.top = top + "px";
        heart.style.opacity = opacity;
        if(opacity<=0){ heart.remove(); clearInterval(interval);}
      },30);
    }
  }

  // --- Create chocolate ---
  function createChocolate() {
    const choc = document.createElement("div");
    choc.classList.add("chocolate");
    choc.textContent = "🍫";
    choc.style.left = Math.random()*(gameArea.offsetWidth-30)+"px";
    choc.style.top = "-50px";
    gameArea.appendChild(choc);

    const fall = setInterval(()=>{
      let top = parseInt(choc.style.top);
      top += 5;
      choc.style.top = top + "px";

      const catcherRect = catcher.getBoundingClientRect();
      const chocRect = choc.getBoundingClientRect();

      if(!(catcherRect.right < chocRect.left ||
           catcherRect.left > chocRect.right ||
           catcherRect.bottom < chocRect.top ||
           catcherRect.top > chocRect.bottom)){
        score++;
        scoreText.textContent = `Chocolates: ${score}/${target}`;

        const splash = document.createElement("div");
        splash.textContent = "🍫💥";
        splash.style.position = "absolute";
        splash.style.left = chocRect.left - gameArea.getBoundingClientRect().left + "px";
        splash.style.top = chocRect.top - gameArea.getBoundingClientRect().top + "px";
        splash.style.fontSize = "35px";
        gameArea.appendChild(splash);
        setTimeout(()=>splash.remove(),500);

        createHearts(catcherRect.left - gameArea.getBoundingClientRect().left, catcherRect.top - gameArea.getBoundingClientRect().top);

        choc.remove();
        clearInterval(fall);

        if(score >= target){
          clearInterval(gameInterval);
          setTimeout(()=>{
            page2.style.display = "none";
            page3.style.display = "block";
          },500);
        }
      }

      if(top > gameArea.offsetHeight){ choc.remove(); clearInterval(fall);}
    },30);
  }

  // --- Start game ---
  function startGame(){
    score = 0;
    scoreText.textContent = `Chocolates: 0/${target}`;
    document.querySelectorAll(".chocolate").forEach(c=>c.remove());
    gameInterval = setInterval(()=>{
      if(score < target) createChocolate();
    },700);
  }

  // --- Button clicks ---
  document.getElementById("next1").onclick = ()=>{
    page1.style.display = "none";
    page2.style.display = "block";
    startGame();
  }

  document.getElementById("next2").onclick = ()=>{
    page3.style.display = "none";
    page4.style.display = "block";
  }
}
