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
    if ( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
    } else {
        $('.bttn').hover(function () {
            $(this).toggleClass('hovered');
        });
    }
    $('#plotAllBttn').click(function() {
        $('.controls').removeClass('buttonClicked');
        $('#pauseBttn').addClass('buttonClicked');
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
            $('#audioToggleLabel').css("background-image","url('https://maplelab.net/tools/DigitalDrumming/Elements/speakerMute.png')");
            audioOption = false;
            $('.audioToggleDot').animate({
                top: "15px"
            }, {
                queue: false
            });
        } else {
            $('#audioToggleLabel').css("background-image","url('https://maplelab.net/tools/DigitalDrumming/Elements/speakerPlay.png')");
            audioOption = true;
            $('.audioToggleDot').animate({
                top: "3px"
            }, {
                queue: false
            });
        }
    });
    $('#dataToggle').click(function() {
        $('.controls').removeClass('buttonClicked');
        $('#pauseBttn').addClass('buttonClicked');
        $('.yTicks').removeClass('currentYTick');
        if (drumData == expData) {
            drumData = theoData;
            dataType = "theoretical"
            resetDrumLoop();
            pause = true;
            $('#dataToggle').text("Theoretical");
        } else {
            drumData = expData;
            dataType = "experimental";
            resetDrumLoop();
            pause = true;
            $('#dataToggle').text("Observed");
        }
    });

    $('#resetBttn').click(function() {
        $('.yTicks').removeClass('currentYTick');
        $('.controls').removeClass('buttonClicked');
        $('#pauseBttn').addClass('buttonClicked');
        resetDrumLoop();
        pause = true;
    });

    $('#playBttn').click(function() {
        $('#playBttn').removeClass('initialGlow');
        $('.controls').removeClass('buttonClicked');
        $(this).addClass('buttonClicked');
        direction = "fwd";
        if (pause == false) {
        } else if (pause == true) {
            pause = false;
            resetCalled = false;
            runDrumLoop();
        }
    });

    $('#revBttn').click(function() {
        $('.controls').removeClass('buttonClicked');
        $(this).addClass('buttonClicked');
        direction = "rev";
        if (pause == false) {
        } else if (pause == true) {
            pause = false;
            resetCalled = false;
            runDrumLoop();
        }
    });

    $('#pauseBttn').click(function() {
        $('.controls').removeClass('buttonClicked');
        $(this).addClass('buttonClicked');
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

    if ( /iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
    } else {
        $('.mainslot').hover(function () {
            $(this).toggleClass('hovered');
        });
    }

    $('#slot1').click(function() {
        comparisonSlotNum = 1;
        $('.mainslot').removeClass('activeSlot');
        $(this).addClass('activeSlot');
    });
    //
    $('#slot2').click(function () {
        comparisonSlotNum = 2;
        $('.mainslot').removeClass('activeSlot');
        $(this).addClass('activeSlot');
    });

};
$(document).ready(menuControl);

//////////////
// HOTKEYS //
////////////
window.onkeydown = function (e) {
    return !(e.keyCode == 32);
};
//
function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}
$(document).ready(function() {
    $(document).keydown(function (key) {
        switch (parseInt(key.which, 10)) {
            // Pressing space to play/pause
            case 32:
                if (pause == false) {
                    $('.controls').removeClass('buttonClicked');
                    $('#pauseBttn').addClass('buttonClicked');
                    pause = true;
                } else {
                    $('.controls').removeClass('buttonClicked');
                    $('#playBttn').addClass('buttonClicked');
                    pause = false;
                    resetCalled = false;
                    runDrumLoop();
                }
                break;

            // Pressing M to mute
            case 77:
                $('#audioToggle').trigger('click');
                break;
            // Pressing Shift to switch data
            case 16:
                $('#dataToggle').trigger('click');
                break;
            // Press G to toggle grid lines
            case 71:
                $('#gridToggle').trigger('click');
                break
            // Press C to toggle colors
            case 67:
                $('#colorToggle').trigger('click');
                break;
            // Press Control to switch active comparison slot
            case 17:
                if ( $('#slot1').hasClass('activeSlot') ) {
                    $('#slot2').trigger('click');
                } else if ( $('#slot2').hasClass('activeSlot') ) {
                    $('#slot1').trigger('click');
                }
                break;
            // Press P to Plot All
            case 80:
                $('#plotAllBttn').trigger('click');
                break;

            // Press R to reset
            case 82:
                $('#resetBttn').trigger('click');

        }

    });
});

// $('.controls').removeClass('buttonClicked');
// $(this).addClass('buttonClicked');
// direction = "fwd";
// if (pause == false) {
// } else if (pause == true) {
//     pause = false;
//     resetCalled = false;
//     runDrumLoop();
// }
