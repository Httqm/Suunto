/*
######################################### VMA 2xNx30-30 R3min #######################################
# version : 20170904
#
# DESCRIPTION :
#	Training :
#		- type :		VMA
#		- duration :	free
#		- distance :	free
#		- HR :			free
#		- pace :		free
#		- fast runs :
#			- reps :		2 x N (N=8, 10, ...)
#			- duration :	30s
#			- distance :	free
#			- HR :			free
#			- pace :		VMA 100 / VMA 105
#			- short rest :	30s
#			- long rest :	3min
#
#	WARM UP :
#		Upon starting exercice, the app is in "warm up" mode for at least 'warmUpMinimumDurationMinutes'
#		minutes and until the 'LAP' button is pressed for the 1st fast run.
#		During these 'warmUpMinimumDurationMinutes' minutes, the watch displays the number
#		of remaining seconds : "WUP n S".
#		When the warm up is over, the watch displays 'H 0 T'.
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
#	warmUpMinimumDurationMinutes = 25	can be edited
#	reps = 8 / 10 / 12					can be edited, 2x reps x30-30
#	runDurationSeconds = 30				can be edited
#	restBetweenRepsSeconds = 30			can be edited
#	restBetweenSeriesMinutes = 3		can be edited
#
#	endOfStepSeconds = 0				don't edit
#	myDurationSeconds = 0				don't edit
#	restDurationSeconds = 0				don't edit
#	runId = 0							don't edit
#	step = 0							don't edit
#	stepOfLastRun = 0					don't edit
#
#	==> Don't forget to set the result format to 0 decimal.
#
# SUGGESTED WATCH SCREEN CONFIGURATION :
#	- pace
#	- this app
#	- distance
########################################## ##########################################################

NB :	pace monitoring has been disabled because it makes the whole program fail when started on
		an Ambit 3 Peak (with firmware 2.4.1) : upon starting app, it stays stuck on "WUP -- S"
		(root cause unknown so far).
		Refer to previous versions (Git is your friend ;-) to see/restore pace monitoring code.
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
		RESULT = 0;
		postfix = "T";	/* ==> 'HOT' ;-) */

		/* Press the "LAP" watch button to go for the first run */
		if (SUUNTO_LAP_NUMBER > 1) {
			Suunto.alarmBeep();

			runId = 1;
			step = 1;
			stepOfLastRun = (4 * reps) - 1;

			myDurationSeconds = SUUNTO_DURATION;	/* do this as late as possible for better accuracy */
			}
		}
	else {
		/* NOT YET */
		prefix = "WUP";	/* 'Warm up' */
		RESULT = endOfStepSeconds - SUUNTO_DURATION;	/* nb of seconds left */
		postfix = "S";	/* 'seconds' */
		}
	}


/*******
 * RUN *
 *******/
else if (step>=1 && step<=stepOfLastRun && mod(step,2)==1) {

	endOfStepSeconds = myDurationSeconds + runDurationSeconds;

	/* IS THIS RUN OVER ? */
	if (SUUNTO_DURATION > endOfStepSeconds) {
		/* YES : RUN IS OVER */
		Suunto.alarmBeep();
		step = step + 1;
		runId = runId + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else {
		/* NOT YET */
		prefix = "RUN";
		RESULT = runId;
		postfix = "";
		}
	}


/**********************
 * SHORT + LONG RESTS *
 *********************/
else if (step>=2 && step<=(stepOfLastRun - 1) && mod(step,2)==0) {

	restDurationSeconds = restBetweenRepsSeconds;
	if (step == (2 * reps)) {
		restDurationSeconds = restBetweenSeriesMinutes * 60;
		}

	endOfStepSeconds = myDurationSeconds + restDurationSeconds;

	/* IS THIS REST OVER ? */
	if (SUUNTO_DURATION > endOfStepSeconds) {
		/* YES : REST IS OVER */
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else {
		/* NOT YET */
		prefix = "RST";	/* 'Rest' */
		RESULT = endOfStepSeconds - SUUNTO_DURATION;	/* nb of seconds left */
		postfix = "S";	/* 'seconds' */
		}
	}


/*************
 * CALM DOWN *
 *************/
else if (step > stepOfLastRun) {
	prefix = "CALM";
	postfix = "";
	}

/* THE END */
