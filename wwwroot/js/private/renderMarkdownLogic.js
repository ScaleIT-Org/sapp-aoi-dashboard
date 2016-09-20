//read the markdown file
	$(document).ready(function () {
  		// get markdown content  
        var body_location = 'markdown.md';
        function getText(myUrl){
            var result = null;
            $.ajax( { url: myUrl, 
                      type: 'get', 
                      dataType: 'html',
                      async: false,
                      success: function(data) { result = data; } 
                    }
            );
            FileReady = true;
            return result;
        }
        var markdown_source = getText(body_location);
        document.getElementById("mdhtml").innerHTML = marked(markdown_source);
    });