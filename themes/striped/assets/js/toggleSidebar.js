
var toggleClass = function(el, klass) {
    var cl = el.classList;
    if (cl.contains(klass)) {
      cl.remove(klass);
    } else {
      cl.add(klass);
    }
}

window.onload = function() {
  var slideMenuButton = document.getElementById('slide-menu-button');
  slideMenuButton.onclick = function(e) {
    var site = document.getElementById('content');
    toggleClass(site, 'open');

    var menu = document.getElementById('sidebar');
    toggleClass(menu, 'open');
  };
};

