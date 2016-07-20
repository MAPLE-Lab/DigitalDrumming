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
    // Create inner note circles
    for (i=1; i<=8; i++) {
        var num = i;
        var n = num.toString();
        $('#circleD1').append(
            '<div class="circleConts1 pos' + n + '">' +
            '<div class="inCircle c1 n' + n + '"></div>' +
            '</div>'
        );
        $('#circleD2').append(
            '<div class="circleConts2 pos' + n + '">' +
            '<div class="inCircle c2 n' + n + '"></div>' +
            '</div>'
        );
    }

});