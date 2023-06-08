function startTimer() {
    var startTime = Date.now();
    var timeCountElement = document.querySelector(".timeCount");
  
    function updateTimer() {
      var currentTime = Date.now();
      var distance = currentTime - startTime;
  
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      hours = padDigits(hours, 2);
      minutes = padDigits(minutes, 2);
      seconds = padDigits(seconds, 2);
  
      timeCountElement.innerHTML = hours + " : " + minutes + " : " + seconds;
      /* if (distance < 0) {
        timeCountElement.innerHTML = "EXPIRED";
      } else {
        requestAnimationFrame(updateTimer);
      } */
        requestAnimationFrame(updateTimer);
    }
  
    updateTimer();
  }
  
  function padDigits(number, digits) {
    return String(number).padStart(digits, '0');
  }
  
  startTimer();


function addImages() {
    var cards = document.querySelector(".cards");

    var innerdiv = document.createElement('div');
    innerdiv.className = 'singleCard';

    var img = document.createElement('img');
    img.className = "purpleImage";
    img.src = 'assets/images/purple Background.png';
    img.alt = 'front Card';
    
    cards.appendChild(innerdiv);
    innerdiv.appendChild(img);
}

for (let i = 1; i <= 30; i++) {
    addImages();
    
}