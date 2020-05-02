function register() {
	document.getElementById("register").style.display='block' ;
	document.getElementById("login").style.display='none' ;
	document.getElementById("welcome").style.display='none' ;
	$("#registration_form").submit(function(e){
		e.preventDefault();
		//validateRegister();
   })
   
   // save username for display
   username= $("#form_uname").val();

   
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
                 loggedIn=true;
                  settings();
 
                 }
             else alert("This user name is not available");
 
           } else {
              alert("Please Fill the form Correctly");
              return false;
           }
 
 
        });
     });

     function freeUserName(s) {
      if (sessionStorage.getItem(s) !== null)
         return false;
      return true;
   }