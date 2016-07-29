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

    // Create Major grid lines
    for (i=1; i<=12; i++) {
        var n = i.toString();
        $('#circleContainer').append(
            '<div class="gridLine Major Maj' + n + '"></div>'
        );
        $('.Maj' + n).css("transform", "rotate(" + 30*(i-1) + "deg)");
        // Create Minor grid lines
        //for (j=1; j<=3; j++) {
        //    var m = j.toString();
        //    $('.Maj' + n).append(
        //        '<div class="gridLine Minor Min' + m + '"></div>'
        //    );
        //    $('.Min' + m).css("transform", "rotate(" + 7*(j) + "deg)");
        //}

    }

    // Create inner note circles and gridlines
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
        '</div>'
    );

    // Create Axis Ticks
    for (i=1; i<=numYTicks; i++) {
        spaceTicks = 345 / (numYTicks - 1);
        $('#yAxis').append(
            '<div class="yAxisTick tickPosY' + i + '"></div>'
        );
        $('.tickPosY' + i).css("bottom", (5 + (spaceTicks * (i-1))) + "px");
    }

});