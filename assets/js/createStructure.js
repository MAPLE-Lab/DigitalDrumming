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

// This file creates the main structure of both the radar plot and the graph to then be manipulated by code in drumCode.js
$(document).ready(function() {
    // Create 2 rings
    $('#circleContainer').append(
        '<div id="circleD1" class="circle"></div>' +
        '<div id="circleD2" class="circle"></div>');
    // Create Radar grid lines
    for (i = 1; i <= 6; i++) {
        var n = i.toString();
        $('#circleContainer').append('<div class="gridLine Major Maj' +
            n + '"></div>');
        $('.Maj' + n).css("transform", "rotate(" + 60 * (i - 1) +
            "deg)");
    }
    // Create Radar inner note circles and ticks
    for (i = 1; i <= 8; i++) {
        var posNum = notePos[i - 1];
        var n = posNum.toString();
        $('#circleD1').append('<div class="inCircle c1 cID_' + i + ' n' +
            n + ' pos' + n + '">' +
            '<div class="dataFolder dataFCircle" id="D1_data' + i +
            '"></div>' + '<div class="circleTick tickD1"></div>' +
            '</div>');
        $('#circleD2').append('<div class="inCircle c2 cID_' + i + ' n' +
            n + ' pos' + n + '">' +
            '<div class="dataFolder dataFCircle" id="D2_data' + i +
            '"></div>' + '<div class="circleTick tickD2"></div>' +
            '</div>');
    }
    // Create Graph Layout
    $('#graphDisplay').append('<div id="axisContainer">' +
        '<div id="xAxis" class="axis"></div>' +
        '<div id="yAxis" class="axis">' +
        '<div id="yAxisname">Measure Number</div>' +
        '</div>' +
        '<div id="dataContainer">' + '<div class="D1Data"></div>' +
        '<div class="D2Data"></div>' + '</div>' + '</div>');

    // Create Axis Ticks
    var majorCount = 8;
    // Y Axis Major
    for (y= 1; y<= 67; y++) {
        // Figure out spacing
        spaceTicks = 345 / (67-1);

        // Track for Major Lines
        majorCount = majorCount + 1;

        // Add Major and Minor lines
        if (majorCount >= 8) {
            $('#yAxis').append('<div class="yTicks yAxisTick tickPosY' + y+ '">' +
                '<div class="yAxisLabel" id="yLabel' + y+ '">' + y+ '</div>' +
                '<div class="yAxisLabeltooltip tickTooltip majorLabel" id="yLabel' + y+ '">' + y+ '</div>' +
                '</div>');
            majorCount = 0;
        } else {
            $('#yAxis').append('<div class="yTicks yAxisTickMinor tickPosY' + y+ '">' +
                '<div class="yAxisLabeltooltip tickTooltip minorLabel" id="yLabel' + y+ '">' + y+ '</div>' +
                '</div>');
        }

        // Move lines in position
        $('.tickPosY' + y).css("bottom", (5 + (spaceTicks * (y- 1))) +
            "px");

        // Add in hover effect
        $('.tickPosY' + y).hover(function() {
            $(this).addClass('tickHover');
            $('.yTicks').css("z-index","1");
            $(this).css("z-index","2");
            $(this).children('.tickTooltip').fadeIn(80, false);
        }, function() {
            $(this).removeClass('tickHover');
            $(this).children('.tickTooltip').fadeOut(100, false);
        });

        // Add click effect
        $('.tickPosY' + y).click(function() {
            playing = "no";
            pause = true;
            $('.controls').removeClass('buttonClicked');
            $('#pauseBttn').addClass('buttonClicked');
            currentCycle = Number($(this).children('.yAxisLabeltooltip').text());
            $('.yTicks').removeClass('currentYTick');
            $('.tickPosY' + currentCycle).addClass('currentYTick');
            $('#cycleDisplay').text(currentCycle);
            for (tickJ = 0; tickJ < (maxLoops - 1); tickJ++) {
                cycleIteration = drumData[tickJ][4];
                if (currentCycle == Number(cycleIteration)) {
                    counter = tickJ;
                    return;
                }
            }
            // newPositionCounter = 0;
            // noteCheckFlag = "no";
            // while (noteCheckFlag == "no") {
            //     newPositionCounter = newPositionCounter + 1;
            //     chosenIteration = drumData[counter + newPositionCounter][4];
            //     if (currentCycle != Number(chosenIteration)) {
            //         noteCheckFlag = "yes";
            //         return;
            //     } else {
            //         // Load data into radar folders
            //         // Set Data Offset //
            //         if (dataType == "experimental")  {
            //             baseOffset = 19.6451613;
            //         } else if (dataType == "theoretical") {
            //             baseOffset = 0;
            //         }
            //         relativeT = (drumData[counter][1]); // difference time to rotate with (against theoretical)
            //         diffT = (relativeT + baseOffset)/scalingFactor;
            //         currentP = drumData[counter + newPositionCounter][2]; // Performer for this loop
            //         currentN = drumData[counter + newPositionCounter][3]; // Note number for this loop (in form "1-d1"
            //         if (currentP == "D1") {
            //             $('#D' + 1 + '_data' + currentN[0]).text(String(diffT));
            //
            //             // Rotate Position
            //             $('.c' + 1 + '.pos' + currentN[0]).css("transform", "rotate(" + (360 * diffT) +
            //                 "deg)");
            //         }
            //         if (currentP == "D2") {
            //             $('#D' + 2 + '_data' + currentN[0]).text(String(diffT));
            //
            //             // Rotate Position
            //             $('.c' + 2 + '.pos' + currentN[0]).css("transform", "rotate(" + (360 * diffT) +
            //                 "deg)");
            //         }
            //
            //     }
            //
            // }
        });

    }

    // Set first y-axis label to 1
    $('#yLabel1').text("1");

    // X Axis
    for (i = 1; i <= 6; i++) {
        $('#xAxis').append('<div class="xAxisTick tickPosX' + i + '">' +
            '<div class="xAxisLabel" id="xLabel' + i + '">' +
            xAxisLabelCol[i - 1] + '</div>' +
            '<div class="xAxisGridline" id="xGridline' + i +
            '"></div>' + '</div>');
        $('.tickPosX' + i).css("left", (111 + (53.4 * (i - 1))) + "px");
    }

    // Create Comparison Viewer
    $('#comparisonDisplay').append(
        '<div id="slot1">' +
        '   <div id="slot1Title" class="slotTitles">Slot One</div>' +
        '   <label class="compLabel" for="DrummerNum_1">Drummer: </label><div id="DrummerNum_1" class="DrummerNum comparisonLabel"></div>' +
        '   <label class="compLabel"  for="CycleNum_1">Cycle: </label><div id="CycleNum_1" class="CycleNum comparisonLabel"></div>' +
        '   <label class="compLabel timeLabel"  for="DataNum_1">ms</label><div id="DataNum_1" class="DataNum comparisonLabel"></div>' +
        '   <label class="compLabel timeLabel"  for="DataBeat_1">beats</label><div id="DataBeat_1" class="DataBeat comparisonLabel"></div>' +
        '</div>' +
        '<div id="slot2">' +
        '   <div id="slot2Title" class="slotTitles">Slot Two</div>' +
        '   <label class="compLabel"  for="DrummerNum_2">Drummer: </label><div id="DrummerNum_2" class="DrummerNum comparisonLabel"></div>' +
        '   <label class="compLabel"  for="CycleNum_2">Cycle: </label><div id="CycleNum_2" class="CycleNum comparisonLabel"></div>' +
        '   <label class="compLabel timeLabel"  for="DataNum_2">ms</label><div id="DataNum_2" class="DataNum comparisonLabel"></div>' +
        '   <label class="compLabel timeLabel"  for="DataBeat_2">beats</label><div id="DataBeat_2" class="DataBeat comparisonLabel"></div>' +
        '</div>' +
        '<div id="comparison">' +
        '   <div id="DifferenceNumber"></div>' +
        '</div>'
    );
});