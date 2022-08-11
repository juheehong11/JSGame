const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;
const explosions = [];
let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
    constructor(x, y) {
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth * 0.7;
        this.height = this.spriteHeight * 0.7;
        this.x = x - this.width/2;
        this.y = y - this.height/2;
        this.image = new Image();
        this.image.src = "boom.png";
        this.frame = 0;
        this.timer = 0;
        this.angle = Math.random() * 6.2;
    }
    update() {
        this.timer++;
        if (this.timer % 10 === 0) {
            this.frame++;
        }
    } 
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight,
                      this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}

// window.addEventListener('click', function(e) {
//     ctx.fillStyle = 'white';
//     ctx.fillRect(e.x - canvasPosition.left-25, e.y - canvasPosition.top-25, 50, 50);
// });

function createAnimation(e) {
    let positionX = e.x - canvasPosition.left;
    let positionY = e.y - canvasPosition.top;

    explosions.push(new Explosion(positionX, positionY));
}

window.addEventListener('click', function(e) {
    createAnimation(e);
});

window.addEventListener('mousemove', function(e) {
    createAnimation(e);s
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < explosions.length; i++) {
        explosions[i].update();
        explosions[i].draw();
        if (explosions[i].frame > 5) {
            explosions.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
};
animate();