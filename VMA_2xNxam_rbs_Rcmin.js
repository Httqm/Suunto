/*
######################################### VMA 2xNxam rbs Rcmin ###################################
# version : 20190517
#
# DESCRIPTION :
#	- type :			VMA
#	- fast runs :
#		- reps :		2xN
#		- distance :	"a" meters ("a" in 200 / 300 / 400 / ...)
#		- short rest :	"b" s
#		- long rest :	"c" min
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
#	reps = 5							can be edited, 2x reps x runLengthMeters
#	restBetweenRepsSeconds = 60			can be edited
#	restBetweenSeriesSeconds = 180		can be edited
#	runLengthMeters = 400				can be edited
#	warmUpMinimumDurationMinutes = 25	can be edited
#
#	PACE MONITORING
#	==> this declares the target run pace as 3:50 min/km
#	targetPacePerKm_minutes = 3		can be edited
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

/* may be redundant
prefix = "";
RESULT = myResultVar;
postfix = "";
*/

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

				distanceKmInThisRun_me = (SUUNTO_DISTANCE - currentFastRun_startPointKm)

				durationSecondsSoFarInThisFastRun = (SUUNTO_DURATION - currentFastRun_startPointSeconds)
				distanceMetersInThisRun_virtualPartner = (SUUNTO_DURATION - currentFastRun_startPointSeconds) * 1000 / (60 * targetPacePerKm_minutes + targetPacePerKm_seconds);
				distanceKmInThisRun_virtualPartner = (SUUNTO_DURATION - currentFastRun_startPointSeconds) / (60 * targetPacePerKm_minutes + targetPacePerKm_seconds);

				distanceMetersBetweenVirtualPartnerAndMe = (distanceKmInThisRun_virtualPartner - distanceKmInThisRun_me) * 1000;
				distanceMetersBetweenVirtualPartnerAndMe = ((SUUNTO_DURATION - currentFastRun_startPointSeconds) / (60 * targetPacePerKm_minutes + targetPacePerKm_seconds) - (SUUNTO_DISTANCE - currentFastRun_startPointKm)) * 1000;
		*/
		prefix = "VP0";
		RESULT = ((SUUNTO_DURATION - currentFastRun_startPointSeconds) / (60 * targetPacePerKm_minutes + targetPacePerKm_seconds) - (SUUNTO_DISTANCE - currentFastRun_startPointKm)) * 1000;
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
