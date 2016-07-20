/**
 * Created by kyle on 2016-07-15.
 */
function runDrumLoop() {
        (function next() {
            if (counter++ >= maxLoops) return;
            if (pause == true) return;
            if (halt == true) return;
            currentT = drumData[counter][0]; //time
            diffT = (drumData[counter][1]);
            currentP = drumData[counter][2]; //performer
            currentN = drumData[counter][3]; //note
            if (currentP == "D1") {
                currentND1 = currentN;
            }
            if (currentP == "D2") {
                currentND2 = currentN;
            }
            currentCycle = drumData[counter][4];
            currentVol = drumVol[currentN[0]-1];
            setTimeout(function () {
                if (currentN[0] == 1) {
                    $('#cycleDisplay').text(currentCycle);
                }
                if (currentP == "D1") {
                    T("perc", {r:200}, T("sin", {freq:220, mul:currentVol})).on("ended", function() {
                        this.pause();
                    }).bang().play();
                    var currentCol = "blue";
                    if (colorOption == true) {
                        $('.c1.n' + currentND1[0]).animate({
                            backgroundColor: currentCol
                        }, 150 * 1 / timeMult);
                        if (currentN[0] == 1) {
                            $('.c1.n' + currentND1[0]).animate({
                                backgroundColor: "black"
                            }, 300 * 1 / timeMult);
                        } else {
                            $('.c1.n' + currentND1[0]).animate({
                                backgroundColor: "white"
                            }, 300 * 1 / timeMult);
                        }
                    }

                    if (currentND1[0] == 1) {
                        $('#circleD1').css("transform", "rotate(" + (diffT / 213) * -(60) + "deg)");
                    }
                    countD1 = countD1 + 1;
                }
                if (currentP == "D2") {
                    currentND2 = currentN;
                    T("perc", {r:200}, T("sin", {freq:220, mul:currentVol})).on("ended", function() {
                        this.pause();
                    }).bang().play();
                    var currentCol = "green";
                    if (colorOption == true) {
                        $('.c2.n' + currentND2[0]).animate({
                            backgroundColor: currentCol
                        }, 150 * 1 / timeMult);
                        if (currentN[0] == 1) {
                            $('.c2.n' + currentND2[0]).animate({
                                backgroundColor: "black"
                            }, 200 * 1 / timeMult);
                        } else {
                            $('.c2.n' + currentND2[0]).animate({
                                backgroundColor: "white"
                            }, 200 * 1 / timeMult);
                        }
                        countD2 = countD2 + 1;
                    }
                        $('#circleD2').css("transform", "rotate(" + (diffT / 213) * -(60) + "deg)");
                }
                next();
            }, currentT * 1 / timeMult);
        })();
    }

function resetDrumLoop() {
    $('#cycleDisplay').text('1');
    $('#circleD1').css("transform", "rotate(0deg)");
    $('#circleD2').css("transform", "rotate(0deg)");
    counter = 0;
    currentT = 0;
    countD1 = 0;
    countD2 = 0;
}

