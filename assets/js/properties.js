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
// All the properties that are used further by the program. Must be loaded first.


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
var cycleIteration = 0;
var chosenIteration = 0;
///////////////
// Data Set //
/////////////
var baseOffset = 0;
var theoOffset = 0;
var expOffset = 19.6451613;

var scalingFactor = 1276.66129032258;
var modScalingFactor = 1489.438172;
var beatDiff = 212.77688172043;

var comparisonSlotNum = 1;


///////////////
// Trackers //
/////////////
var counter = 0; // Main counter for the loop
var counterdiff = 0;
var currentT = 0; // Current time (in ms) to wait until next loop (is loaded dynamically)

// Unused
var countD1 = 0; // Counter for how many times Drummer 1 has been updated
var countD2 = 0; // Counter for how many times Drummer 2 has been updated
var alignmentRange = 2; // in milleseconds

///////////////
// Playback //
/////////////
var timeMult = 1; // Playback speed multiplier
var direction = "fwd";
var audioOption = true;

///////////////////////
// Audio Production //
/////////////////////
var drumVol = [ // Volume for notes 1-8
    0.1,
    0.2,
    0.3,
    0.4,
    0.1,
    0.2,
    0.3,
    0.4
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
var xAxisLabelCol = ["One", "Two", "Three", "Four", "Five", "Six"];
var currXAxisLabel = "Default";
var resetCalled = false;
var currentAlign = 0;
var insertNumb = 0;
var alignmentTracker = [
    // Position = D1 Note
    // Value = Aligned D2 Note
    0, // 1
    0, // 2
    0, // 3
    0, // 4
    0, // 5
    0, // 6
    0, // 7
    0  // 8
];
var thisTicksCycle = 1;
var newPositionCounter = 0;
var noteCheckFlag = "no";