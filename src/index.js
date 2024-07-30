document.addEventListener("DOMContentLoaded", () => {
  const holes = document.querySelectorAll('.hole');
  const moles = document.querySelectorAll('.mole');
  const startButton = document.querySelector('#start');

  const score = document.querySelector('#score');
  const timerDisplay = document.querySelector('#timer');

  let time = 0;
  let timer;
  let lastHole;
  let points = 0;
  let difficulty = "hard";

  /**
   * Generates a random integer within a range.
   * Just a handy utility function to generate random numbers.
   */
  function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Sets the delay based on difficulty
   * This decides how fast the moles will appear based on the difficulty level.
   */
  function setDelay(difficulty) {
    if (difficulty === "easy") {
      return 1500;
    } else if (difficulty === "normal") {
      return 1000;
    } else if (difficulty === "hard") {
      return randomInteger(600, 1200);
    } else {
      throw new Error("Invalid difficulty level");
    }
  }

  /**
   * Chooses a random hole from the list of holes, ensuring no double holes
   * Let's make sure we don't pick the same hole twice in a row.
   */
  function chooseHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    if (hole === lastHole) {
      return chooseHole(holes);
    } else {
      lastHole = hole;
      return hole;
    }
  }

  /**
   * Calls the showUp function if time > 0 and stops the game if time = 0.
   * Checks if the game should continue or stop. Keeps the game running if there's still time left.
   */
  function gameOver(time) {
    if (time > 0) {
      const timeoutId = showUp();
      return timeoutId;
    } else {
      stopGame();
      return "game stopped";
    }
  }

  /**
   * Calls the showAndHide() function with a specific delay and hole.
   * Time to make a mole pop up! Chooses a hole and sets the delay.
   */
  function showUp() {
    const delay = setDelay(difficulty);
    const hole = chooseHole(holes);
    return showAndHide(hole, delay);
  }

  /**
   * Shows and hides the mole given a delay time and the hole where the mole is hidden.
   * This function makes the mole visible, then hides it after a delay.
   */
  function showAndHide(hole, delay) {
    toggleVisibility(hole); // Show the mole
    const timeoutID = setTimeout(() => {
      toggleVisibility(hole); // Hide the mole after the delay
      gameOver(time); // Check if the game should continue or stop
    }, delay);
    return timeoutID;
  }

  /**
   * Adds or removes the 'show' class that is defined in styles.css to a given hole.
   * Toggle the visibility of the mole in the given hole.
   */
  function toggleVisibility(hole) {
    hole.classList.toggle('show');
    return hole;
  }

  /**
   * Increments the points global variable and updates the scoreboard.
   * Update the score every time a mole is whacked.
   */
  function updateScore() {
    points += 1;
    score.textContent = points;
    return points;
  }

  /**
   * Clears the score by setting `points = 0` and updates the board.
   * Reset the score to 0 at the start of each game.
   */
  function clearScore() {
    points = 0;
    score.textContent = points;
    return points;
  }

  /**
   * Updates the control board with the timer if time > 0
   * Keep the timer ticking down.
   */
  function updateTimer() {
    if (time > 0) {
      time -= 1;
      timerDisplay.textContent = time;
    }
    return time;
  }

  /**
   * Starts the timer using setInterval. For each 1000ms (1 second) the updateTimer function gets called.
   * Start the countdown timer for the game.
   */
  function startTimer() {
    timer = setInterval(updateTimer, 1000);
    return timer;
  }

  /**
   * Event handler for when a player clicks on a mole.
   * Increment the score whenever a mole is clicked (whacked).
   */
  function whack(event) {
    updateScore();
    return points;
  }

  /**
   * Adds the 'click' event listeners to the moles.
   * Set up event listeners on all the moles so they can be whacked.
   */
  function setEventListeners() {
    moles.forEach(mole => {
      mole.addEventListener('click', whack);
    });
    return moles;
  }

  /**
   * Sets the duration of the game.
   * Define how long the game will last.
   */
  function setDuration(duration) {
    time = duration;
    return time;
  }

  /**
   * Called when the game is stopped. It clears the timer using clearInterval. Returns "game stopped".
   * Stop the game and clear the timer.
   */
  function stopGame() {
    clearInterval(timer);
    return "game stopped";
  }

  /**
   * Starts the game when the `startButton` is clicked.
   * Let's get this game started! Resets everything and kicks off the mole popping.
   */
  function startGame() {
    console.log("Game starting...");
    clearScore();
    console.log("Score cleared.");
    setDuration(10); // Example duration
    console.log("Duration set.");
    startTimer();
    console.log("Timer started.");
    showUp();
    console.log("First mole shown.");
    return "game started";
  }

  // Ensure startButton exists before adding event listener
  if (startButton) {
    startButton.addEventListener("click", startGame);
  } else {
    console.error("Start button not found");
  }

  // Set event listeners for moles
  setEventListeners();
});

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
