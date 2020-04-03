
var call = setInterval(time, 1000);
function time() {
    var d = new Date();
    document.getElementById('time').innerHTML = d.toLocaleTimeString();
}