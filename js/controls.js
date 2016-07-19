/**
 * Created by kyle on 2016-07-18.
 */
var menuControl = function () {

    $('#colorToggle').click(function() {
        if (colorOption == true) {
            colorOption = false;
        } else {
            colorOption = true;
        }
    });
    $('#pauseButton').click(function() {
        if (pause == true) {
            pause = false;
        } else {
            pause = true;
        }
        runDrumLoop();
    });
    $('#playButton').click(function() {
        if (halt == false) {
            halt = true;
        } else {
            halt = false;
            counter = 0;
            currentT = 0;
            countD1 = 0;
            countD2 = 0;
            runDrumLoop();
        }
    });

    $( "#speedSlider" ).slider({
        min: 1,
        max: 10,
        step: 0.01,
        value: 1,
        slide: function(event, ui) {
            timeMult = ui.value;
        }
    });
    
}

$(document).ready(menuControl);