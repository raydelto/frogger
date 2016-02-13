var MOV_X = 101;
var MOV_Y = 83;


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
	this.velocidad = generarNumero()+0.2;
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
		var posiciones = [63,71*2,75*3];
		this.x = 0;
		this.y = posiciones[generarNumero()-1];
		this.velocidad = generarNumero()+0.2;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
};

Player.prototype.reinicio = function(){
	this.x = 202;
	this.y = 405;
}

Player.prototype.colisiona = function(object){
	if(this.x < object.x + object.ancho && this.x + this.ancho > object.x
	   && this.y < object.y + object.alto && this.y + this.alto > object.y){
		return true;
	}
	return false;
}

Player.prototype.update = function(){
	if(this.y < 72){
		this.reinicio();
	}
	for(var i = 0; i < 3; i++){
		if(this.colisiona(allEnemies[i])){
			this.reinicio();
		}
	}
}

Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (tecla){
	
	switch(tecla){
		case 'up':
			if(this.y > 0){
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
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), 
				  new Enemy(), 
				  new Enemy()];
allEnemies[0].x = MOV_X;
allEnemies[0].y = 63;
allEnemies[1].x = MOV_X*2;
allEnemies[1].y = 71*2;
allEnemies[2].x = MOV_X*3;
allEnemies[2].y = 75*3;
				  
var player = new Player();


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
