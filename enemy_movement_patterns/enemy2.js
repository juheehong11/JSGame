/** @type {HTMLcanvas2Element} */

const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
const numberofEnemies2 = 20;
const enemiesArray2 = [];
canvas2_WIDTH = canvas2.width = 500;
canvas2_HEIGHT = canvas2.height = 1000;
let gameFrame2 = 0;

class Enemy2 {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemies/enemy2.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 266;
        this.spriteHeight = 188;
        const div = Math.random()*1 + 1.5;
        this.width = this.spriteWidth / div;
        this.height = this.spriteHeight / div;
        this.x = Math.random() * (canvas2.width - this.width);
        this.y = Math.random() * (canvas2.height - this.height);
        this.frame = 0; // frame index
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0; // Math.random()*2;
        this.angleSpeed = Math.random()*0.2;
        this.curve = Math.random() * 7;
    }
    update() {
        this.x -= this.speed; 
        if (this.x + this.width < 0) this.x = canvas2.width;
        this.angle += this.angleSpeed;
        this.y += this.curve * Math.sin(this.angle);
        // animate sprites
        if (gameFrame2 % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx2.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

for (let i = 0; i < numberofEnemies2; i++) {
    enemiesArray2.push(new Enemy2());
}

function animate2() {
    ctx2.clearRect(0, 0, canvas2_WIDTH, canvas2_HEIGHT);
    enemiesArray2.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame2++;
    requestAnimationFrame(animate2);
};
animate2();
