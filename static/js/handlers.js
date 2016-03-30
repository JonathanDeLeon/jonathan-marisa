var handlers = [
    ["/pictures/.*", imageHandler],
    ["/pictures", imageHandler],
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
		var r = new RegExp(path); //sets path to Regexp form
		var m = hash.match(path); //checks if the hash matches the path; if it does it returns the hash else null
		if (m && m[0] === hash) {
			m = path.split("\\\/"); //splits path where '\/' into array of strings separated by ','
			hash = hash.split("/").filter(function(i) { return m.indexOf(i) < 0; }); //filters out the first ',' due to split and sets them to an array
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

function pageHandler(path1, path2) {
    var path = path1+(path2 ? "/"+path2 : "")+".html";
    loader(main, "static/html/"+path, function(xhr) {
        if (xhr.status > 400) //If there is an error finding the page, it will reload homepage
            window.location.href = "#";
    });
}

function imageHandler() {
    loader(main, "static/html/pictures.html");
}
