
var dynamicTexts = ["Computer Science Student", "Golfer", "Canucks Fan", "Dog Lover"];


var dynamicTextIndex = 1;


function changeDynamicTextWithFade() {
    var dynamicText = document.getElementById("dynamic-text");
    dynamicText.style.opacity = 0; 
    setTimeout(function() {
        dynamicText.textContent = dynamicTexts[dynamicTextIndex];
        dynamicText.style.opacity = 1; 
        dynamicTextIndex = (dynamicTextIndex + 1) % dynamicTexts.length; 
    }, 300);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


setInterval(changeDynamicTextWithFade, 2000);





