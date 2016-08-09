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

    if (timeMult < 6 && audioOption == true) {
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
        // Create element
        $('.D' + num + 'Data').append(
            '<div id="' + datumID + '" class="datum datumD' + num + ' d' + cCycle + '">' +
                '<div class="dataFolder dataFPlot" id="plot_' + datumID + '">' + diffT + '</div>' +
                '<p class="datumGraphFolder" ></p>' +
            '</div>');

        // Create FX
        $('#' + datumID).hover(function() {
            $(this).addClass("dataHover");
            $('.datum').css("z-index","1");
            $(this).css("z-index","2");
            $('.datumGraphFolder').hide();
            $(this).children('.datumGraphFolder').show();
        }, function() {
            $(this).removeClass("dataHover");
            $('.datumGraphFolder').hide();
            $(this).children('.datumGraphFolder').hide();
        });
    }

    // Insert new data into folders
    $('#plot_' + datumID).text(diffT);
    $('#' + datumID).children('.datumGraphFolder').html('Cycle: ' + cCycle +  '<br>Drummer: ' + num + '<br>Relative Time: ' + (diffT*scalingFactor).toFixed(1) + 'ms');


    // Position datum in new place
    $('#' + datumID).css({
        bottom: (ySpace * Number(cCycle)) + "px",
        left: (110 + (320 * (diff))) + "px"
    });

    // Bring this datum out of hiding (unless reverse, then hide it)
    if (direction == "fwd") {
        $('#' + datumID).show();
    } else if (direction == "rev") {
        $('#' + datumID).hide();
    }


    // // Show the current plotted datapoint
    // $('.datum').removeClass("currentDatum");
    // $('#' + datumID).addClass("currentDatum");
}

//////////////////////////////////////////////////////////////////////////
// Align Note: Indicator that two notes (between drummers) are aligned //
////////////////////////////////////////////////////////////////////////
function alignNote() {
    // Before anything, check to load new alignment range
    tempAlign = document.getElementById('alignmentInput').value;
    alignmentRange = Number(tempAlign) / scalingFactor;

    // Then check if anything aligns for D1
    for (i = 1; i <= 8; i++) { // Drummer 1 (Outer)
        loopD1flag = false;
        for (j = 1; j <= 8; j++) { // Drummer 2 (Inner)

            tempData1 = Number($('#D1_data' + i).text()); // Drummer 1 data
            tempData2 = Number($('#D2_data' + j).text()); // Drummer 2 data

            if ((tempData2 - alignmentRange) <= tempData1 && tempData1 <= (
                tempData2 + alignmentRange)) {
                alignmentTracker[i-1] = j;
                loopD1flag = true;
            } else if ((tempData2 - alignmentRange) <= (tempData1-1) && (tempData1-1) <= (
                tempData2 + alignmentRange)) {
                alignmentTracker[i-1] = j;
                loopD1flag = true;
            }
        }
        if (loopD1flag == true) { }
        else {
            alignmentTracker[i-1] = 0;
        }
    }

    // Check resulting array to show alignment
    $('.inCircle.c2').removeClass("alignedD2");
    for (k = 1; k <=8; k++) {
        currentAlign = alignmentTracker[k-1];
        if ( currentAlign == 0) {
            $('.inCircle.c1.cID_' + (k)).removeClass("alignedD1");
        } else {
            $('.inCircle.c1.cID_' + (k)).addClass("alignedD1");
            $('.inCircle.c2.cID_' + alignmentTracker[k-1]).addClass("alignedD2");
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
        if (counter > (maxLoops - 1) ) {
            if (direction == "fwd") {
                $('.controls').removeClass('buttonClicked');
                $('#pauseBttn').addClass('buttonClicked');
                playing = "no";
                pause = true;
            }
        }
        if (counter < 0) {
            if (direction == "rev") {
                $('.controls').removeClass('buttonClicked');
                $('#pauseBttn').addClass('buttonClicked');
                playing = "no";
                pause = true;
            }
        }
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

        // Set Data Offset //
        if (dataType == "experimental")  {
            baseOffset = 19.6451613;
        } else if (dataType == "theoretical") {
            baseOffset = 0;
        }

        if (counter < 0) {
            counter = 0;
        } else if (counter >= maxLoops) {
            counter = maxLoops - 1;
        }


        if (counter == 0) {
            pastdiff = 0;
        } else if (counter == (maxLoops-1)) {
            pastdiff = counter;
        } else {
            if (direction == "fwd") {
                pastdiff = counter - 1;
            } else if (direction == "rev") {
                pastdiff = counter + 1;
            }
        }

        // Set values for this loop //
        maxLoops = drumData.length;
        currentT = Math.abs(drumData[counter][0] - drumData[pastdiff][0]); // time until next loop iteration
        relativeT = (drumData[counter][1]); // difference time to rotate with (against theoretical)
        diffT = (relativeT + baseOffset)/scalingFactor;
        currentP = drumData[counter][2]; // Performer for this loop
        currentN = drumData[counter][3]; // Note number for this loop (in form "1-d1"
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

        if (direction == "fwd") {
            counter = counter + 1;
        } else if (direction == "rev") {
            counter = counter - 1;
        }

    })();
}