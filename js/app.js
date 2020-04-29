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
// var count_of_5points_candies;
// var count_of_15points_candies;
// var count_of_25points_candies;
var username;

var num_of_monsters;
var pacman_position;
var first_monster;
var second_monster;
var third_monster;
var fourth_monster;
var random_choice;
var counter_monster_update = 0;
var starting_pistol = 0;
var life = 5;

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


function displayNoneAllScreens() {
	document.getElementById("login").style.display = 'none';
	document.getElementById("register").style.display = 'none';
	document.getElementById("welcome").style.display = 'none';
	document.getElementById("GameScreen").style.display = 'none';
	document.getElementById("settingsScreen").style.display = 'none';


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
	board = new Array();
	score = 0;
	//assignNumberOfCandies();
	pac_color = "yellow";
	var cnt = 100;
	food_remain = candy_num;
	
	var pacman_remain = 1;
	start_time = new Date();
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
				(i ==8 && j == 7)
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
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
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
	interval = setInterval(UpdatePosition, 200);
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
	lblScore.value = score;
	lblTime.value = time_elapsed;
	lblUsername.value= username;
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
	if (counter_monster_update % 4 == 0)
		updatePositionForMonster();
	counter_monster_update++;
	//first monster
	center_Monster.x = first_monster[0] * 60 + 30;
	center_Monster.y = first_monster[1] * 60 + 30;
	if (checkIfPacmanIsThere(first_monster[0], first_monster[1])) {
		initializeBoardAfterDeath();
		return;
	}
	drawMonsters("green", "black", center_Monster.x, center_Monster.y);
	// context.beginPath();
	// context.arc(center_Monster.x, center_Monster.y, 28, 0, 1 * Math.PI,true);
	// context.lineTo(center_Monster.x-30,center_Monster.y+35);
	// context.lineTo(center_Monster.x-15,center_Monster.y+20);
	// context.lineTo(center_Monster.x,center_Monster.y+35);
	// context.lineTo(center_Monster.x+15,center_Monster.y+20);
	// context.lineTo(center_Monster.x+30,center_Monster.y+35);
	// context.lineTo(center_Monster.x+28 ,center_Monster.y);
	// context.fillStyle = "green";
	// context.fill();
	// context.stroke();
	// //eye
	// context.beginPath();
	// context.arc(center_Monster.x+8, center_Monster.y-5, 5, 0, 2 * Math.PI,true);
	// context.fillStyle = "black";
	// context.fill();
	// context.stroke();
	// //eye
	// context.beginPath();
	// context.arc(center_Monster.x-8, center_Monster.y-5, 5, 0, 2 * Math.PI,true);
	// context.fillStyle = "black";
	// context.fill();
	// context.stroke();


	if (num_of_monsters == 4 && starting_pistol >= 4) {
		//second
		center_Monster.x = second_monster[0] * 60 + 30;
		center_Monster.y = second_monster[1] * 60 + 30;
		if (checkIfPacmanIsThere(second_monster[0], second_monster[1])) {
			initializeBoardAfterDeath();
			return;
		}
		drawMonsters("blue", "black", center_Monster.x, center_Monster.y);

		//third
		center_Monster.x = third_monster[0] * 60 + 30;
		center_Monster.y = third_monster[1] * 60 + 30;
		if (checkIfPacmanIsThere(third_monster[0], third_monster[1])) {
			initializeBoardAfterDeath();
			return;
		}
		drawMonsters("red", "black", center_Monster.x, center_Monster.y);

		//fourth
		center_Monster.x = fourth_monster[0] * 60 + 30;
		center_Monster.y = fourth_monster[1] * 60 + 30;
		if (checkIfPacmanIsThere(fourth_monster[0], fourth_monster[1])) {
			initializeBoardAfterDeath();
			return;
		}
		drawMonsters("purple", "black", center_Monster.x, center_Monster.y);
	}

	else if (num_of_monsters == 2 && starting_pistol >= 2) {
		//second
		center_Monster.x = second_monster[0] * 60 + 30;
		center_Monster.y = second_monster[1] * 60 + 30;
		if (checkIfPacmanIsThere(second_monster[0], second_monster[1])) {
			initializeBoardAfterDeath();
			return;
		}
		drawMonsters("blue", "black", center_Monster.x, center_Monster.y);


	}
	else if (num_of_monsters == 3 && starting_pistol >= 3) {
		//second
		center_Monster.x = second_monster[0] * 60 + 30;
		center_Monster.y = second_monster[1] * 60 + 30;
		if (checkIfPacmanIsThere(second_monster[0], second_monster[1])) {
			initializeBoardAfterDeath();
			return;
		}
		drawMonsters("blue", "black", center_Monster.x, center_Monster.y);

		//third
		center_Monster.x = third_monster[0] * 60 + 30;
		center_Monster.y = third_monster[1] * 60 + 30;
		if (checkIfPacmanIsThere(third_monster[0], third_monster[1])) {
			initializeBoardAfterDeath();
			return;
		}
		drawMonsters("red", "black", center_Monster.x, center_Monster.y);

	}

}


function checkIfPacmanIsThere(x, y) {
	if (x == pacman_position[0] && y == pacman_position[1])
		return true;
	return false;
}
function initializeBoardAfterDeath() {
	clearInterval(interval);
	score = score - 10;
	life--;
	if (life == 0) {
		window.alert("Loser!");
		// TODO: 
		//option to initialize new game 
	}
	else {
		window.alert("You have been killed. " + life + " life remain");
	}

	starting_pistol = 0;
	board[pacman_position[0]][pacman_position[1]] = 0;
	var foundFreeCell = false;
	while (!foundFreeCell) {
		var row = Math.floor(Math.random() * 9);
		var col = Math.floor(Math.random() * 9);
		if (board[row][col] != 4) {
			if (board[row][col] == 1) {
				score++;
				eaten_candies++;
				//	debugger;
			}
			pacman_position = [row, col];

			board[row][col] = 2;
			shape.i = row;
			shape.j = col;
			foundFreeCell = true;
		}
	}

	interval = setInterval(UpdatePosition, 200);

}

function updatePositionForMonster() {
	//still not all of the monsters is out
	if (starting_pistol < num_of_monsters) {
		if (starting_pistol == 0) {
			//first monster on her way 
			first_monster = [9, 9];

		}
		else if (starting_pistol == 1) {
			//second monster on her way
			second_monster = [9, 9];
			first_monster = chaseAfterPacman(first_monster);

		}
		else if (starting_pistol == 2) {
			third_monster = [9, 9];
			first_monster = chaseAfterPacman(first_monster);
			second_monster = chaseAfterPacman(second_monster);


		}
		else if (starting_pistol == 3) {
			fourth_monster = [9, 9];
			first_monster = chaseAfterPacman(first_monster);
			second_monster = chaseAfterPacman(second_monster);
			third_monster = chaseAfterPacman(third_monster);
		}

	}
	else {
		//all monsters already got out
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
	}

	starting_pistol++;

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
	//eye
	context.beginPath();
	context.arc(row + 8, col - 5, 5, 0, 2 * Math.PI, true);
	context.fillStyle = eyeColor;
	context.fill();
	context.stroke();
	//eye
	context.beginPath();
	context.arc(row - 8, col - 5, 5, 0, 2 * Math.PI, true);
	context.fillStyle = eyeColor;
	context.fill();
	context.stroke();
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

// function assignNumberOfCandies(){
// 	count_of_5points_candies = Math.floor(candy_num*0.6);
// 	count_of_15points_candies = Math.floor(candy_num*0.3);
// 	count_of_25points_candies = Math.floor(candy_num*0.1);
// 	var total_remainder = candy_num - (color_5_Points + count_of_15points_candies + count_of_25points_candies);
// 	count_of_5points_candies += total_remainder;
// }

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
		score+=5;
		eaten_candies++;
	}
	else if (board[shape.i][shape.j] == 15) {
		score+=15;
		eaten_candies++;
	}
	else if (board[shape.i][shape.j] == 25) {
		score+=25;
		eaten_candies++;
	}
	board[shape.i][shape.j] = 2;
	pacman_position = [shape.i, shape.j];
	// var currentTime = new Date();
	// time_elapsed = (currentTime - start_time) / 1000;
	// if (score >= 20 && time_elapsed <= 10) {
	// 	pac_color = "green";
	// }
	//debugger;
	if (eaten_candies == candy_num) {
		debugger;
		window.clearInterval(interval);
		if (score >= 100) {
			window.alert("Winner!!!");

		}
		else {
			window.alert("You are better than " + score + " points!");

		}
	} else {
		Draw();
	}
}
