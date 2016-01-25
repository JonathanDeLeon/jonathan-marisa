$(document).ready(function() {
    $(document).foundation();
	    $('.menu a').click(function() {
	        var $linkClicked = $(this).attr('href');
	        document.location.hash = $linkClicked;
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
	                if(parseInt(msg)!=0)
	                {
	                    $('#main-content').html(msg);
	                    $('#main-content #page-content').hide().fadeIn();
	                }
	            }
	        });
	    }
	    else {
	        event.preventDefault();
	    }
	}); 
})