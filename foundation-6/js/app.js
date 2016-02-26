$(document).ready(function() {
    $(document).foundation();
    //ajax request to load home page
	if (window.sessionStorage.getItem("main-content") === null) {
		$.ajax({
			type: "POST",
			url: "includes/load_html.php",
			data: 'page=home',
			dataType: "html",
			success: function(msg){
				if(parseInt(msg)!=0){
					$('#main-content').html(msg);
					$('#main-content #page-content').hide().fadeIn();
					window.sessionStorage.setItem("main-content", msg); // store it in session
				}
			}
		});

	} else {
		var jsData = window.sessionStorage.getItem("main-content");
		$('#main-content').html(jsData);
	}

    $('.menu a').click(function() {
        var $linkClicked = $(this).attr('href');
        window.location.hash = $linkClicked;
        var $pageRoot = $linkClicked.replace(/^#/, '');
        if (!$(this).hasClass("active")) {
            $(".menu a").removeClass("active");
            $(this).addClass("active");
            $.ajax({
                type: "POST",
                url: "includes/load_html.php",
                data: 'page='+$pageRoot,
                dataType: "html",
                success: function(msg){
	                if(parseInt(msg)!=0){
	                    $('#main-content').html(msg);
	                    $('#main-content #page-content').hide().fadeIn();
						window.sessionStorage.setItem("main-content", msg); // store it in session
	                }
	            }
	        });
	    }
	    else {
	        event.preventDefault();
	    }
	}); 
})
