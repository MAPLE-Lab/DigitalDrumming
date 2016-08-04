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

// This file holds all the main functions used to plot the data and rotate the radar plot

/////////////////////////////////////////////////////////////////////////////
// Modify Display: Main function that plays audio and animates Radar plot //
///////////////////////////////////////////////////////////////////////////
function modifyDisplay(num, cND, cVol, cPitch, cCol, startCol, tMult, noteNum) {
    // Play audio if speed isn't too fast
    if (timeMult < 6) {
        T("perc", {
            r: 200
        }, T("sin", {
            freq: cPitch,
            mul: cVol
        })).on("ended", function() {
            this.pause();
        }).bang().play();
    } else {}
    // Animate color
    if (colorOption == true) {
        $('.c' + num + '.n' + cND).animate({
            backgroundColor: cCol
        }, 150 * 1 / Math.abs(tMult));
        if (currentN[0] == 1) {
            $('.c' + num + '.n' + cND).animate({
                backgroundColor: startCol
            }, 200 * 1 / Math.abs(tMult));
        } else {
            $('.c' + num + '.n' + cND).animate({
                backgroundColor: "white"
            }, 200 * 1 / Math.abs(tMult));
        }
    }
    // Load data into radar folders
    $('#D' + num + '_data' + noteNum).text(String(diffT));
    // Rotate Position
    $('.c' + num + '.pos' + cND).css("transform", "rotate(" + (360 * diffT) +
        "deg)");
}

////////////////////////////////////////////////////////////////////
// Reset Drum Loop: Called when reset or data buttons are pushed //
//////////////////////////////////////////////////////////////////
function resetDrumLoop() {
    resetCalled = true;
    $('#cycleDisplay').text('1');
    $('.datum').hide();
    counter = 0;
    currentT = 0;
    for (i = 1; i <= 12; i++) {
        $('.pos' + i).css("transform", "rotate(" + (30 * (i - 1)) + "deg)");
    }
}

//////////////////////////////////////////////////////////////////////
// Plot Datum: Main function for plotting data on the scatter plot //
////////////////////////////////////////////////////////////////////
function plotDatum(num, cCycle, cND, cPerf, dType, diff) {
    // Define current Datum id
    datumID = "datum" + cCycle + "_" + cND + "_" + cPerf;
    // Check if datum exists. If not, create it.
    if ($('#' + datumID).length > 0) {} else {
        $('.D' + num + 'Data').append('<div id="' + datumID +
            '" class="datum datumD' + num + ' d' + cCycle + '">' +
            '<div class="dataFolder dataFPlot" id="plot_' + datumID +
            '">' + diffT + '</div>' + '</div>');
    }
    // Position datum in new place
    $('#' + datumID).css({
        bottom: (ySpace * Number(cCycle)) + "px",
        left: (110 + (320 * (diff))) + "px"
    });
    // Bring this datum out of hiding
    $('#' + datumID).show();
}

//////////////////////////////////////////////////////////////////////////
// Align Note: Indicator that two notes (between drummers) are aligned //
////////////////////////////////////////////////////////////////////////
function alignNote() {
    // Before anything, check to load new alignment range
    tempAlign = document.getElementById('alignmentInput').value;
    alignmentRange = Number(tempAlign) / 100;
    // Then check if anything aligns
    for (i = 1; i <= 8; i++) {
        tempData1 = Number($('#D1_data' + i).text());
        tempData2 = Number($('#D2_data' + i).text());
        if ((tempData1 - alignmentRange) <= tempData2 && tempData2 <= (
            tempData1 + alignmentRange)) {
            $('.inCircle.c1.cID_' + i).addClass("aligned");
            $('.inCircle.c2.cID_' + i).addClass("aligned");
        } else if ((tempData2 - alignmentRange) <= tempData1 && tempData1 <=
            (tempData2 + alignmentRange)) {
            $('.inCircle.c1.cID_' + i).addClass("aligned");
            $('.inCircle.c2.cID_' + i).addClass("aligned");
        } else {
            $('.inCircle.c1.cID_' + i).removeClass("aligned");
            $('.inCircle.c2.cID_' + i).removeClass("aligned");
        }
    }
}


/////////////////////////////////////////////////////////////////////////////////////
// Run Drum Loop: Crux of the code. This iterates through dataset with time delay //
///////////////////////////////////////////////////////////////////////////////////

function runDrumLoop() {
    (function next() {
        // Main loop to go through data
        // Pause or Stop loop checks //
        if (pause == true) {
            if (resetCalled == true) {
                $('#cycleDisplay').text('1');
                $('.datum').hide();
                counter = 0;
                currentT = 0;
                for (i = 1; i <= 12; i++) {
                    $('.pos' + i).css("transform", "rotate(" + (30 * (i -
                        1)) + "deg)");
                }
            }
            resetCalled = false;
            return;
        }
        // Set direction of loop //
        if (direction == "fwd") {
            if (0 >= counter++ >= maxLoops) return;
        } else if (direction == "rev") {
            if (0 >= counter-- >= maxLoops) return;
        } else {
            if (0 >= counter++ >= maxLoops) return;
        }
        // Set values for this loop //
        if (counter - 1 < 0) {
            counterdiff = 0;
        } else {
            counterdiff = counter - 1;
        }
        currentT = Math.abs(drumData[counter][0] - drumData[counterdiff]
                [0]); // time until next loop iteration
        diffT = (drumData[counter][1]); // difference time to rotate with (against theoretical)
        currentP = drumData[counter][2]; // Performer for this loop
        currentN = drumData[counter][3]; // Note number for this loop
        currentCycle = drumData[counter][4];
        currentVol = drumVol[currentN[0] - 1];
        currentPitch = drumPitch[currentN[0] - 1];
        adjustN = notePos[currentN[0] - 1];
        if (currentP == "D1") {
            currentND1 = adjustN;
        }
        if (currentP == "D2") {
            currentND2 = adjustN;
        }
        // Graph
        // Actual loop with pause //
        setTimeout(function() {
            // Change display to show the current cycle number //
            if (currentN[0] == 1) {
                $('#cycleDisplay').text(currentCycle);
            }
            // Loop for Drummer 1 //
            if (currentP == "D1") {
                modifyDisplay(1, currentND1, currentVol, 220,
                    "blue", "#ADD8E6", timeMult, currentN[0]
                );
                plotDatum(1, currentCycle, currentND1, currentP,
                    dataType, diffT);
            }
            // Loop for Drummer 2 //
            if (currentP == "D2") {
                modifyDisplay(2, currentND2, currentVol, 330,
                    "green", "#90EE90", timeMult, currentN[
                        0]);
                plotDatum(2, currentCycle, currentND2, currentP,
                    dataType, diffT);
            }
            alignNote();
            //
            next();
        }, currentT * 1 / timeMult);
    })();
}