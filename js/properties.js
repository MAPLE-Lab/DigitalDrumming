/**
 * Created by kyle on 2016-07-18.
 */
    var timeMult = 1;
    var colorOption = true;
    var pause = false;
    var halt = true;

    var drumData = expData;

    var maxLoops = drumData.length;
    var counter = 0;
    var currentT = 0;

    var countD1 = 0;
    var countD2 = 0;

    var drumVol = [0.5,0.3,0.7,1,0.5,0.3,0.7,1];