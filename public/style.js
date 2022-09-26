function showMenu(menu) {

    var angle = '0deg',
      slide = '300px';
  
    if (menu) {
      angle = '180deg';
      slide = '0';
    }
  
    // Slide panel
    document.getElementById("menu__panel").style.transform = "translateX(" + slide + ")";
  
    // Rotate icon
    setTimeout(function() {
      document.getElementById("menu__close").style.transform = "rotate(" + angle + ")";
    }, 300);
  
    // Animate menu items
    document.querySelectorAll(".menu-item").forEach(function(i) {
      var row = i;
      setTimeout(function() {
        menu && row.classList.add('fadeInDown');
        !menu && row.classList.remove('fadeInDown');
      }, 100 * i);
    });
  
  }