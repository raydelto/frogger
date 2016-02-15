var MOV_X = 101;
var MOV_Y = 83;
var posiciones_y = [63,71*2,75*3];
var posiciones_x = [MOV_X,MOV_X*2,MOV_X*3];
var gemas = ['images/Gem Blue.png','images/Gem Orange.png','images/Gem Green.png'];

var generarNumero = function(){
	
	var numero = Math.random();

	if (numero < 0.34) {
		return 1;
	} else if(numero <= 0.67) {
		return 2;
	} else {
		return 3;
	} 
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = 0;
	this.y = 20;
	this.ancho = 50;
	this.alto = 85;
	this.velocidad = generarNumero();
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x = this.x + MOV_X * dt * this.velocidad;
	if(this.x > 480){
		this.x = 0;
		this.y = posiciones_y[generarNumero()-1];
		this.velocidad = generarNumero();
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Gema = function(){
	this.x = posiciones_x[generarNumero()-1];
	this.y = posiciones_y[generarNumero()-1];
	this.alto = 50;
	this.ancho = 85;
	this.solido = true;
	this.sprite = gemas[generarNumero()-1];
};

Gema.prototype.render = function(){
	if(this.solido){
	ctx.drawImage(Resources.get(this.sprite), this.x+25, this.y+60, this.alto, this.ancho);
	}else{
		gema.reiniciar();
	}
};

Gema.prototype.reiniciar = function(){
	this.x = posiciones_x[generarNumero()-1];
	this.y = posiciones_y[generarNumero()-1];
	this.solido = true;
	this.sprite = gemas[generarNumero()-1];
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
	this.x = 202;
	this.y = 405;
	this.alto = 50;
	this.ancho = 85;
	this.sprite = 'images/carlos.png';
	this.cantG = 0;
	this.vidas = 3;
};

Player.prototype.reinicio = function(){
	this.x = 202;
	this.y = 405;
	if(this.cantG>0){
		this.cantG--;
	}
};

Player.prototype.colisiona = function(object){
	if(this.x < object.x + object.ancho && this.x + this.ancho > object.x
	   && this.y < object.y + object.alto && this.y + this.alto > object.y){
		return true;
	}
	return false;
};

Player.prototype.update = function(){
	
	if(this.vidas === 0){
		this.render();
		alert("Oh no! Has perdido! Presiona OK para volver a jugar");
		this.cantG = 0;
		this.vidas = 3;
		this.reinicio();
		gema.reiniciar();
	}
	if(this.y < 0){
		this.render();
		alert("Felicidades has ganado! Tu puntuacion ha sido: "+this.cantG+", Presiona OK para volver a jugar");
		this.cantG = 0;
		this.vidas = 3;
		this.reinicio();
		gema.reiniciar();
	}
	for(var i = 0; i < 3; i++){
		if(this.colisiona(allEnemies[i])){
				this.reinicio();
				this.vidas--;
		}
	}
	if(this.colisiona(gema)){
		console.log("El jugador ha recogido una gema gema!");
		this.cantG++;
		console.log("Ahora tiene: "+this.cantG+" gemas!");
		gema.solido = false;
	}
};

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	this.dibujarVidas();
	this.dibujarPuntaje();
	console.log(this.x, this.y);
};

Player.prototype.handleInput = function (tecla){
	
	switch(tecla){
		case 'up':
			if(this.y > 73){
				this.y = this.y - MOV_Y;
			}else if(this.cantG > 2){
				this.y = this.y - MOV_Y;
			}
			break;
			
		case 'down':
			if(this.y < 405){
				this.y = this.y + MOV_Y;
			}
			break;
			
		case 'left':
			if(this.x > 0){
				this.x = this.x - MOV_X;
			}
			break;
			
		case 'right':
			if(this.x < 404 ){
				this.x = this.x + MOV_X;
			}
			break;
	}
};

Player.prototype.dibujarVidas = function(){
	var sp = 'images/Heart.png';
	var hw = 40;
	
	if(this.vidas > 0){
	ctx.drawImage(Resources.get(sp), 370,  535, hw, hw+20);
		if(this.vidas > 1){
			ctx.drawImage(Resources.get(sp), 410,  535, hw, hw+20);
			if(this.vidas > 2){
				ctx.drawImage(Resources.get(sp), 450, 535, hw, hw+20);
			}
		}
	}
}

Player.prototype.dibujarPuntaje = function(){
	ctx.drawImage(Resources.get('images/Gem Blue.png'), 20,  535, 30, 50);
	ctx.font = "15px Georgia";
	ctx.fillText("x", 50, 580);
	ctx.font = "20px Georgia";
	ctx.fillText(this.cantG, 60, 580);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), 
				  new Enemy(), 
				  new Enemy()];
allEnemies[0].x = posiciones_x[0];
allEnemies[0].y = posiciones_y[0];
allEnemies[1].x = posiciones_x[1];
allEnemies[1].y = posiciones_y[1];
allEnemies[2].x = posiciones_x[2];
allEnemies[2].y = posiciones_y[2];
			  
var player = new Player();

var gema = new Gema();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
