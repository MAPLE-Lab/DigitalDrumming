/**
 * Created by kyle on 2016-07-15.
 */
$(document).ready(function() {
    

    var timeMult = 2;
    var colorOption = true;
    var pause = false;

    var maxLoops = drumData.length;
    var counter = 0;
    var currentT = 0;

    var countD1 = 0;
    var countD2 = 0;

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
    $('#restart').click(function() {
        counter = 0;
        currentT = 0;
        countD1 = 0;
        countD2 = 0;
    });


    $( "#speedSlider" ).slider({
        min: 1,
        max: 10,
        step: 0.01,
        value: 2,
        slide: function(event, ui) {
            timeMult = ui.value;
        }
    });

    function runDrumLoop() {
        (function next() {
            if (counter++ >= maxLoops) return;
            if (pause == true) return;
            currentT = drumData[counter][0]; //time
            diffT = (drumData[counter][1]);
            currentP = drumData[counter][2]; //performer
            currentN = drumData[counter][3]; //note
            setTimeout(function () {
                if (currentP == "D1") {
                    var currentCol = $('.c1.n' + currentN[0]).css("background-color");
                    if (colorOption == true) {
                        $('.c1.n' + currentN[0]).animate({
                            backgroundColor: "red"
                        }, 150 * 1 / timeMult);
                        $('.c1.n' + currentN[0]).animate({
                            backgroundColor: currentCol
                        }, 400 * 1 / timeMult);
                    }

                    if (currentN[0] == 8) {
                        $('#circleD1').css("transform", "rotate(" + (diffT / 56917.81586) * -(60) + "deg)");
                    }

                    countD1 = countD1 + 1;
                }
                if (currentP == "D2") {
                    var currentCol = $('.c2.n' + currentN[0]).css("background-color");
                    if (colorOption == true) {
                        $('.c2.n' + currentN[0]).animate({
                            backgroundColor: "red"
                        }, 150 * 1 / timeMult);
                        $('.c2.n' + currentN[0]).animate({
                            backgroundColor: currentCol
                        }, 400 * 1 / timeMult);
                        countD2 = countD2 + 1;
                    }
                    //$('#circleD2').css("transform", "rotate(" + countD2*10 + "deg)");
                }
                next();
            }, currentT * 1 / timeMult);
        })();
    }

    runDrumLoop();

});
