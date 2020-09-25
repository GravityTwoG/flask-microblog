let game = document.getElementById('snake');

let input = document.createElement('input');
game.appendChild(input);
let score = 0;
input.value = `Your score: ${score}`;
input.classList.add('score');


let field = document.createElement('div');

game.appendChild(field);
field.classList.add('field');
let gameover = false;
let eated = false;




for (let i=1; i<101; i++) {
	let excel = document.createElement('div');
	field.appendChild(excel);
	excel.classList.add('excel');
}


let excel = document.getElementsByClassName('excel');
let x = 1,
	y = 10;


for (let i = 0; i < excel.length; i++) {
	if (x>10) {
		x = 1;
		y--;
			  }
	excel[i].setAttribute('posX', x);
	x++;
	excel[i].setAttribute('posY', y);
}


function generateSnake() {
	let posX = Math.round(Math.random()*(10-3)+3);
	let posY = Math.round(Math.random()*(10-1)+1);
	return [posX, posY];
}


let coordinates = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'),
 document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'),
  document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')];


for (let i = 0; i<snakeBody.length; i++) {
		snakeBody[i].classList.add('snakeBody');

}

snakeBody[0].classList.add('snakeHead');

let fruit;

function createFruit() {
	function generateFruit() {
	let posX = Math.round(Math.random()*(10-1)+1);
	let posY = Math.round(Math.random()*(10-1)+1);
	return [posX, posY];
	}
	

	let fruitCoordinates = generateFruit();
	fruit =  document.querySelector('[posX = "' + fruitCoordinates[0] + '"][posY = "' + fruitCoordinates[1] + '"]');

	while (fruit.classList.contains('snakeBody')) {
  	let fruitCoordinates = generateFruit();
  	fruit =  document.querySelector('[posX = "' + fruitCoordinates[0] + '"][posY = "' + fruitCoordinates[1] + '"]');
  	}

	fruit.classList.add('fruit');
		

}

createFruit();
function createFruitDelay() {
	setTimeout(() => {
		if (gameover == false) {
			if (eated == false) {
				fruit.classList.remove('fruit');
				createFruit();
			}
			else {
				eated = false;
			}
			createFruitDelay();	
		}
			
	},5000);
}
createFruitDelay();

let direction = 'right';
let steps = false;





function moveSnake() {
	let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
	snakeBody[0].classList.remove('snakeHead');
	snakeBody[snakeBody.length-1].classList.remove('snakeBody');
	snakeBody.pop();
	if (direction == 'right') {
		if (snakeCoordinates[0]<10) {
		snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
		}
		else {
		snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
			}
	}
	else if (direction == 'left') {
		if (snakeCoordinates[0]>1) {
		snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
		}
		else {
		snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));
			}
	}
	else if (direction == 'up') {
		if (snakeCoordinates[1]<10) {
		snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]+1) + '"]'));
		}
		else {
		snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
			}
	}
	else if (direction == 'down') {
		if (snakeCoordinates[1]>1) {
		snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]-1) + '"]'));
		}
		else {
		snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
			}
	}

	if (snakeBody[0].getAttribute('posX') == fruit.getAttribute('posX') && snakeBody[0].getAttribute('posY') == fruit.getAttribute('posY')) {
		fruit.classList.remove('fruit');
		let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
		let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
		snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
		eated = true;
		createFruit();
		score++;
		input.value = `Your score: ${score}`;
	}

	if (snakeBody[0].classList.contains('snakeBody')) {
		gameover = true;
		snakeBody[0].classList.add('dead');
		setTimeout(() => {
			alert(`GAME OVER \nYour score: ${score}`);
		},
		350);
		
		clearInterval(interval);

	}
	
	snakeBody[0].classList.add('snakeHead');
	for (let i = 0; i<snakeBody.length; i++) {
		snakeBody[i].classList.add('snakeBody');
		}
	steps = true;
}

let interval = setInterval(moveSnake, 200);

window.addEventListener('keydown', function (e) {
	if (steps == true) {
		if (e.keyCode == 37 && direction != 'right') {
			direction = 'left';
			steps = false;
		}
		else if (e.keyCode == 38 && direction != 'down') {
			direction = 'up';
			steps = false;
		}
		else if (e.keyCode == 39 && direction != 'left') {
			direction = 'right';
			steps = false;
		}
		else if (e.keyCode == 40 && direction != 'up') {
			direction = 'down';
			steps = false;
		}
	}
	
}); 