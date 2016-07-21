/**
 * Created by kyle on 2016-07-15.
 */
function runDrumLoop() {
        (function next() {
            // Main loop to go through data

            // Pause or Stop loop checks //
            if (pause == true) return;
            if (halt == true) return;

            // Check Direction from time multiplier //
            if (timeMult > 0) { // Loop to set playback to be forward or reversed based on slider
                direction = "fwd"; // Sets playback to be forward ("fwd")
            } else if (timeMult < 0) {
                direction = "rev"; // Sets playback to be reversed ("rev")
            } else {
                direction = "fwd"; // Defaults to forward if something goes wrong
            }

            // Set direction of loop //
            if (direction == "fwd") {
                if (0 >= counter++ >= maxLoops) return;
            }
            else if (direction == "rev") {
                if (0 >= counter-- >= maxLoops) return;
            } else {
                if (0 >= counter++ >= maxLoops) return;
            }

            // Set values for this loop //
            currentT = drumData[counter][0]; // time until next loop iteration
            diffT = (drumData[counter][1]); // difference time to rotate with (against theoretical)
            currentP = drumData[counter][2]; // Performer for this loop
            currentN = drumData[counter][3]; // Note number for this loop
            currentCycle = drumData[counter][4];
            currentVol = drumVol[currentN[0]-1];
            currentPitch = drumPitch[currentN[0]-1];
            if (currentP == "D1") {
                currentND1 = currentN;
            }
            if (currentP == "D2") {
                currentND2 = currentN;
            }

            // Actual loop with pause //
            setTimeout(function () {
                // Change display to show the current cycle number //
                if (currentN[0] == 1) {
                    $('#cycleDisplay').text(currentCycle);
                }

                // Loop for Drummer 1 //
                if (currentP == "D1") {
                    currentND1 = currentN;
                    currentCol = "blue";
                    modifyDisplay(1,currentND1,currentVol,currentPitch,currentCol,timeMult);
                    $('#circleD1').css("transform", "rotate(" + (diffT / 213) * -(60) + "deg)");
                    countD1 = countD1 + 1;
                }

                // Loop for Drummer 2 //
                if (currentP == "D2") {
                    currentND2 = currentN;
                    currentCol = "green";
                    modifyDisplay(2,currentND2,currentVol,currentPitch,currentCol,timeMult);
                    $('#circleD2').css("transform", "rotate(" + (diffT / 213) * -(60) + "deg)");
                    countD2 = countD2 + 1;
                }
                next();
            }, currentT * 1 / Math.abs(timeMult));
        })();
    }

function modifyDisplay(num,cND,cVol,cPitch,cCol,tMult) {
    T("perc", {r:200}, T("sin", {freq:cPitch, mul:cVol})).on("ended", function() {
        this.pause();
    }).bang().play();
    if (colorOption == true) {
        $('.c'+num+'.n' + cND[0]).animate({
            backgroundColor: cCol
        }, 150 * 1 / Math.abs(tMult));
        if (currentN[0] == 1) {
            $('.c'+num+'.n' + cND[0]).animate({
                backgroundColor: "black"
            }, 200 * 1 / Math.abs(tMult));
        } else {
            $('.c'+num+'.n' + cND[0]).animate({
                backgroundColor: "white"
            }, 200 * 1 / Math.abs(tMult));
        }
    }
}

function resetDrumLoop() {
    $('#cycleDisplay').text('1');
    counter = 0;
    currentT = 0;
    countD1 = 0;
    countD2 = 0;
    $('#circleD1').css("transform", "rotate(0deg)");
    $('#circleD2').css("transform", "rotate(0deg)");
    
}