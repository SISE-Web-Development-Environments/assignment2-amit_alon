var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var user_password_map= new Map(); 


sessionStorage;


window.addEventListener("load", setupWelcomeScreen, false);

// called when the app first launches
function setupWelcomeScreen()
{
	// go to login screen when user clicks on login button
	document.getElementById("loginBtn").addEventListener("click", login, false);

	// go to register screen when user clicks on register button
	document.getElementById("registerBtn").addEventListener("click", register, false);

	// set difault user's credentials
	user_password_map.set("p","p");
	sessionStorage.setItem("p","p");



}

$(document).ready(function() {
	context = canvas.getContext("2d");
	
	//Start();
});


function login() {
	document.getElementById("login").style.display='block' ;
	document.getElementById("register").style.display='none' ;
	document.getElementById("welcome").style.display='none' ;
	$("#loginForm").submit(function(e){
		e.preventDefault();
		validateLogin();
	})

	}
	
function validateLogin(){


	// Get the values from the fields
	let username = $("#usernameInput").val();
	let password = $("#passwordInput").val();

	// Check for blank fields.
	if(username =="" || password==""){
		$('input[id="usernameInput"],input[id="passwordInput"]').css("border","2px solid red");
		$('input[id="usernameInput"],input[id="passwordInput"]').css("box-shadow","0 0 3px red");

		alert("Please fill in username and password.");
		login();
	}
	else{

		//check if user name and password correct
		var userPassword = sessionStorage.getItem(username);
		debugger;
		if(userPassword !== null){
			if(userPassword == password){
				alert("Login succeeded!");
				//now need to move to the settings before game window
			}
			else{
				alert("Wrong Password");
			}
		}
		else{
			alert("Wrong User Name!");
		}

	}

}

function freeUserName(s) {
	if(sessionStorage.getItem(s) !== null)
		return false;
	return true;
	}

	function register() {
	document.getElementById("register").style.display='block' ;
	document.getElementById("login").style.display='none' ;
	document.getElementById("welcome").style.display='none' ;
	$("#registration_form").submit(function(e){
		e.preventDefault();
		//validateRegister();
	})
	}







	$(function() {

	   $("#fname_error_message").hide();
	   $("#lname_error_message").hide();
	   $("#email_error_message").hide();
	   $("#password_error_message").hide();

	   var error_fname = false;
	   var error_sname = false;
	   var error_email = false;
	   var error_password = false;
	   var error_bday = false;

	   $("#form_fname").focusout(function(){
		  check_fname();
	   });
	   $("#form_lname").focusout(function() {
		  check_lname();
	   });
	   $("#form_email").focusout(function() {
		  check_email();
	   });
	   $("#form_password").focusout(function() {
		  check_password();
	   });

	

	   function check_fname() {
		  var pattern = /^[a-z][a-z\s]*$/;
		  var fname = $("#form_fname").val();
		  if (pattern.test(fname) && fname !== '') {
			 $("#fname_error_message").hide();
			 $("#form_fname").css("border-bottom","2px solid #34F458");
		  } else {
			 $("#fname_error_message").html("Should contain only Characters");
			 $("#fname_error_message").show();
			 $("#form_fname").css("border-bottom","2px solid #F90A0A");
			 error_fname = true;
		  }
	   }

	   function check_lname() {
		  var pattern = /^[a-z][a-z\s]*$/;
		  var sname = $("#form_lname").val();
		  if (pattern.test(sname) && sname !== '') {
			 $("#lname_error_message").hide();
			 $("#form_lname").css("border-bottom","2px solid #34F458");
		  } else {
			 $("#lname_error_message").html("Should contain only Characters");
			 $("#lname_error_message").show();
			 $("#form_lname").css("border-bottom","2px solid #F90A0A");
			 error_lname = true;
		  }
	   }

	   function check_password() {
		  var password_length = $("#form_password").val().length;
		  var pattern = /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/;
		  var password = $("#form_password").val();
		  var has_digitsAndLetters = pattern.test(password);
		  if (password_length < 6) {
			 $("#password_error_message").html("At least 6 Characters");
			 $("#password_error_message").show();
			 $("#form_password").css("border-bottom","2px solid #F90A0A");
			 error_password = true;
		  }
		  else if(has_digitsAndLetters) {
			 $("#password_error_message").hide();
			 $("#form_password").css("border-bottom","2px solid #34F458");
		  }
		  else{
			$("#password_error_message").html("Password must contain digits and letters");
			 $("#password_error_message").show();
			 $("#form_password").css("border-bottom","2px solid #F90A0A");
			 error_password = true;
		  }
	   }

	  

	   function check_email() {
		  var pattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		  var email = $("#form_email").val();
		  if (pattern.test(email) && email !== '') {
			 $("#email_error_message").hide();
			 $("#form_email").css("border-bottom","2px solid #34F458");
		  } else {
			 $("#email_error_message").html("Invalid Email");
			 $("#email_error_message").show();
			 $("#form_email").css("border-bottom","2px solid #F90A0A");
			 error_email = true;
		  }
	   }
	   
	   function check_userName() {
		  var pattern = /^[a-z][a-z\s]*$/;
		  var uname = $("#form_uname").val();
		  if (uname !== '') {
			  if(free)
			 $("#fname_error_message").hide();
			 $("#form_fname").css("border-bottom","2px solid #34F458");
		  } else {
			 $("#fname_error_message").html("Should contain only Characters");
			 $("#fname_error_message").show();
			 $("#form_fname").css("border-bottom","2px solid #F90A0A");
			 error_fname = true;
		  }
	   }


	   $("#registration_form").submit(function() {
		  error_fname = false;
		  error_lname = false;
		  error_email = false;
		  error_password = false;

		  check_fname();
		  check_lname();
		  check_email();
		  check_password();

		  if (error_fname === false && error_lname === false && error_email === false && error_password === false) {
			  var username = $("#form_uname").val();
			if(freeUserName(username)) {
				alert("Registration Successfull");
				var password = $("#form_password").val();
				sessionStorage.setItem(username,password);
				 return true;

				}
			else alert("This user name is not available");

		  } else {
			 alert("Please Fill the form Correctly");
			 return false;
		  }


	   });
	});


function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	var food_remain = 50;
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
				(i == 6 && j == 2)
			) {
				board[i][j] = 4;
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
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
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250);
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
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0;
	var x = GetKeyPressed();
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
	if (board[shape.i][shape.j] == 1) {
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}