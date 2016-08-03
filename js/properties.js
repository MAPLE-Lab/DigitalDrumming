/**
 * Created by kyle on 2016-07-18.
 */
///////////////
// Controls //
/////////////
    var advDisplay = true; // Display advanced circle plot
    var colorOption = true; // Show colours as notes are played
    var pause = false; // Pause playback
    var halt = false; // Stop playback (can only be reset)
    var dataType = "theoretical"; // Choose between data sets to load
    var playing = "no";
    var gridOption = true;

////////////////
// Load Data //
//////////////
    if (dataType == "experimental") {
        var drumData = expData; // Loads experimental data if set
    } else if (dataType == "theoretical") {
        var drumData = theoData; // Loads theoretical data if set
    } else {
        var drumData = expData; // Defaults to experimental
    }
    var maxLoops = drumData.length; // Calculate length of the data
    var notePos = [
        1,
        2,
        3,
        5,
        7,
        8,
        9,
        11,
    ];

///////////////
// Trackers //
/////////////
    var counter = 0; // Main counter for the loop
    var counterdiff = 0;
    var currentT = 0; // Current time (in ms) to wait until next loop (is loaded dynamically)

    // Unused
    var countD1 = 0; // Counter for how many times Drummer 1 has been updated
    var countD2 = 0; // Counter for how many times Drummer 2 has been updated

///////////////
// Playback //
/////////////
    var timeMult = 1; // Playback speed multiplier
    var direction = "fwd";

///////////////////////
// Audio Production //
/////////////////////
    var drumVol = [ // Volume for notes 1-8
        0.2,
        0.3,
        0.4,
        0.5,
        0.2,
        0.3,
        0.4,
        0.5
    ];
    var drumPitch = [ // Pitch for notes 1-8
        220,
        220,
        220,
        220,
        220,
        220,
        220,
        220
    ];

/////////////////
// Set Values //
///////////////
    var diffT = 0;
    var currentP = "D1";
    var currentN = 8;
    var currentND1 = 1;
    var currentND2 = 1;
    var currentCycle = 1;
    var currentVol = 1;
    var currentPitch = 200;
    var currentCol = "green";
    var adjustN = 1;
    var startCol = "lightred";
    var numYTicks = 9;
    var ySpace = 345 / 66;
    var datumID = "default";
    var datumIDClass = '.default';
    var xAxisLabelCol = [
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six"
    ];
    var currXAxisLabel = "Default";
    var resetCalled = false;