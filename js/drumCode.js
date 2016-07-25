/**
 * Created by kyle on 2016-07-15.
 */

// Main function to adjust circle display
function modifyDisplay(num,cND,cVol,cPitch,cCol,tMult) {
    // Play audio
    T("perc", {r:200}, T("sin", {freq:cPitch, mul:cVol})).on("ended", function() {
        this.pause();
    }).bang().play();

    // Animate color
    if (colorOption == true) {
        $('.c'+num+'.n' + cND).animate({
            backgroundColor: cCol
        }, 150 * 1 / Math.abs(tMult));
        if (currentN[0] == 1) {
            $('.c'+num+'.n' + cND).animate({
                backgroundColor: "black"
            }, 200 * 1 / Math.abs(tMult));
        } else {
            $('.c'+num+'.n' + cND).animate({
                backgroundColor: "white"
            }, 200 * 1 / Math.abs(tMult));
        }
    }

    // Rotate Position
    $('.circleConts'+num+'.pos'+cND).css("transform", "rotate(" + (15+30*cND+(diffT / 213) * -(60)) + "deg)");
}

// Resets display
function resetDrumLoop() {
    $('#cycleDisplay').text('1');
    counter = 0;
    currentT = 0;
    for (i=1; i<=12; i++) {
        $('.pos'+i).css("transform", "rotate(" + (15+30*i) + "deg)");
    }
}



function runDrumLoop() {
    (function next() {
        // Main loop to go through data

        // Pause or Stop loop checks //
        if (pause == true) return;
        if (halt == true) return;

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
        adjustN = notePos[currentN[0]-1];
        if (currentP == "D1") {
            currentND1 = adjustN;
        }
        if (currentP == "D2") {
            currentND2 = adjustN;
        }

        // Actual loop with pause //
        setTimeout(function () {
            // Change display to show the current cycle number //
            if (currentN[0] == 1) {
                $('#cycleDisplay').text(currentCycle);
            }

            // Loop for Drummer 1 //
            if (currentP == "D1") {
                modifyDisplay(1,currentND1,currentVol,currentPitch,"blue",timeMult);
            }

            // Loop for Drummer 2 //
            if (currentP == "D2") {
                modifyDisplay(2,currentND2,currentVol,currentPitch,"green",timeMult);
            }


            //
            next();
        }, currentT * 1 / timeMult);
    })();
}

