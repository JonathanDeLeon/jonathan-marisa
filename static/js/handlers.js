var handlers = [
    ["/photos/.*", imageHandler],
    ["/photos", imageHandler],
    ["/.*", pageHandler],
    [".*", indexHandler]
];

function hasher() {
	var title = window.location.hash.substr(1).replace(/\//g," | ").replace(/_/g," ").replace(/\./g," ").capitalize();
	document.title = config.title + title;

	var hash = window.location.hash.substr(1);
	console.log("Hash = " +hash);
	for (var h in handlers) {
		var path = handlers[h][0].replace(/\//g,"\\\/"); //replaces '/' in the handler url with '\/'
		var m = hash.match(path); //checks if the hash matches the path; if it does it returns the hash else null
		if (m && m[0] === hash) { //m is not null and equals hash
			m = path.split("\\\/"); //Creates an array by splitting path where '\/'
            /*Splits hash and only returns the strings not found in m*/
			hash = hash.split("/").filter(function(i) {return m.indexOf(i) < 0; }); 
			handlers[h][1].apply(this, hash); //applies the handler function with an array variable 'hash'
			return true;  //to exit out of the loop
		}
	}
}

function indexHandler() {
    loader(main, "static/html/home.html", function() {
    });
    if (window.location.hash.length > 1) {
        window.location.hash = "";
    }
}

function pageHandler(path1, path2=null, path3=null) {
    var paths = [path1, path2, path3];
    var path = "";
    for(var p in paths){
        if(paths[p]){
            path += paths[p] + "/"; 
            if(p != paths.length-1)
                continue;
        }
        path = path.substring(0, path.length-1) +".html";
        break;
    }
    loader(main, "static/html/"+path, function(xhr) {
        if (xhr.status > 400) //If there is an error finding the page, it will reload homepage
            window.location.href = "#";
    });
}
function imageHandler() {
    loader(main, "static/html/photos.html", function(){
        $('#upload').on('submit', function(e){
            console.log($(this));
            var formData = new FormData($(this)[0]);        //Encrypts data
            $.ajax({
                type: "POST",
                url: config.server+"upload",
                data: formData,
                dataType: 'JSON',
                success: function(msg){
                    if(!msg.error){
                    }else{
                        console.log(msg);
                    }
                }
            });
            return false;
        });
    });
    $.ajax({
        type: "GET",
        url: config.server+"images",
        data: 'imgTag=all',
        dataType: "json",
        success: function(msg){
            if(!msg.error){
                $.each(msg, function(key, value){
                    var i = document.createElement("i");
                    $(i).css("background-image", "url("+config.media+value+")");
                    $(i).on('click', function(){
                        //var popup = new Foundation.Reveal($('#showImage'));
                        $('#showImage').prepend("<img src='"+config.media+value+"'>");
                        $('#showImage').foundation('open');
                        $('#showImage').on('closed.zf.reveal', function(){
                            $(this).children("img").remove();
                        });
                        //popup.open();
                    });
                    $('.squares').append(i);
                    //$('.squares').append("<i style='background-image: url("+config.media+value+"')>");
                });
            }else{
                console.log(msg);
            }
        }
    });
}
