function formhash(form, password) {
    // Create a new element input, this will be our hashed password field. 
    p = document.createElement("input");
 
    // Add the new element to our form. 
    form.appendChild(p);
    p.name = "p";
    p.type = "hidden";
    p.value = hex_sha512(password.value);
 
    // Make sure the plaintext password doesn't get sent. 
    password.value = "";
    
    //return p.value;
    // Finally submit the form. 
    //form.submit();
}
 
function regformhash(form, uid, email, password, conf) {
     // Check each field has a value
    if (uid.value === ''         || 
          email.value === ''     || 
          password.value === ''  || 
          conf.value === '') {
        password.value= "";
        conf.value ="";
        alert('You must provide all the requested details. Please try again');
        return false;
    }
 
    // Check the username
 
    var re = /^\w+$/; 
    if(!re.test(uid.value)) { 
        alert("Username must contain only letters, numbers and underscores. Please try again"); 
        uid.focus();
        uid.value = "";
        password.value= "";
        conf.value ="";
        email.value= "";
        return false; 
    }
 
    // Check that the password is sufficiently long (min 6 chars)
    // The check is duplicated below, but this is included to give more
    // specific guidance to the user
    
    if (password.value.length < 6) {
        alert('Passwords must be at least 6 characters long.  Please try again');
        password.focus();
        password.value= "";
        conf.value ="";
        return false;
    }
 
    // At least one number, one lowercase and one uppercase letter 
    // At least six characters 
    //var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; 
    var re = /(?=.*\d)(?=.*[a-z]).{6,}/; 
    if (!re.test(password.value)) {
        alert('Passwords must contain at least one number and one lowercase.  Please try again');
        password.focus();
        return false;
    }
 
    // Check password and confirmation are the same
    if (password.value != conf.value) {
        alert('Your password and confirmation do not match. Please try again');
        password.focus();
        password.value = "";
        conf.value = "";
        return false;
    }
 
    // Create a new element input, this will be our hashed password field. 
    p = document.createElement("input");
 
    // Add the new element to our form. 
    form.appendChild(p);
    p.name = "p";
    p.type = "hidden";
    p.value = hex_sha512(password.value);
 
    // Make sure the plaintext password doesn't get sent. 
    password.value = "";
    conf.value = "";

    // Finally submit the form. 
    //form.submit();
    return true;
}
function login(username, password) {
    $data = {
        'username': username,
        'password': password,
    };

    $.ajax({
        url: "includes/process_login.php",
        data: $data,
        dataType: 'JSON',
        type: 'POST',
        success: function(data) {
            if (data.username) {
                alert("Successfully logged in as "+data.username);
                $('#login').closeModal();
                $("#username_input").val('');
                password = "";
                user_session('init', data);
            } else {
                $("#username_input").focus();
                alert("Invalid Credentials");
            }
        }
    });
}

function register(password) {
    $register_data = {
        'username': $('#registration_form').find('#register_username').val(),
        'password': password,
        'email': $('#registration_form').find('#register_email').val(),
    };              
    
    $.ajax({
        url: "includes/register.php",
        data: $register_data,
        dataType: 'JSON',
        type: 'POST',
        success: function(data){
            if(data.username){
                alert("Successfully Registered!");
                $('#register').closeModal();
                $("#register_username").val('');
                $("#register_email").val('');
                password = "";
                user_session('init', data);
            }
            else{
                $("#register_username").focus();
                alert(data);
            }
        }
    });
}
