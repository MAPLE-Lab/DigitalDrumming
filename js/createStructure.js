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
        for (j=1; j<=3; j++) {
            var m = j.toString();
            $('.Maj' + n).append(
                '<div class="gridLine Minor Min' + m + '"></div>'
            );
            $('.Min' + m).css("transform", "rotate(" + 7*(j) + "deg)");
        }

    }


    // Create inner note circles and gridlines
    for (i=1; i<=8; i++) {
        var posNum = notePos[i-1];
        var n = posNum.toString();

        $('#circleD1').append(
            '<div class="circleConts1 pos' + n + '">' +
                '<div class="inCircle c1 n' + n + '"></div>' +
                '<div class="circleTick tickD1"></div>' +
            '</div>'
        );
        $('#circleD2').append(
            '<div class="circleConts2 pos' + n + '">' +
                '<div class="inCircle c2 n' + n + '"></div>' +
                '<div class="circleTick tickD2"></div>' +
            '</div>'
        );
    }

});