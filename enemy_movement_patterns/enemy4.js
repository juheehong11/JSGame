/** @type {HTMLcanvas4Element} */

const canvas4 = document.getElementById("canvas4");
const ctx4 = canvas4.getContext("2d");
const numberOfEnemies4 = 10;
const enemiesArray4 = [];
canvas4_WIDTH = canvas4.width = 500;
canvas4_HEIGHT = canvas4.height = 1000;
let gameFrame4 = 0;

class Enemy4 {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemies/enemy4.png';
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 213;
        this.spriteHeight = 213;
        const div = Math.random()*1 + 1.5;
        this.width = this.spriteWidth / div;
        this.height = this.spriteHeight / div;
        this.x = Math.random() * (3*canvas4.width - this.width);
        this.y = Math.random() * (3*canvas4.height - this.height);
        this.newX = Math.random();
        this.newY = Math.random();
        this.frame = 0; 
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.interval = Math.floor(Math.random() * 200 + 50);
    }
    update() {
        if (gameFrame4 % this.interval === 0) {
            this.newX = Math.random() * (canvas4.width - this.width);
            this.newY = Math.random() * (canvas4.height - this.height);
        }
        let dx = this.x - this.newX;
        let dy = this.y - this.newY;
        this.x -= dx/20;
        this.y -= dy/20;
        if (this.x + this.width < 0) this.x = canvas4.width;
        // animate sprites
        if (gameFrame4 % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        ctx4.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}

for (let i = 0; i < numberOfEnemies4; i++) {
    enemiesArray4.push(new Enemy4());
}

console.log(enemiesArray4);

function animate4() {
    ctx4.clearRect(0, 0, canvas4_WIDTH, canvas4_HEIGHT);
    enemiesArray4.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame4++;
    requestAnimationFrame(animate4);
};
animate4();
