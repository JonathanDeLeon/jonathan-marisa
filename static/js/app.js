var main;

$(document).ready(function() {
    main = $("main");

    $("[data-html]").each(function(i, div){
        var url = div.getAttribute("data-html");
        loader($("[data-html='"+url+"']"), url, initialize);
    });

    $.each(config.files.css, function(i, cssUrl){
        $("head").append("<link href='"+cssUrl+"' rel='stylesheet'>");
    });
});

function initialize(){
    $("head").append('<meta name="description" content="'+config.title+': '+config.description+'" />');
	//$("head").append('<link rel="icon" href="'+config.favicon+'"  type="image/x-icon">');
	//$("head").append('<link rel="shortcut-icon" href="'+config.favicon+'"  type="image/x-icon">');
	//$("head").append('<link rel="apple-touch-icon" href="'+config.favicon+'">');
	document.title = config.title;

	$(document).foundation();
}

function loader(div,url,cb) {
	div.empty();
    div.load(url, function(response, status, xhr) {
		if (cb && typeof cb === "function") cb(xhr);
	});
}
    //ajax request to load home page
	/*if (window.sessionStorage.getItem("main-content") === null) {
		$.ajax({
			type: "GET",
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
        $.ajax({
        var $pageRoot = $linkClicked.replace(/^#/, '');
        if (!$(this).hasClass("active")) {
            $(".menu a").removeClass("active");
            $(this).addClass("active");
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
	});*/
