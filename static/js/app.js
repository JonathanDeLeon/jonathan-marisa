var main;

String.prototype.capitalize = function() {
	if (this.length <= 1) return this;
    var words = this.replace("/"," s/s ");
	words = words.split(" ");
	for (var i in words)
		if (words[i][0] && words[i][0].match(/[A-Za-z]/))
			words[i] = words[i].replace(new RegExp(words[i][0]),words[i][0].toUpperCase());
	words = words.join(" ");
    words = words.replace(" S/s ","/");
    return words;
}
$(document).ready(function() {
    main = $("main");

    $("[data-html]").each(function(i, div){
        var url = div.getAttribute("data-html");
        loader($("[data-html='"+url+"']"), url, initialize);
    });

    $.each(config.files.css, function(i, cssUrl){
        $("head").append("<link href='"+cssUrl+"' rel='stylesheet'>");
    });
    $.each(config.files.js, function(i, jsUrl){
      //  $("body").append("<script src='"+jsUrl+"'></script>");
    });
    $(window).scroll(function(){
        var pageOffsetY = window.pageYOffset;
        var vh = $(window).height();
        if((vh-50) <= pageOffsetY){
            $('#main-menu').css({"position":"fixed","top":"0","left":"0","bottom":""});
        }else{
            $('#main-menu').css({"position":"absolute","top":"","left":"","bottom":"0"});
        }
    });
});

function initialize(){
	hasher();
    window.onhashchange = hasher;
    $("head").append('<meta name="description" content="'+config.title+': '+config.description+'" />');
	//$("head").append('<link rel="icon" href="'+config.favicon+'"  type="image/x-icon">');
	//$("head").append('<link rel="shortcut-icon" href="'+config.favicon+'"  type="image/x-icon">');
	//$("head").append('<link rel="apple-touch-icon" href="'+config.favicon+'">');
	document.title = config.title;
    $(window).load(function() {
        $(document).foundation();
    });

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
