function updateClock() {
  Date.getMinutesTwoDigits = function() {
    var retval = now.getMinutes();
    if (retval < 10) return ("0" + retval.toString());
    else return retval.toString();
  }
  Date.getHoursModTwelve = function() {
    var retval = now.getHours();
    retval = retval%12;
    if (retval == 0) retval = 12;
    return retval;
  }
  var now = new Date(),
      time = Date.getHoursModTwelve() + ':' + Date.getMinutesTwoDigits();
  document.getElementById('time').innerHTML = ["", time].join('');
  setTimeout(updateClock, 1000);
}

updateClock();



function addSearch(elementId, callback) {
  var elem = document.getElementById(elementId);
  elem.addEventListener('keypress', function(evt) {
    if (evt.keyCode == 13) {
      callback(elem.value);
    }
  });
}


addSearch('search', function(s) {
  window.location.href = 'https://www.google.com/#q=' + s;
});