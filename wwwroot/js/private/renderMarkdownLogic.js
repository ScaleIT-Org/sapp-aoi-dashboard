//read the markdown file
	$(document).ready(function () {
  		// get markdown content  
        //var body_location = '../README.md';
        var body_location = "http://localhost:3000/md/";
        function getText(myUrl){
            var result = null;
            $.ajax( { url: myUrl, 
                      type: 'get', 
                      dataType: 'html',
                      async: true,
                      success: function(data) { document.getElementById("mdhtml").innerHTML = marked(data);} 
                    }
            );
            FileReady = true;
            return result;
        }
        getText(body_location);
    });