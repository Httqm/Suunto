/*
######################################### VMA 2xNxAm rBs RCs ########################################
# version : 20190522
#
# DESCRIPTION :
#	- type :			VMA
#	- fast runs :
#		- reps :		2xN
#		- distance :	"A" meters ("A" in 200 / 300 / 400 / ...)
#		- short rest :	"B" s
#		- long rest :	"C" s
#
#	WARM UP :
#		Upon starting exercice, the app is in "Warmup" mode, until the 'LAP' button is pressed for the 1st fast run.
#		After the 'warmUpMinimumDurationMinutes' is over, the watch displays 'H 0 T'
#
#	RUNS :
#		The watch displays "RUN 1" during the 1st fast run, "RUN 2" during the 2nd fast run, and so on.
#
#	RESTS :
#		During rests, the watch displays the number of remaining seconds : "RST n S".
#
#	CALM DOWN :
#		After the last run, the watch displays "CALM".
#
# VARIABLES :
#	reps = 5							can be edited, 'N' of program name
#	runLengthMeters = 400				can be edited, 'A' of program name
#	restBetweenRepsSeconds = 60			can be edited, 'B' of program name
#	restBetweenSeriesSeconds = 180		can be edited, 'C' of program name
#	warmUpMinimumDurationMinutes = 25	can be edited
#
#	PACE MONITORING
#	==> this declares the target run pace as 3:50 min/km
#	targetPacePerKm_minutes = 3			can be edited
#	targetPacePerKm_seconds = 50		can be edited
#
#	endOfStepKm = 0					don't edit
#	endOfStepSeconds = 0			don't edit

#	currentFastRun_startPointKm = 0			don't edit
#	currentFastRun_startPointSeconds = 0	don't edit
#	==> these are meant "since the start of the exercice"

#	myDurationSeconds = 0			don't edit	TODO: redundant with 'currentFastRun_startPointSeconds' ?
#	myResultVar = 0					don't edit
#	restDurationSeconds = 0			don't edit
#	runId = 0						don't edit	TODO: this is never displayed anymore. Fix it
#	secondsLeft = 0					don't edit
#	step = 0						don't edit
#
#	==> Don't forget to set the result format to 0 decimal.
#
# SUGGESTED WATCH SCREEN CONFIGURATION :
#	- pace
#	- <THIS APP>
#	- distance
########################################## ##########################################################
*/

/* While in sport mode do this once per second */


/* this looks redundant but is required actually */
prefix = "";
RESULT = myResultVar;
postfix = "";


/***********
 * WARM UP *
 ***********/
if (step < 1) {
	endOfStepSeconds = warmUpMinimumDurationMinutes * 60;

	/* IS THE WARM-UP OVER ? */
	if (SUUNTO_DURATION > endOfStepSeconds) {
		/* YES */
		prefix = "H";
		myResultVar = 0;
		postfix = "T";	/* ==> 'HOT' ;-) */
		stepOfLastRun = (4 * reps) - 1;

		/* Press the "LAP" watch button to go for the first run */
		if (SUUNTO_LAP_NUMBER > 1) {
			Suunto.alarmBeep();
			runId = 1;
			step = 1;
			currentFastRun_startPointKm = SUUNTO_DISTANCE;
			currentFastRun_startPointSeconds = SUUNTO_DURATION;
			}
		}
	else {
		/* NOT YET */
		secondsLeft = endOfStepSeconds - SUUNTO_DURATION;
		prefix = "WUP";	/* 'Warm up' */
		myResultVar = secondsLeft;
		postfix = "S";	/* 'seconds' */
		}
	}


/*******
 * RUN *
 *******/
else if (step>0 && step<=stepOfLastRun && mod(step,2)==1) {

	endOfStepKm = currentFastRun_startPointKm + runLengthMeters / 1000;


	/* IS THIS RUN OVER ? */
	if (SUUNTO_DISTANCE > endOfStepKm) {
		/* YES : RUN IS OVER */
		Suunto.alarmBeep();
		step = step + 1;
		runId = runId + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else {
		/* NOT YET */

		/* BASIC MODE, JUST DISPLAYING 'RUN n' */
/*
		prefix = "RUN";
		myResultVar = runId;
		postfix="";
*/

		/* "Virtual Partner" MODE

			details about the formula below :

				distanceKmInThisRun_me = SUUNTO_DISTANCE - currentFastRun_startPointKm
				distanceMetersInThisRun_me
					= distanceKmInThisRun_me * 1000
					= (SUUNTO_DISTANCE - currentFastRun_startPointKm) * 1000


				durationSecondsSoFarInThisFastRun = SUUNTO_DURATION - currentFastRun_startPointSeconds

				seconds	|	270		|	durationSecondsSoFarInThisFastRun
				--------+-----------+-------------------------------------
				meters	|	1000	|	distanceMetersInThisRun_virtualPartner

				NB: 270s/1000m = 4:30min/km


				distanceMetersInThisRun_virtualPartner
					= durationSecondsSoFarInThisFastRun * 1000 / 270
					= (SUUNTO_DURATION - currentFastRun_startPointSeconds) * 1000 / (60 * targetPacePerKm_minutes + targetPacePerKm_seconds)


				distanceMetersBetweenVirtualPartnerAndMe
					= distanceMetersInThisRun_virtualPartner - distanceMetersInThisRun_me
					= ((SUUNTO_DURATION - currentFastRun_startPointSeconds) * 1000 / (60 * targetPacePerKm_minutes + targetPacePerKm_seconds)) - ((SUUNTO_DISTANCE - currentFastRun_startPointKm) * 1000)
					= ((SUUNTO_DURATION - currentFastRun_startPointSeconds) / (60 * targetPacePerKm_minutes + targetPacePerKm_seconds) - (SUUNTO_DISTANCE - currentFastRun_startPointKm)) * 1000
					= ((SUUNTO_DURATION - currentFastRun_startPointSeconds) / (60 * targetPacePerKm_minutes + targetPacePerKm_seconds) - SUUNTO_DISTANCE + currentFastRun_startPointKm) * 1000

		*/
		prefix = "VP0";
		RESULT = ((SUUNTO_DURATION - currentFastRun_startPointSeconds) / (60 * targetPacePerKm_minutes + targetPacePerKm_seconds) - SUUNTO_DISTANCE + currentFastRun_startPointKm) * 1000;
		postfix = "m";
		}
	}


/**********************
 * SHORT + LONG RESTS *
 *********************/
else if (step>1 && step<stepOfLastRun && mod(step,2)==0) {

	restDurationSeconds = restBetweenRepsSeconds;
	/* IS THIS THE LONG REST ? */
	if (step == (2 * reps)) {
		restDurationSeconds = restBetweenSeriesSeconds;
		}

	endOfStepSeconds = myDurationSeconds + restDurationSeconds;

	/* IS THIS REST OVER ? */
	if (SUUNTO_DURATION > endOfStepSeconds) {
		/* YES : REST IS OVER */
		Suunto.alarmBeep();
		step = step + 1;
		currentFastRun_startPointKm = SUUNTO_DISTANCE;
		currentFastRun_startPointSeconds = SUUNTO_DURATION;
		}
	else {
		/* NOT YET */
		secondsLeft = endOfStepSeconds - SUUNTO_DURATION;
		prefix = "RST";	/* 'Rest' */
		myResultVar = secondsLeft;
		postfix = "S";	/* 'seconds' */
		}
	}


/*************
 * CALM DOWN *
 *************/
else if (step > stepOfLastRun) {
	prefix = "CALM";
	}

/* THE END */
