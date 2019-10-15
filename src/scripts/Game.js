let enemyCreationInterval;
let enemyFireInterval;
let collisionCheckInterval;
let observeEnemyBulletsInterval;
let observeEnemyPositionInterval;

class Game {
  static score = 0;

  static enemyCounter = 1;

  static playerName = '';

  static playType = 0;

  // static level = easyLevel;

  /**
   * Creates a new instance of Enemy and set it's starting position
   */
  static createEnemy = () => {
    const img = document.createElement('img');
    img.className = 'enemy';
    img.setAttribute('src', './assets/EnemyPlane_1.png');
    img.style.position = 'fixed';
    img.style.objectFit = 'cover';
    img.style.width = '200px';
    img.style.left = '90%';
    img.style.top = `${Math.floor(Math.random() * (window.innerHeight - img.height)) + 90}px`;
    img.id = this.enemyCounter.toString();
    const enemyObj = new Enemy(img.id, img, 'enemyA');
    document.getElementById('play-area').appendChild(img);
    // add enemy object to enemies list
    Observer.addEnemy(enemyObj);
    enemyObj.move();
    this.enemyCounter++;
  };

  /**
   *  Creates a new instance of Enemy and set it's starting position
   */

  static createPlayer = () => {
    const img = document.createElement('img');
    img.id = 'player';
    img.style.height = '150px';
    img.style.width = '200px';
    img.style.position = 'fixed';
    img.setAttribute('src', './assets/PlayerPlane_1.png');
    img.style.top = `${window.innerHeight / 2 - parseInt(img.style.height.slice(0, -2)) + 90}px`;
    document.getElementById('play-area').appendChild(img);

    const player = new Player('PLayer', img);
    Observer.playerObject = player;
    document.addEventListener('keydown', event => {
      player.move(event.keyCode);
    });
  };

  /**
   * Inits player object, setInterval for creating enemies depending on the current level
   * Sets another interval that calls `Observer.observePlayerBullets` and `Observer.observeEnemiesBullets`
   */
  static start = () => {
    // Create Player
    this.createPlayer();

    // Create enemies
    enemyCreationInterval = setInterval(() => {
      this.createEnemy();
    }, 1000);

    enemyFireInterval = setInterval(() => {
      const enemyIndex = Observer.getRandomEnemy();
      if (Observer.enemies.length > 0) Observer.enemies[enemyIndex].fire();
    }, 750);

    collisionCheckInterval = setInterval(() => {
      Observer.observePlayerBullets();
    }, 200);

    observeEnemyBulletsInterval = setInterval(() => {
      Observer.observeEnemiesBullets();
    }, 20);

    observeEnemyPositionInterval = setInterval(() => {
      Observer.observeEnemiesPosition();
    }, 100);
  };

  /**
   * Ends the game
   */
  static end = () => {
    clearInterval(enemyCreationInterval);
    clearInterval(collisionCheckInterval);
    clearInterval(enemyFireInterval);
    clearInterval(observeEnemyBulletsInterval);
    clearInterval(observeEnemyPositionInterval);
  };

  /**
   * Ends the game once the player health is 0
   */
  static checkGameStatus = () => {};

  static updatePlayerScore = (score = 50) => {
    const scoreElement = document.getElementById('Score');
    this.score += score;
    scoreElement.textContent = this.score;
  };

  static PlayerHealth = () => {
    const Health = document.getElementById('slider');
    if (Health.offsetWidth <= 50) {
     var GameOverBTN = document.getElementById("GameOverBTN");
     var PlayerScore = document.getElementById("Player-score");
     PlayerScore.textContent = this.score;
     GameOverBTN.click();
    
    }
    Health.style.width = `${Health.offsetWidth - 500}px`;
    if (Health.offsetWidth > 200) {
      Health.style.backgroundColor = 'green';
    } else {
      Health.style.backgroundColor = 'red';
    }
  };
}

// START GAME
Game.start();
