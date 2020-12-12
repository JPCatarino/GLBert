qbertJumpSound = new sound("sounds/jump.mp3");
enemyJumpSound = new sound("sounds/jump-2.mp3");
winSound = new sound("sounds/tune-2.mp3");
collideSound = new sound("sounds/swear.mp3");
fallSound = new sound("sounds/fall.mp3");
liftSound = new sound("sounds/lift.mp3");

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }