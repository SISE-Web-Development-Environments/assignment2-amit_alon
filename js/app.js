var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var interval2;
var lastKey;
var candy_num;
var eaten_candies = 0;
var username;
var loggedIn = false;
var gameIsOn=false;
var monster_update_interval= 4;
var num_of_monsters;
var pacman_position;
var first_monster = [9,9];
var second_monster = [0,0];
var third_monster = [9,0];
var fourth_monster = [0,9];
var random_choice;
var moving_fifty_points = [9, 0];
var not_collected_star_yet = true;
var not_collected_clock_yet = true;
var counter_monster_update = 0;
var life = 5;
var time_to_reduce;

// settings vars:
var keyUP = 38;
var keyDown = 40;
var keyLeft = 37;
var keyRight = 39;
var color_5_Points;
var color_15_Points;
var color_25_Points;
var gameLength;


sessionStorage;




window.addEventListener("load", setupWelcomeScreen, false);
window.addEventListener("keydown", function (e) {
	// space and arrow keys
	if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
		e.preventDefault();
	}
}, false);

// called when the app first launches
function setupWelcomeScreen() {
	displayNoneAllScreens();
	document.getElementById("welcome").style.display = 'block';


	// go to login screen when user clicks on login button
	document.getElementById("loginBtn").addEventListener("click", login, false);

	// go to register screen when user clicks on register button
	document.getElementById("registerBtn").addEventListener("click", register, false);

	// set difault user's credentials
	sessionStorage.setItem("p", "p");
}

function startOver() {
	endGame();
	life=5;
	eaten_candies = 0;
	setUpGame();
}

function endGame() {
	gameIsOn=false;
	window.clearInterval(interval);
	clearInterval(interval);
	time_elapsed = 0;
	eaten_candies = 0;
	score = 0;
}

function gameOverTimeOut() {
let scoreTmp=score;
	endGame();
	if (scoreTmp < 100) {
		window.alert("You are better than " + scoreTmp + " points!");
		gameOverLoser();
	} else {
		gameOverWinner();
	}
}

function gameOverLoser(){
	endGame();
	displayNoneAllScreens();
    document.getElementById("gameOverLoser").style.display = 'block';

	//$("#GameOverLoserModal").modal("show");
	
}

function gameOverWinner(){
	endGame();
	displayNoneAllScreens();
	document.getElementById("gameOverWinner").style.display = 'block';

}

function setUpGame() {

	displayNoneAllScreens()
	document.getElementById("GameScreen").style.display = 'block';

	context = canvas.getContext("2d");

	// put all settings values in theire places
	getSettingValues();

	Start();
}


function freeUserName(s) {
	if (sessionStorage.getItem(s) !== null)
		return false;
	return true;
}


function Start() {
	gameIsOn=true;
	board = new Array();
	life=5;
	time_elapsed = 0;
	eaten_candies = 0;
	score = 0;
	//assignNumberOfCandies();
	pac_color = "yellow";
	var cnt = 100;
	food_remain = candy_num;
	time_to_reduce = 0;
	var pacman_remain = 1;
	start_time = new Date();
	time_to_reduce = 0;
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2) ||
				(i == 8 && j == 7)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					let randomNum2 = Math.random();
					if (randomNum2 >= 0.4) // 60%
						board[i][j] = 5;
					else if (randomNum2 < 0.4 && randomNum2 > 0.1) // 30%
						board[i][j] = 15;
					else // 10%
						board[i][j] = 25;

				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					//do not put pacman in corner at first position
					if(isInCorner(i,j)){
						if(j == 9){
							shape.i = i;
							shape.j = j - 3;
							pacman_remain--;
							board[i][j- 3] = 2;
						}
							
						else{
							shape.i = i;
							shape.j = j + 3;
							pacman_remain--;
							board[i][j + 3] = 2;
						} 
					}
					else{
						shape.i = i;
						shape.j = j;
						pacman_remain--;
						board[i][j] = 2;
					}
					
				} 
				else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}


	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 5;
		food_remain--;
	}

	keysDown = {};
	addEventListener(
		"keydown",
		function (e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	if(gameIsOn==true){
		window.clearInterval(interval);
		interval = setInterval(UpdatePosition, 200);
	}
	//interval2 = setInterval(monstersMoves,700);

}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}


function isInCorner(i,j){
	if(i == 9 || i == 0){
		if(j == 0 || j == 9) return true;
	}
	return false;
}
function GetKeyPressed() {
	if (keysDown[keyUP]) {
		return 1;
	}
	if (keysDown[keyDown]) {
		return 2;
	}
	if (keysDown[keyLeft]) {
		return 3;
	}
	if (keysDown[keyRight]) {
		return 4;
	}
}


function Draw() {
	canvas.width = canvas.width; //clean board
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	lblLifeCount.value = life.toString();
	lblScore.value = score;
	lblTime.value = time_elapsed;
	if (time_elapsed / 60 > gameLength) {
		clearInterval(interval);
		gameOverTimeOut();
		return;

	}
	lblUsername.value = username;
	displaySettings();

	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				pacman_position = [i, j];
				if (lastKey == 1) {
					//UP
					//closing the mouth
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.25 * Math.PI, 1.75 * Math.PI, true);
					// A line from the end of the arc to the centre
					context.lineTo(center.x, center.y);
					// A line from the centre of the arc to the start
					context.closePath();
					context.fillStyle = "yellow";
					context.fill();
					context.stroke();
					//eye
					context.beginPath();
					context.arc(center.x - 15, center.y, 5, 0, 2 * Math.PI);
					context.fillStyle = "black";
					context.fill();
					context.stroke();

				}
				else if (lastKey == 2) {
					//DOWM (right)

					//closing the mouth
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.75 * Math.PI, 0.25 * Math.PI, false);
					// A line from the end of the arc to the centre
					context.lineTo(center.x, center.y);
					// A line from the centre of the arc to the start
					context.closePath();
					context.fillStyle = "yellow";
					context.fill();
					context.stroke();
					//eye
					context.beginPath();
					context.arc(center.x + 15, center.y, 5, 0, 2 * Math.PI);
					context.fillStyle = "black";
					context.fill();
					context.stroke();



				}
				else if (lastKey == 3) {
					//LEFT
					//closing the mouth
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.25 * Math.PI, 0.75 * Math.PI, false);
					// A line from the end of the arc to the centre
					context.lineTo(center.x, center.y);
					// A line from the centre of the arc to the start
					context.closePath();
					context.fillStyle = "yellow";
					context.fill();
					context.stroke();
					//eye
					context.beginPath();
					context.arc(center.x, center.y - 15, 5, 0, 2 * Math.PI);
					context.fillStyle = "black";
					context.fill();
					context.stroke();
				}
				else {
					//RIGHT(down)
					//closing the mouth
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.2 * Math.PI, 1.8 * Math.PI, false);
					// A line from the end of the arc to the centre
					context.lineTo(center.x, center.y);
					// A line from the centre of the arc to the start
					context.closePath();
					context.fillStyle = "yellow";
					context.fill();
					context.stroke();
					//eye
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI);
					context.fillStyle = "black";
					context.fill();
					context.stroke();


				}


			} else if (board[i][j] == 25) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color_25_Points; //color
				context.fill();
			} else if (board[i][j] == 15) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color_15_Points; //color
				context.fill();
			} else if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = color_5_Points; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}


	var center_Monster = new Object();
	if (counter_monster_update % monster_update_interval == 0){
		updatePositionForMonster();
		counter_monster_update = 0;
	}
	counter_monster_update++;
	//first monster
	center_Monster.x = first_monster[0] * 60 + 30;
	center_Monster.y = first_monster[1] * 60 + 30;
	if (checkIfPacmanIsThere(first_monster[0], first_monster[1])) {
		initializeBoardAfterDeath(1);
		return;
	}
	drawMonsters("red", "black", center_Monster.x, center_Monster.y);


	if (num_of_monsters == 4) {
		//second
		center_Monster.x = second_monster[0] * 60 + 30;
		center_Monster.y = second_monster[1] * 60 + 30;
		if (checkIfPacmanIsThere(second_monster[0], second_monster[1])) {
			initializeBoardAfterDeath(2);
			return;
		}
		drawMonsters("blue", "black", center_Monster.x, center_Monster.y);

		//third
		center_Monster.x = third_monster[0] * 60 + 30;
		center_Monster.y = third_monster[1] * 60 + 30;
		if (checkIfPacmanIsThere(third_monster[0], third_monster[1])) {
			initializeBoardAfterDeath(2);
			return;
		}
		drawMonsters("green", "black", center_Monster.x, center_Monster.y);

		//fourth
		center_Monster.x = fourth_monster[0] * 60 + 30;
		center_Monster.y = fourth_monster[1] * 60 + 30;
		if (checkIfPacmanIsThere(fourth_monster[0], fourth_monster[1])) {
			initializeBoardAfterDeath(2);
			return;
		}
		drawMonsters("purple", "black", center_Monster.x, center_Monster.y);
	}

	else if (num_of_monsters == 2) {
		//second
		center_Monster.x = second_monster[0] * 60 + 30;
		center_Monster.y = second_monster[1] * 60 + 30;
		if (checkIfPacmanIsThere(second_monster[0], second_monster[1])) {
			initializeBoardAfterDeath(2);
			return;
		}
		drawMonsters("blue", "black", center_Monster.x, center_Monster.y);


	}
	else if (num_of_monsters == 3) {
		//second
		center_Monster.x = second_monster[0] * 60 + 30;
		center_Monster.y = second_monster[1] * 60 + 30;
		if (checkIfPacmanIsThere(second_monster[0], second_monster[1])) {
			initializeBoardAfterDeath(2);
			return;
		}
		drawMonsters("blue", "black", center_Monster.x, center_Monster.y);

		//third
		center_Monster.x = third_monster[0] * 60 + 30;
		center_Monster.y = third_monster[1] * 60 + 30;
		if (checkIfPacmanIsThere(third_monster[0], third_monster[1])) {
			initializeBoardAfterDeath(2);
			return;
		}
		drawMonsters("green", "black", center_Monster.x, center_Monster.y);

	}
	if (not_collected_star_yet)
		drawStar(moving_fifty_points[0] * 60 + 30, moving_fifty_points[1] * 60 + 30, 5, 20, 10);

}



function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
	if (board[moving_fifty_points[0]][moving_fifty_points[1]] != 4) {
		if (checkIfPacmanIsThere(moving_fifty_points[0], moving_fifty_points[1])) {
			debugger;
			score += 50;
			not_collected_star_yet = false;
		}
		else {
			var rot = Math.PI / 2 * 3;
			var x = cx;
			var y = cy;
			var step = Math.PI / spikes;

			context.strokeStyle = "#000";
			context.beginPath();
			context.moveTo(cx, cy - outerRadius)
			for (i = 0; i < spikes; i++) {
				x = cx + Math.cos(rot) * outerRadius;
				y = cy + Math.sin(rot) * outerRadius;
				context.lineTo(x, y)
				rot += step

				x = cx + Math.cos(rot) * innerRadius;
				y = cy + Math.sin(rot) * innerRadius;
				context.lineTo(x, y)
				rot += step
			}
			context.lineTo(cx, cy - outerRadius)
			context.closePath();
			context.lineWidth = 5;
			context.strokeStyle = 'blue';
			context.stroke();
			context.fillStyle = 'lightcyan';
			context.fill();
			context.strokeStyle = 'tranaparent';
		}

	}
}

function drawSlowMotionClock(){
	if(checkIfPacmanIsThere(4,9)){
		not_collected_clock_yet = false;
		//CHANGE INTERVAL OF MONSTER FOR SOME TIME;
		monster_update_interval = 16;
		setTimeout(function() { window.monster_update_interval = 4; }, 15000);
	}
	else{
		// draw clock
		context.beginPath();
		context.strokeStyle = "000";
		context.arc(60*4 +30, 60*9 +30, 30, 0, 2 * Math.PI);
		context.stroke();
	} 
}
function checkIfPacmanIsThere(x, y) {
	if (x == pacman_position[0] && y == pacman_position[1])
		return true;
	return false;
}
function initializeBoardAfterDeath(index) {
//	clearInterval(interval);
	var currTime = new Date();
	if (index == 1) {
		score = score - 20;
		life -= 2;
	}
	else {
		score = score - 10;
		life--;
	}
	if (life <= 0) {
		gameOverLoser();
		return;
	}
	else {
		window.alert("You have been killed. " + life + " life remain");

	}
	time_to_reduce += ( currTime - (new Date()) );
	starting_pistol = 0;
	board[pacman_position[0]][pacman_position[1]] = 0;
	var foundFreeCell = false;
	while (!foundFreeCell) {
		var row = Math.floor(Math.random() * 9);
		var col = Math.floor(Math.random() * 9);
		if (board[row][col] != 4) {
			score += board[row][col];
			eaten_candies++;
			pacman_position = [row, col];

			board[row][col] = 2;
			shape.i = row;
			shape.j = col;
			foundFreeCell = true;
		}
	}
	// if(gameIsOn==true){
	//  			interval = setInterval(UpdatePosition, 200);		
	// }

}

function updatePositionForMonster() {

		if (num_of_monsters == 4) {
			first_monster = chaseAfterPacman(first_monster);
			second_monster = chaseAfterPacman(second_monster);
			third_monster = chaseAfterPacman(third_monster);
			fourth_monster = chaseAfterPacman(fourth_monster);
		}
		else if (num_of_monsters == 3) {
			first_monster = chaseAfterPacman(first_monster);
			second_monster = chaseAfterPacman(second_monster);
			third_monster = chaseAfterPacman(third_monster);
		}
		else if (num_of_monsters == 2) {
			first_monster = chaseAfterPacman(first_monster);
			second_monster = chaseAfterPacman(second_monster);
		}
		else {
			first_monster = chaseAfterPacman(first_monster);
		}
	

	var choose_position_for_star = false;

	while (!choose_position_for_star) {
		var random_move = Math.floor(Math.random() * 2) + 1;
		if (random_move == 1) {
			random_move = Math.floor(Math.random() * 2) + 1;
			if (random_move == 1 && moving_fifty_points[0] < 9)
				moving_fifty_points[0]++;
			else if (moving_fifty_points[0] > 0)
				moving_fifty_points[0]--;

		}
		else {
			random_move = Math.floor(Math.random() * 2) + 1;
			if (random_move == 1 && moving_fifty_points[1] < 9)
				moving_fifty_points[1]++;
			else if (moving_fifty_points[1] > 0)
				moving_fifty_points[1]--;
		}
		if (board[moving_fifty_points[0]][moving_fifty_points[1]] != 4) choose_position_for_star = true;
	}


}

function drawMonsters(color, eyeColor, row, col) {
	context.beginPath();
	context.arc(row, col, 28, 0, 1 * Math.PI, true);
	context.lineTo(row - 30, col + 35);
	context.lineTo(row - 15, col + 20);
	context.lineTo(row, col + 35);
	context.lineTo(row + 15, col + 20);
	context.lineTo(row + 30, col + 35);
	context.lineTo(row + 28, col);
	context.fillStyle = color;
	context.fill();
	context.stroke();
	//right eye
	context.beginPath();
	context.arc(row + 8, col - 5, 5, 0, 2 * Math.PI, true);
	context.fillStyle = eyeColor;
	context.fill();
	context.stroke();
	//left eye
	context.beginPath();
	context.arc(row - 8, col - 5, 5, 0, 2 * Math.PI, true);
	context.fillStyle = eyeColor;
	context.fill();
	context.stroke();
	if (color == "red") {
		//draw mouth
		context.beginPath();
		context.moveTo(row - 8, col + 16);
		context.bezierCurveTo(row - 5, col + 6, row + 5, col + 6, row + 5, col + 16);
		context.closePath();
		context.fillStyle = "black";
		context.fill();
		context.stroke();
	}
}


function chaseAfterPacman(monster_position) {
	var monster_row = monster_position[0];
	var monster_col = monster_position[1];
	var pacman_row = pacman_position[0];
	var pacman_col = pacman_position[1];
	var situation = which_is_equal(monster_row, monster_col, pacman_row, pacman_col);
	random_choice = Math.floor(Math.random() * 2) + 1;
	if (situation == 0) { //same row, diff column
		if (monster_col < pacman_col) { //we wish to go right
			if (board[monster_row][monster_col + 1] != 4) {
				return [monster_row, monster_col + 1];
			}
			else {
				//monster needs to go on different axis (row movement) because there is a wall between pacman and monster
				if (random_choice == 1) {
					//try go upwards
					if (monster_row > 0 && board[monster_row - 1][monster_col] != 4)
						return [monster_row - 1, monster_col];
					else {
						//try downwards
						if (monster_row < 9 && board[monster_row + 1][monster_col] != 4)
							return [monster_row + 1, monster_col];
						else {
							//the only way left to go - the other way of pacman 
							return [monster_row, monster_col - 1];
						}
					}
				}
				else {
					//try go downwards
					if (monster_row < 9 && board[monster_row + 1][monster_col] != 4)
						return [monster_row + 1, monster_col];
					//try go upwards
					else if (monster_row > 0 && board[monster_row - 1][monster_col] != 4) {
						return [monster_row - 1, monster_col];
					}
					else {
						//the only way left to go - the other way of pacman 
						return [monster_row, monster_col - 1];
					}
				}
			}
		}
		else {
			// we wish to go left
			if (board[monster_row][monster_col - 1] != 4) {
				return [monster_row, monster_col - 1];
			}
			else {
				//monster needs to go on different axis (row movement) because there is a wall between pacman and monster
				if (random_choice == 1) {
					//try go upwards
					if (monster_row > 0 && board[monster_row - 1][monster_col] != 4)
						return [monster_row - 1, monster_col];
					else {
						//try downwards
						if (monster_row < 9 && board[monster_row + 1][monster_col] != 4)
							return [monster_row + 1, monster_col];
						else {
							//the only way left to go - the other way of pacman 
							return [monster_row, monster_col - 1];
						}
					}
				}
				else {
					//try go downwards
					if (monster_row < 9 && board[monster_row + 1][monster_col] != 4)
						return [monster_row + 1, monster_col];
					//try go upwards
					else if (monster_row > 0 && board[monster_row - 1][monster_col] != 4) {
						return [monster_row - 1, monster_col];
					}
					else {
						//the only way left to go - the other way of pacman 
						return [monster_row, monster_col - 1];
					}
				}
			}
		}

	}

	else if (situation == 1) {
		//same column, different row
		if (monster_row < pacman_row) { //we wish to go down
			if (board[monster_row + 1][monster_col] != 4) {
				return [monster_row + 1, monster_col];
			}
			else {
				//monster needs to go on different axis (column movement) because there is a wall between pacman and monster
				if (random_choice == 1) {
					//try go leftwards
					if (monster_col > 0 && board[monster_row][monster_col - 1] != 4)
						return [monster_row, monster_col - 1];
					else {
						//try rightwards
						if (monster_col < 9 && board[monster_row][monster_col + 1] != 4)
							return [monster_row, monster_col + 1];
						else {
							//the only way left to go - the other way of pacman 
							return [monster_row - 1, monster_col];
						}
					}
				}
				else {
					//try rightwards
					if (monster_col < 9 && board[monster_row][monster_col + 1] != 4)
						return [monster_row, monster_col + 1];
					//try go leftwards
					else if (monster_col > 0 && board[monster_row][monster_col - 1] != 4) {
						return [monster_row, monster_col - 1];
					}
					else {
						//the only way left to go - the other way of pacman 
						return [monster_row - 1, monster_col];
					}
				}
			}

		}

		else {
			//we wish to go up
			if (board[monster_row - 1][monster_col] != 4) {
				return [monster_row - 1, monster_col];
			}
			if (random_choice == 1) {
				//try go leftwards
				if (monster_col > 0 && board[monster_row][monster_col - 1] != 4)
					return [monster_row, monster_col - 1];
				else {
					//try rightwards
					if (monster_col < 9 && board[monster_row][monster_col + 1] != 4)
						return [monster_row, monster_col + 1];
					else {
						//the only way left to go - the other way of pacman 
						return [monster_row - 1, monster_col];
					}
				}
			}
			else {
				//try rightwards
				if (monster_col < 9 && board[monster_row][monster_col + 1] != 4)
					return [monster_row, monster_col + 1];
				//try go leftwards
				else if (monster_col > 0 && board[monster_row][monster_col - 1] != 4) {
					return [monster_row, monster_col - 1];
				}
				else {
					//the only way left to go - the other way of pacman 
					return [monster_row - 1, monster_col];
				}
			}

		}
	}

	else if (situation == 2) { //both column and row is different
		if (random_choice == 1) {
			//try to make row movement
			if (monster_row < pacman_row) {
				//need to go down
				if (monster_row < 9 && board[monster_row + 1][monster_col] != 4)
					return [monster_row + 1, monster_col];

			}
			else {
				//need to go up
				if (monster_row > 0 && board[monster_row - 1][monster_col] != 4)
					return [monster_row - 1, monster_col];
			}
		}


		// try to make column movement
		if (monster_col < pacman_col) {
			//need to go right
			if (monster_col < 9 && board[monster_row][monster_col + 1] != 4) {
				return [monster_row, monster_col + 1];
			}
		}
		else {
			//need to go left
			if (monster_col > 0 && board[monster_row][monster_col - 1] != 4) {
				return [monster_row, monster_col - 1];
			}
		}

		if (monster_row < pacman_row) {
			//need to go down
			if (monster_row < 9 && board[monster_row + 1][monster_col] != 4)
				return [monster_row + 1, monster_col];

		}
		else {
			//need to go up
			if (monster_row > 0 && board[monster_row - 1][monster_col] != 4)
				return [monster_row - 1, monster_col];
		}

	}
	return [monster_row, monster_col];
}


function which_is_equal(mrow, mcol, prow, pcol) {
	if (mrow == prow) {
		if (mcol != pcol) {
			//same row, different column
			return 0;
		}
		//both are same
		else return 3;
	}
	else if (mcol == pcol) {
		//same column, different row
		return 1;
	}
	else {
		//both column and row are different
		return 2;
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
	if (x !== undefined) {
		lastKey = x;
	}
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 5) {
		score += 5;
		eaten_candies++;
	}
	else if (board[shape.i][shape.j] == 15) {
		score += 15;
		eaten_candies++;
	}
	else if (board[shape.i][shape.j] == 25) {
		score += 25;
		eaten_candies++;
	}
	board[shape.i][shape.j] = 2;
	pacman_position = [shape.i, shape.j];
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time + time_to_reduce) / 1000;

	if (eaten_candies == candy_num) {
		window.clearInterval(interval);
		gameOverWinner();
		return;
	} else {
		Draw();
	}
}
