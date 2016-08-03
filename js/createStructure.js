/**
 * Created by kyle on 2016-07-20.
 */
$(document).ready(function() {
    // Create 2 rings
    $('#circleContainer').append(
            '<div id="circleD1" class="circle"></div>'
        +
            '<div id="circleD2" class="circle"></div>'
    );

    // Create Radar grid lines
    for (i=1; i<=6; i++) {
        var n = i.toString();
        $('#circleContainer').append(
            '<div class="gridLine Major Maj' + n + '"></div>'
        );
        $('.Maj' + n).css("transform", "rotate(" + 60*(i-1) + "deg)");
        // Create Minor grid lines
        //for (j=1; j<=3; j++) {
        //    var m = j.toString();
        //    $('.Maj' + n).append(
        //        '<div class="gridLine Minor Min' + m + '"></div>'
        //    );
        //    $('.Min' + m).css("transform", "rotate(" + 7*(j) + "deg)");
        //}

    }

    // Create Radar inner note circles and ticks
    for (i=1; i<=8; i++) {
        var posNum = notePos[i-1];
        var n = posNum.toString();

        $('#circleD1').append(
                '<div class="inCircle c1 n' + n + ' pos' + n + '">' +
                    '<div class="circleTick tickD1"></div>' +
                '</div>'
        );
        $('#circleD2').append(
                '<div class="inCircle c2 n' + n + ' pos' + n + '">' +
                    '<div class="circleTick tickD2"></div>' +
                '</div>'
        );
    }

    // Create Graph Layout
    $('#graphDisplay').append(
        '<div id="axisContainer">' +
            '<div id="xAxis" class="axis"></div>' +
            '<div id="yAxis" class="axis"></div>' +
            '<div id="dataContainer">' +
                '<div class="D1Data"></div>' +
                '<div class="D2Data"></div>' +
            '</div>' +
        '</div>'
    );

    // Create Axis Ticks
    // Y Axis
    for (i=1; i<=numYTicks; i++) {
        spaceTicks = Math.round(345 / (numYTicks - 1));
        labels = ySpace*i;
        $('#yAxis').append(
            '<div class="yAxisTick tickPosY' + i + '">' +
                '<div class="yAxisLabel" id="yLabel'+i+'">' + Math.round(1 + (spaceTicks*(i-1)/345 *66)) + '</div>' +
            '</div>'
        );
        $('.tickPosY' + i).css("bottom", (5 + (spaceTicks * (i-1))) + "px");
    }

    // Set first y-axis label to 1
    $('#yLabel1').text("1");

    // X Axis
    for (i=1; i<=6; i++) {
        $('#xAxis').append(
            '<div class="xAxisTick tickPosX' + i + '">' +
                '<div class="xAxisLabel" id="xLabel'+i+'">' + xAxisLabelCol[i-1] + '</div>' +
                '<div class="xAxisGridline" id="xGridline'+i+'"></div>' +
            '</div>'
        );
        $('.tickPosX'+i).css("left",(111 + (53.4*(i-1))) + "px");
    }
});