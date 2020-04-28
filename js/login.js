function login() {
	displayNoneAllScreens();
	document.getElementById("login").style.display = 'block';
	$("#loginForm").submit(function (e) {
		e.preventDefault();
		validateLogin();
	})

}

function validateLogin() {
	// Get the values from the fields
	let usernameCheck = $("#usernameInput").val();
	let password = $("#passwordInput").val();

	// Check for blank fields.
	if (usernameCheck == "" || password == "") {
		$('input[id="usernameInput"],input[id="passwordInput"]').css("border", "2px solid red");
		$('input[id="usernameInput"],input[id="passwordInput"]').css("box-shadow", "0 0 3px red");

		alert("Please fill in username and password.");
		login();
	}
	else {
		//check if user name and password correct
		var userPassword = sessionStorage.getItem(usernameCheck);
		if (userPassword !== null) {
			if (userPassword == password) {
				//alert("Login succeeded!");

				username=usernameCheck;

				//now need to move to the settings before game window
				settings();
			}
			else {
				alert("Wrong User Name or password!");
				login();

			}
		}
		else {
			alert("Wrong User Name or password!");
			login();

		}

	}

}