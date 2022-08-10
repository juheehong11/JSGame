/** @type {HTMLcanvas3Element} */

const canvas3 = document.getElementById("canvas3");
const ctx3 = canvas3.getContext("2d");
const numberOfEnemies3 = 20;
const enemiesArray3 = [];
canvas3_WIDTH = canvas3.width = 500;
canvas3_HEIGHT = canvas3.height = 1000;
let gameFrame3 = 0;

class Enemy3 {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemies/enemy3.png';
        this.speed = Math.random() * 10 + 1;
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        const div = Math.random()*1 + 1.5;
        this.width = this.spriteWidth / div;
        this.height = this.spriteHeight / div;
        this.x = Math.random() * (canvas3.width - this.width);
        this.y = Math.random() * (canvas3.height - this.height);
        this.frame = 0; 
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = Math.random() * 500; 
        this.angleSpeed = Math.random() * 2 + 0.6;
        this.curve = Math.random() * 200 + 50;
    }
    update() {
        this.x = canvas3.width/2 * Math.sin(this.angle * Math.PI/90) + canvas3.width/2 - this.width/2;
        this.y = canvas3.height/2 * Math.cos(this.angle * Math.PI/500) + canvas3.height/2 - this.height/2;
        if (this.x + this.width < 0) this.x = canvas3.width;
        this.angle += this.angleSpeed;
        // animate sprites
        if (gameFrame3 % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx3.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

for (let i = 0; i < numberOfEnemies3; i++) {
    enemiesArray3.push(new Enemy3());
}

function animate3() {
    ctx3.clearRect(0, 0, canvas3_WIDTH, canvas3_HEIGHT);
    enemiesArray3.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame3++;
    requestAnimationFrame(animate3);
};
animate3();
