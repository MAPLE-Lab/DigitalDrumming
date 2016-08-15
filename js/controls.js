// Digital Drumming Visualizer
// Based on a project focused on exploring the dynamics of Steve Reich's Drumming
// https://maplelab.net/reich
// MAPLE Lab, McMaster
//
//
// Written by Kyle Gauder
// Git Repo: https://github.com/MAPLE-Lab/DigitalDrumming
//
//

// Coding for menu controls

var menuControl = function() {
    $('.bttn').hover(function() {
        $(this).toggleClass('hovered');
    });
    $('#plotAllBttn').click(function() {
        $('.controls').removeClass('buttonClicked');
        $('#pauseBttn').addClass('buttonClicked');
        playing = "no";
        pause = true;
        setTimeout(function() {plotAllData();}, 500);
    });

    $('#selectBoth').click(function() {
        if ($(this).hasClass("buttonClicked")) {
        } else {
            $('.selectbttn').removeClass("buttonClicked");
            $(this).addClass("buttonClicked");
            $('.D1Data').css("z-index","2");
            $('.D1Data').fadeTo("fast",1);
            $('.D2Data').css("z-index", "1");
            $('.D2Data').fadeTo("fast",1);
        }
    });

    $('#D1Select').click(function() {
        if ($(this).hasClass("buttonClicked")) {
            $('.selectbttn').removeClass("buttonClicked");
            $('.D1Data').fadeTo("fast",1);
            $('.D2Data').fadeTo("fast",1);
            $('#selectBoth').addClass("buttonClicked");
        } else {
            $('.selectbttn').removeClass("buttonClicked");
            $(this).addClass("buttonClicked");
            $('.D1Data').css("z-index","2");
            $('.D1Data').fadeTo("fast",1);
            $('.D2Data').css("z-index", "1");
            $('.D2Data').fadeTo("fast",0.3);
        }
    });

    $('#D2Select').click(function() {
        if ($(this).hasClass("buttonClicked")) {
            $('.selectbttn').removeClass("buttonClicked");
            $('.D1Data').fadeTo("fast",1);
            $('.D2Data').fadeTo("fast",1);
            $('#selectBoth').addClass("buttonClicked");
        } else {
            $('.selectbttn').removeClass("buttonClicked");
            $(this).addClass("buttonClicked");
            $('.D2Data').css("z-index", "2");
            $('.D2Data').fadeTo("fast",1);
            $('.D1Data').css("z-index","1");
            $('.D1Data').fadeTo("fast",0.3);
        }
    });
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
    $('#gridToggle').click(function() {
        if (gridOption == true) {
            gridOption = false;
            $('.gridLine').hide();
            $('.xAxisGridline').hide();
            $('.gridToggleDot').animate({
                top: "15px"
            }, {
                queue: false
            });
        } else {
            gridOption = true;
            $('.gridLine').show();
            $('.xAxisGridline').show();
            $('.gridToggleDot').animate({
                top: "3px"
            }, {
                queue: false
            });
        }
    });
    $('#audioToggle').click(function() {
        if (audioOption == true) {
            $('#audioToggleLabel').text("\uD83D\uDD07");
            audioOption = false;
            $('.audioToggleDot').animate({
                top: "15px"
            }, {
                queue: false
            });
        } else {
            $('#audioToggleLabel').text("\uD83D\uDD0A");
            audioOption = true;
            $('.audioToggleDot').animate({
                top: "3px"
            }, {
                queue: false
            });
        }
    });
    $('#dataToggle').click(function() {
        playing = "no";
        $('.controls').removeClass('buttonClicked');
        $('#pauseBttn').addClass('buttonClicked');
        $('.yTicks').removeClass('currentYTick');
        if (drumData == expData) {
            drumData = theoData;
            dataType = "theoretical";
            resetDrumLoop();
            pause = true;
            $('#dataToggle').text("Theoretical");
        } else {
            drumData = expData;
            dataType = "experimental";
            resetDrumLoop();
            pause = true;
            $('#dataToggle').text("Experimental");
        }
        $('#playButton').text("Play");
    });

    $('#resetBttn').click(function() {
        $('.yTicks').removeClass('currentYTick');
        $('.controls').removeClass('buttonClicked');
        $('#pauseBttn').addClass('buttonClicked');
        playing = "no";
        resetDrumLoop();
        pause = true;
    });

    $('#playBttn').click(function() {
        $('.controls').removeClass('buttonClicked');
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

    $('#revBttn').click(function() {
        $('.controls').removeClass('buttonClicked');
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

    $('#pauseBttn').click(function() {
        $('.controls').removeClass('buttonClicked');
        $(this).addClass('buttonClicked');
        playing = "no";
        pause = true;
    });


    $("#speedSlider").slider({
        orientation: "vertical",
        min: 0.5,
        max: 10,
        step: 0.05,
        value: 1,
        slide: function(event, ui) {
            timeMult = ui.value;
            $('#speed').val(timeMult);
        }
    });
    $('#speed').val(timeMult);


};
$(document).ready(menuControl);