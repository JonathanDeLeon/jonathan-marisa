$(document).ready(function(){
});

var user;

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
function countdown(){
	var anniversary = new Date(2012, 12, 08);
	var today = new Date();
	var difference_ms = today.getTime() - anniversary.getTime();

	//take out milliseconds
	difference_ms = difference_ms/1000;
	var seconds = Math.floor(difference_ms % 60);
	difference_ms = difference_ms/60; 
	var minutes = Math.floor(difference_ms % 60);
	difference_ms = difference_ms/60; 
	var hours = Math.floor(difference_ms % 24);  
	difference_ms = difference_ms/24; 
	var years = Math.floor(difference_ms/365);
	difference_ms = difference_ms%365; 
	var months = Math.floor(difference_ms/30);
	var days = Math.floor(difference_ms%30);
	return {
		'years': years,
		'months': months,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
	//var text = years + ' years, '+ months + ' months, ' + days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, and ' + seconds + ' seconds';
	//document.getElementById("countdown").innerHTML = text;
}
function initializeCountdown(){
	var clock = document.getElementById("countdown");
	var yearsSpan = clock.querySelector('.years');
	var monthsSpan = clock.querySelector('.months');
	var daysSpan = clock.querySelector('.days');
	var hoursSpan = clock.querySelector('.hours');
	var minutesSpan = clock.querySelector('.minutes');
	var secondsSpan = clock.querySelector('.seconds');

	function updateClock() {
    	var t = countdown();
	    yearsSpan.innerHTML = t.years;
	    monthsSpan.innerHTML = t.months;
	    daysSpan.innerHTML = t.days;
	    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
	    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
	    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

	    if (t.total <= 0) {
	    	clearInterval(timeinterval);
	    }
	}

	updateClock();
	var timeinterval = setInterval(updateClock, 1000);
}
		