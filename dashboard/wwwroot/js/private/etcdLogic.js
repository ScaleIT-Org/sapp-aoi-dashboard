//Gets etcd information
var xhr = new XMLHttpRequest();
xhr.open('GET', "http://192.168.0.29:2379/v2/keys?recursive=true", true); xhr.send(); 
setInterval(function(){ xhr.open('GET', "http://192.168.0.29:2379/v2/keys?recursive=true", true); xhr.send(); }, 3000);
xhr.onreadystatechange = processRequest;

//Adds Sidebar Elements
var sidebarMap = new Map();
function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        sidebarMap.forEach(function(value, key, map) {
            sidebarMap.set(key, 0);
        });

        for (i in response.node.nodes)
        {
            if(!sidebarMap.has(response.node.nodes[i].key)){
                sidebarMap.set(response.node.nodes[i].key, 1);
                //Add Sidebar Element
                var ul = document.getElementById("sidebar-ul");
                var li = document.createElement("li");
                li.setAttribute("id",response.node.nodes[i].key+"-li");
                li.innerHTML = '<a href="#"><i class="fa fa-microchip"></i>' + response.node.nodes[i].key + '</a>';
                li.addEventListener ("click", sidebarClickLogic, false);
                ul.appendChild(li);
                //Add Iframe
                var content = document.getElementById('page-content-wrapper');
                var div = document.createElement("div");
                div.style.display = "none";
                div.setAttribute("id",response.node.nodes[i].key);
                for(j in response.node.nodes[i].nodes){
                    if(response.node.nodes[i].nodes[j].key.slice(-3) === "url"){
                        div.innerHTML ='<iframe frameborder=0 scrolling="no" src="http://'+ response.node.nodes[i].nodes[j].value+'" style="top:0px; left:0px; bottom:0px; right:0px; width:100%; height:90vh; border:none; margin:0; padding:0; overflow:hidden;"></iframe>'
                        content.appendChild(div);
                    }
                }
            }
            //Mark current active Machines with 1
            sidebarMap.set(response.node.nodes[i].key, 1);
        }

        //Remove old Machines map = 0
        sidebarMap.forEach(function(value, key, map) {
            if(value === 0){
                document.getElementById(key+"-li").remove();
                document.getElementById(key).remove();
                sidebarMap.delete(key);
            }
        });
    }
}
//Event listener to Static pages
$(document).ready(function () {
    document.getElementById("notify").addEventListener ("click", sidebarClickLogic, false);
    document.getElementById("main").addEventListener ("click", sidebarClickLogic, false);
});

//Shows selected sidebare page
function sidebarClickLogic(event) {
    for(var child in document.getElementById('page-content-wrapper').childNodes) {
        if(document.getElementById('page-content-wrapper').childNodes[child].nodeType == 1) {
            document.getElementById('page-content-wrapper').childNodes[child].style.display = "none";
        }
    }
    document.getElementById(event.path[0].innerText).style.display = "inherit";
}