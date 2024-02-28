var animateButton = function(e) {

    e.preventDefault;
    //reset animation
    e.target.classList.remove('animate');
    
    e.target.classList.add('animate');
    setTimeout(function(){
      e.target.classList.remove('animate');
    },700);
  };

let bubblyButton = document.getElementById("send-button");

bubblyButton.addEventListener("click", function() {
    console.log("Button clicked")
}, false);


