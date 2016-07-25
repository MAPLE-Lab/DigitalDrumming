/**
 * Created by kyle on 2016-07-18.
 */
var menuControl = function () {

    $('#colorToggle').click(function() {
        if (colorOption == true) {
            colorOption = false;
            $('.colorToggleDot').animate({
                top: "15px"
            }, {
                queue: false
            });
        } else {
            colorOption = true;
            $('.colorToggleDot').animate({
                top: "3px"
            }, {
                queue: false
            });
        }
    });

    $('#dataToggle').click(function() {
        playing = "no";
        pause = true;
        $('.button').removeClass('buttonClicked');
        if (drumData == expData) {
            drumData = theoData;
            resetDrumLoop();
            $('#dataToggle').text("Theoretical");
        } else {
            drumData = expData;
            resetDrumLoop();
            $('#dataToggle').text("Experimental");
        }
        $('#playButton').text("Play");
    });
    $('#dataToggle').hover(function() {
        $(this).toggleClass('hovered');
    });

    $('#resetBttn').click(function() {
        $('.button').removeClass('buttonClicked');
        $(this).addClass('buttonClicked');
        playing = "no";
        pause = true;
        resetDrumLoop();
    });
    $('#resetBttn').hover(function() {
        $(this).toggleClass('hovered');
    });
    $('#playBttn').click(function() {
        $('.button').removeClass('buttonClicked');
        $(this).addClass('buttonClicked');
        if (playing == "yes") {
            direction = "fwd";
        } else if (playing == "no") {
            playing = "yes";
            pause = false;
            direction = "fwd";
            runDrumLoop();
        }
    });
    $('#playBttn').hover(function() {
        $(this).toggleClass('hovered');
    });
    $('#revBttn').click(function() {
        $('.button').removeClass('buttonClicked');
        $(this).addClass('buttonClicked');
        if (playing == "yes") {
            direction = "rev";
        } else if (playing == "no") {
            playing = "yes";
            pause = false;
            direction = "rev";
            runDrumLoop();
        }
    });
    $('#revBttn').hover(function() {
        $(this).toggleClass('hovered');
    });
    $('#pauseBttn').click(function() {
        $('.button').removeClass('buttonClicked');
        $(this).addClass('buttonClicked');
        playing = "no";
        pause = true;
    });
    $('#pauseBttn').hover(function() {
        $(this).toggleClass('hovered');
    });

    $( "#speedSlider" ).slider({
        min: 0.5,
        max: 10,
        step: 0.01,
        value: 1,
        slide: function(event, ui) {
            timeMult = ui.value;
        }
    });
    
};

$(document).ready(menuControl);
