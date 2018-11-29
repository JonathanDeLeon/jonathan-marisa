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
    // loader(main, "static/html/home.html", function() {
    loader(main, "static/html/coming-soon.html", function() {
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
    loader(main, "static/html/photos.html", function(){});
    $.ajax({
        type: "GET",
        url: config.server+"images",
        data: 'imgTag=all',
        dataType: "json",
        success: function(msg){
            if(!msg.error){
                var vw = $(window).width();
                $.each(msg, function(key, value){
                    var div = document.createElement("div");
                    var div2 = document.createElement("div");
                    var a = document.createElement("a");
                    var img = document.createElement("img");
                    div.className = "clip";
                    div2.className = "img-overlay";
                    a.className = "view-details";
                    a.innerHTML= "<p>"+value.description+"Hello</p>";
                    if(vw < 640){
                        img.className = "list-image";
                        img.setAttribute("src", config.imageSize.md+value.name);
                    }else{ 
                        img.className = "block-image";
                        img.setAttribute("src", config.imageSize.sq+value.name);
                        $(a).on('click', function(e){
                            e.preventDefault();
                   //         $('#editImage').on('click', function(){getImageInfoById(key);});
                            $('#showImage div').prepend("<img src='"+config.imageSize.md+value.name+"'>");
                            $('#showImage').foundation('open');
                            $('#showImage').on('closed.zf.reveal', function(){
                                $(this).find("img").remove();
                                $('#editImage').unbind('click');
                            });
                        });
                    }
                    div2.appendChild(a);
                    div2.appendChild(img);
                    div.appendChild(div2);
                    $('.squares').append(div);
                });
            }else{
                console.log(msg);
            }
        }
    });
    $('.img-overlay').attr('onclick', "return true");      //mobile fix to trigger :hover, :focus animation
    /*
    $('#upload').on('submit', function(e){
        e.preventDefault();
        var formData = new FormData($(this)[0]);        //Encrypts data
        var t = $(this);
        $('#loader').show();
        $(this)[0][1].className += " disabled";
        $.ajax({
            type: "POST",
            url: config.server+"upload",
            data: formData,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function(msg){
                if(!msg.error){
                    $("#alertContainer")
                        .removeClass("alert")
                        .addClass("success")
                        .html(msg.success)
                        .show()
                        .delay(5000)
                        .fadeOut()
                }else{
                    $("#alertContainer")
                        .removeClass("success")
                        .addClass("alert")
                        .html(msg.error)
                        .show()
                        .delay(5000)
                        .fadeOut()
                }
            },
            error: function(jqXHR, error){
                $("#alertContainer")
                    .removeClass("success")
                    .addClass("alert")
                    .html("Upload request was too large.")
                    .show()
                    .delay(5000)
                    .fadeOut()
            },
            complete: function(){
                t[0].reset();
                t[0][1].classList.remove("disabled");
                $('#loader').hide();
            }
        });
        return false;
    });
    */
}
/*
function editImageHandler(imgList){
    $('#editImageModal').foundation('open');
    $('#editImageModal').on('closed.zf.reveal', function(){
        $(this).find("img").remove();
        $('#edit')[0].reset();
    });
    $('#editImageModal #edit').prepend("<img src='"+config.imageSize.xs+imgList.name+"'>");
    $('#edit textarea').val(imgList.description);
    $.each(imgList.tags, function(key, value){
       $('#'+value).prop('checked', true); 
    });
    $('#edit').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: config.server+"updateImage",
            data: "id="+id,
            dataType: 'json',
            success: function(msg){
                console.log(msg);
            }
        });
        return false;
    });
}

function getImageInfoById(id){
    var list = {};
    id = id.replace('&id=','');
    $.ajax({
        type: "GET",
        url: config.server+"images",
        data: 'imgTag=specific&id='+id,
        dataType: "json",
        success: function(msg){
            if(!msg.error){
                editImageHandler(msg);
            }else{
                console.log(msg);
            }
        }
    });
    return list;
}
*/
