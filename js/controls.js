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
    $('#D1Select').click(function() {
        if ($(this).hasClass("buttonClicked")) {
            $('.selectbttn').removeClass("buttonClicked");
            $('.D1Data').css("opacity", "1");
            $('.D2Data').css("opacity", "1");
        } else {
            $('.selectbttn').removeClass("buttonClicked");
            $(this).addClass("buttonClicked");
            $('.D1Data').css({
                "opacity": "1",
                "z-index": "2",
            });
            $('.D2Data').css({
                "opacity": "0.3",
                "z-index": "1",
            });
        }
    });
    $('#D2Select').click(function() {
        if ($(this).hasClass("buttonClicked")) {
            $('.selectbttn').removeClass("buttonClicked");
            $('.D1Data').css("opacity", "1");
            $('.D2Data').css("opacity", "1");
        } else {
            $('.selectbttn').removeClass("buttonClicked");
            $(this).addClass("buttonClicked");
            $('.D2Data').css({
                "opacity": "1",
                "z-index": "2",
            });
            $('.D1Data').css({
                "opacity": "0.3",
                "z-index": "1",
            });
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
    $('#dataToggle').click(function() {
        playing = "no";
        $('.bttn').removeClass('buttonClicked');
        if (drumData == expData) {
            drumData = theoData;
            resetDrumLoop();
            pause = true;
            $('#dataToggle').text("Theoretical");
        } else {
            drumData = expData;
            resetDrumLoop();
            pause = true;
            $('#dataToggle').text("Experimental");
        }
        $('#playButton').text("Play");
    });
    $('#dataToggle').hover(function() {
        $(this).toggleClass('hovered');
    });
    $('#resetBttn').click(function() {
        $('.bttn').removeClass('buttonClicked');
        $(this).addClass('buttonClicked');
        playing = "no";
        resetDrumLoop();
        pause = true;
    });
    $('#resetBttn').hover(function() {
        $(this).toggleClass('hovered');
    });
    $('#playBttn').click(function() {
        $('.bttn').removeClass('buttonClicked');
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
        $('.bttn').removeClass('buttonClicked');
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
        $('.bttn').removeClass('buttonClicked');
        $(this).addClass('buttonClicked');
        playing = "no";
        pause = true;
    });
    $('#pauseBttn').hover(function() {
        $(this).toggleClass('hovered');
    });
    $("#speedSlider").slider({
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