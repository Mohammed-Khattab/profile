"use strict";

function toggleSideBar() {
  var bars, sidebar, main;
  bars = document.querySelector(".bars");
  if (bars) {
    bars.classList.toggle("rot-90");
  }
  sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    sidebar.classList.toggle("expand");
  }
  main = document.querySelector(".main");
  if (main) {
    main.classList.toggle("shrink");
    main.classList.toggle("col-12");
    main.classList.toggle("col-s-12");
  }
}

window.addEventListener("scroll", function () {
  var scrollY = window.scrollY;
  var height =
    document.body.getBoundingClientRect().height - window.innerHeight;
  updatePageProgressBar(scrollY, height);

  var progressBars = document.querySelectorAll("progress");
  if (progressBars) {
    progressBars.forEach(function (elem) {
      if(isFullyVisible(elem) && !elem.dataset.done){
        var targetVal = elem.value;
        var labelVal = elem.previousElementSibling.getElementsByTagName("span")[0];
        elem.value = 0;
        var interval = setInterval(fillProgressBar, 10);
        function fillProgressBar(){
          elem.value++;
          labelVal.innerHTML = elem.value + '%';
          if(elem.value >= targetVal){
            clearInterval(interval);
          }
        }
        elem.dataset.done = true;
      }
    });
  }
});


function isFullyVisible(elem) {
  var bounding = elem.getBoundingClientRect();
  var isVisible = (bounding.top >= 0  && bounding.bottom <= window.innerHeight);
  return isVisible;
}
function updatePageProgressBar(scrollY, height) {
  var percent = Math.ceil((scrollY / height) * 100) + "%";
  var pageProgressBar = document.getElementById("pageProgressBar");
  if (pageProgressBar) {
    pageProgressBar.style.width = percent;
  }
}
