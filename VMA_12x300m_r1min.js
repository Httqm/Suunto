/*
######################################### VMA 12x300m r1min #########################################
# version : 20170306
#
# DESCRIPTION :
# 	Training :
# 		- type :		VMA
# 		- duration : 	free
# 		- distance : 	free
# 		- HR :			free
# 		- pace :		free
# 		- fast runs :
# 			- reps :		12
# 			- duration :	free
# 			- distance :	300m
# 			- HR :			free
# 			- pace :		VMA 100 (3:50min/km +/- 8%)
# 			- rest : 		1min
#
# 	WARM UP :
# 		Upon starting exercice, the app is in "Warmup" mode, until the 'LAP' button is pressed for the 1st fast run.
# 		After the 'warmUpMinimumDurationMinutes' is over, the watch displays 'H 0 T'
#
# 	RUNS :
# 		The watch displays "RUN 1" during the 1st fast run, "RUN 2" during the 2nd fast run, and so on.
#		The built-in pace monitor will warn by displaying if the running pace is :
#			- too fast		: "RUN n --"
#			- within specs	: "RUN n"
#			- too slow		: "RUN n ++"
#
# 	RESTS :
# 		During rests, the watch displays the number of remaining seconds : "RST n S".
#
# 	CALM DOWN :
# 		After the last run, the watch displays "CALM".
#
# VARIABLES :
#	reps = 12							can be edited, reps x runLengthMeters
# 	restBetweenRepsSeconds = 60			can be edited
# 	runLengthMeters = 300				can be edited
# 	warmUpMinimumDurationMinutes = 20	can be edited
#
#
#	PACE MONITORING
# 	==> this declares the target run pace as 3:50 min/km
# 	targetPacePerKmMinutes = 3		can be edited
# 	targetPacePerKmSeconds = 50		can be edited
# 	targetPace = 0					don't edit
# 	paceAlertTooFast = 0			don't edit
# 	paceAlertTooSlow = 0			don't edit
#
# 	paceMarginPercent = 8			can be edited. Means "OK if running within +/-8% of target pace".
# 									With margin = 8% and target pace = 3:50min/km, fastest = 3:39, slowest = 4:02
#
# 	endOfStepKm = 0					don't edit
# 	endOfStepSeconds = 0			don't edit
# 	myDistanceKm = 0				don't edit
# 	myDurationSeconds = 0			don't edit
# 	myResultVar = 0					don't edit
# 	runId = 0						don't edit
# 	secondsLeft = 0					don't edit
# 	step = 0						don't edit
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
			runId = 1;
			step = 1;
			stepOfLastRun = (2 * reps) - 1;

			/* initialize values for pace monitoring */
/*
disabled for Ambit 3 Peak
			targetPace = targetPacePerKmMinutes + (targetPacePerKmSeconds / 60);
			paceAlertTooFast = targetPace * (100 - paceMarginPercent) / 100;
			paceAlertTooSlow = targetPace * (100 + paceMarginPercent) / 100;
*/

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
else if (step>0 && step<=stepOfLastRun && mod(step,2)==1) {

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

		/* PACE MONITOR */
		postfix="";
/*
disabled for Ambit 3 Peak
		if (SUUNTO_PACE > paceAlertTooSlow) { postfix="++"; }
		if (SUUNTO_PACE < paceAlertTooFast) { postfix="--"; }
*/
		}
	}


/********
 * REST *
 *******/
else if (step>1 && step<stepOfLastRun && mod(step,2)==0) {

	endOfStepSeconds = myDurationSeconds + restBetweenRepsSeconds;

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
else if (step > stepOfLastRun) {
	prefix = "CALM";
	}

/* THE END */
