var user;
$(document).ready(function(){
});

function user_session(cmd, data) {
	
	if (cmd == 'init' && data) {
		$nav_links = $(".navlinks li");
		$links = $(".navlinks");
		user = data;
        localStorage.user = JSON.stringify(user);
        $download = $('#download'); 
        $nav_links.remove();
        $links.append("<li><a href='#' class='waves-effect waves-light'>"+user.username+"</a></li>")
        $links.append("<li><a href='includes/logout.php' class='waves-effect waves-light' onclick='user_session("+'"destroy"'+");'>Logout</a></li>");
        $links.append($download);
	} else if (cmd == 'destroy') {
		user = "";
		localStorage.user = "";
	}
}
