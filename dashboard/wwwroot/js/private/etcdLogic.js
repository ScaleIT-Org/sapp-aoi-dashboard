//curl http://127.0.0.1:2379/v2/keys/Apps
var xhr = new XMLHttpRequest();
xhr.open('GET', "http://192.168.0.29:2379/v2/keys/Apps", true);
xhr.send();
xhr.onreadystatechange = processRequest;

function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
    }
}