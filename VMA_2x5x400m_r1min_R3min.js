/*
######################################### VMA 2x5x400m r1min R3min ##################################
# version : 20150809
#
# DESCRIPTION :
# 	Training :
# 		- type :		VMA
# 		- duration : 	free
# 		- distance : 	free
# 		- HR :			free
# 		- pace :		free
# 		- fast runs :
# 			- reps :		2x5
# 			- duration :	free
# 			- distance :	400m
# 			- HR :			free
# 			- pace :		VMA 95
# 			- short rest : 	1min
# 			- long rest : 	3min
#
# 	WARM UP :
# 		Upon starting exercice, the app is in "Warmup" mode, until the 'LAP' button is pressed for the 1st fast run.
# 		After the 'warmUpMinimumDurationMinutes' is over, the watch displays 'H 0 T'
#
# 	RUNS :
# 		The watch displays "RUN 1" during the 1st fast run, "RUN 2" during the 2nd fast run, and so on.
#
# 	RESTS :
# 		During rests, the watch displays the number of remaining seconds : "RST n S".
#
# 	CALM DOWN :
# 		After the last run, the watch displays "CALM".
#
# VARIABLES :
# 	warmUpMinimumDurationMinutes = 15	can be edited
# 	runLengthMeters = 400				can be edited
# 	restBetweenRepsSeconds = 60			can be edited
# 	restBetweenSeriesSeconds = 180		can be edited
#
# 	step = 0						don't edit
# 	myDurationSeconds = 0			don't edit
# 	myDistanceKm = 0				don't edit
# 	secondsLeft = 0					don't edit
# 	endOfStepSeconds = 0			don't edit
# 	endOfStepKm = 0					don't edit
# 	myResultVar = 0					don't edit
# 	runId = 1						don't edit
# 	restDurationSeconds = 0			don't edit
#
# 	==> Don't forget to set the result format to 0 decimal.
#
# SUGGESTED WATCH SCREEN CONFIGURATION :
#	- pace
#	- <THIS APP>
#	- distance
########################################## ##########################################################
*/

/* While in sport mode do this once per second */
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

		/* Press the "LAP" watch button to go for the first run */
		if (SUUNTO_LAP_NUMBER > 1) {
			Suunto.alarmBeep();
			step = 1;
			myDistanceKm = SUUNTO_DISTANCE;
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
else if (step==1 || step==3 || step==5 || step==7 || step==9 || step==11 || step==13 || step==15 || step==17 || step==19) {

	endOfStepKm = myDistanceKm + runLengthMeters / 1000;

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
		prefix = "RUN";
		myResultVar = runId;
		}
	}


/**********************
 * SHORT + LONG RESTS *
 *********************/
else if (step==2 || step==4 || step==6 || step==8 || step==10 || step==12 || step==14 || step==16 || step==18) {

	restDurationSeconds = restBetweenRepsSeconds;
	/* IS THIS THE LONG REST ? */
	if (step == 10) {
		restDurationSeconds = restBetweenSeriesSeconds;
		}

	endOfStepSeconds = myDurationSeconds + restDurationSeconds;

	/* IS THIS REST OVER ? */
	if (SUUNTO_DURATION > endOfStepSeconds) {
		/* YES : REST IS OVER */
		Suunto.alarmBeep();
		step = step + 1;
		myDistanceKm = SUUNTO_DISTANCE;
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
else if (step > 19) {
	prefix = "CALM";
	}

/* THE END */
