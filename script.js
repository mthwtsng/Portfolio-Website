// Array of dynamic texts to display
var dynamicTexts = ["Computer Science Student", "Software Engineer", "Golfer", "Dog Lover"];

// Index to keep track of the current dynamic text
var dynamicTextIndex = 1;

// Function to change the dynamic part of the text with a fading effect
function changeDynamicTextWithFade() {
    var dynamicText = document.getElementById("dynamic-text");
    dynamicText.style.opacity = 0; // Start fading out the current text
    setTimeout(function() {
        dynamicText.textContent = dynamicTexts[dynamicTextIndex];
        dynamicText.style.opacity = 1; // Start fading in the new text
        dynamicTextIndex = (dynamicTextIndex + 1) % dynamicTexts.length; // Loop back to the beginning if end is reached
    }, 300); // Wait for 500ms (half a second) before changing the text
}

// Change the dynamic part of the text with a fading effect every 3 seconds
setInterval(changeDynamicTextWithFade, 2000);
