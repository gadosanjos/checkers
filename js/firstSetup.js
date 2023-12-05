document.addEventListener("DOMContentLoaded", function () {
    let httpResquest = new XMLHttpRequest();
    httpResquest.open('GET', "myServer.php?start=true", true);
    httpResquest.send();
});
  