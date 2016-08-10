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
            $(this).children('.tickTooltip').fadeIn(100, false);
        }, function() {
            $(this).removeClass('tickHover');
            $(this).children('.tickTooltip').fadeOut(200, false);
        });

        // Add click effect
        $('.tickPosY' + y).click(function() {
            playing = "no";
            pause = true;
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
});