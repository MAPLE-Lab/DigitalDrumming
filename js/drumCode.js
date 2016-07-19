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
            currentVol = drumVol[currentN[0]-1];
            setTimeout(function () {
                if (currentP == "D1") {
                    T("perc", {r:200}, T("sin", {freq:220, mul:currentVol})).on("ended", function() {
                        this.pause();
                    }).bang().play();
                    var currentCol = $('.c1.n' + currentN[0]).css("background-color");
                    if (colorOption == true) {
                        $('.c1.n' + currentN[0]).animate({
                            backgroundColor: "red"
                        }, 150 * 1 / timeMult);
                        $('.c1.n' + currentN[0]).animate({
                            backgroundColor: currentCol
                        }, 300 * 1 / timeMult);
                    }

                    if (currentN[0] == 8) {
                        $('#circleD1').css("transform", "rotate(" + (diffT / 213) * -(60) + "deg)");
                    }
                    countD1 = countD1 + 1;
                }
                if (currentP == "D2") {
                    T("perc", {r:200}, T("sin", {freq:220, mul:currentVol})).on("ended", function() {
                        this.pause();
                    }).bang().play();
                    var currentCol = $('.c2.n' + currentN[0]).css("background-color");
                    if (colorOption == true) {
                        $('.c2.n' + currentN[0]).animate({
                            backgroundColor: "red"
                        }, 150 * 1 / timeMult);
                        $('.c2.n' + currentN[0]).animate({
                            backgroundColor: currentCol
                        }, 200 * 1 / timeMult);
                        countD2 = countD2 + 1;
                    }
                        $('#circleD2').css("transform", "rotate(" + (diffT / 213) * -(60) + "deg)");
                }
                next();
            }, currentT * 1 / timeMult);
        })();
    }

