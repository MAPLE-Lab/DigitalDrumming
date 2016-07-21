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
            $(this).text("Pause");
            $('.c1').removeClass('holdD1');
            $('.c2').removeClass('holdD2');

        } else {
            pause = true;
            $('.c1.n' + currentND1[0]).addClass('holdD1');
            $('.c2.n' + currentND2[0]).addClass('holdD2');
            $(this).text("Play");
        }
        runDrumLoop();
    });

    $('#playButton').click(function() {
        if (halt == false) {
            halt = true;
            resetDrumLoop();
            $(this).text("Play");
        } else {
            halt = false;
            runDrumLoop();
            $(this).text("Reset");
        }
    });


    $('#dataToggle').click(function() {
        halt = true;
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

    $( "#speedSlider" ).slider({
        min: -15,
        max: 15,
        step: 0.01,
        value: 1,
        slide: function(event, ui) {
            timeMult = ui.value;
        }
    });
    
};

$(document).ready(menuControl);
