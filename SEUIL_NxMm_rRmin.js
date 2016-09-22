/*
######################################### SEUIL NxMm rRmin #######################################
# version : 20160922
#
# DESCRIPTION :
# 	long training (no duration/distance specified)
# 	Includes N fast runs in which :
# 		- length (M meters)
# 		- pace (see below)
# 		- rest between runs (R minutes)
# 		are specified by init. variables.
#
# 	WARM UP :
# 		Upon starting exercice, the app is in "Warmup" mode, until the 'LAP' button is pressed for the 1st fast run.
# 		After the 'warmUpMinimumDurationMinutes' is over, the watch displays 'H 0 T'
#
# 	RUNS :
# 		The watch displays "1 RUN" during the 1st fast run, "2 RUN" during the 2nd fast run, and so on.
#
# 	PACE CONTROL :
#		The built-in pace monitor will warn by displaying if the running pace (compared to target pace +/- margin%) is :
#			- too fast		: "RUN n --"
#			- within specs	: "RUN n"
#			- too slow 		: "RUN n ++"
#
# 	RESTS :
# 		During rests, the watch displays the number of remaining seconds : " RST n s".
#
# 	CALM DOWN :
# 		After the last run, the watch displays "CALM".
#
# VARIABLES :
# 	warmUpMinimumDurationMinutes = 20	can be edited
#	reps = 4							can be edited
# 	runLengthMeters = 2000				can be edited
# 	restBetweenRunsSeconds = 120		can be edited
#
# 	==> this declares the target run pace as 4min25s/km
# 	targetPacePerKmMinutes = 4			can be edited
# 	targetPacePerKmSeconds = 25			can be edited
# 	targetPace = 0						don't edit
# 	paceAlertTooFast = 0				don't edit
# 	paceAlertTooSlow = 0				don't edit
#
# 	paceMarginPercent = 8				can be edited. Means "OK if running within +/-8% of target pace".
# 										With margin = 8% and target pace = 4:25min/km, fastest = 4:02, slowest = 4:45
#
# 	step = 0							don't edit
# 	myDurationSeconds = 0				don't edit
# 	myDistanceKm = 0					don't edit
# 	secondsLeft = 0						don't edit
# 	myResultVar = 0						don't edit
# 	runId = 0							don't edit
# 	endOfStepSeconds = 0				don't edit
# 	endOfStepKm = 0						don't edit
#
# 	==> Don't forget to set the result format to 0 decimal.
#
# SUGGESTED WATCH SCREEN CONFIGURATION :
#	- pace
#	- this app
#	- distance
########################################## ##########################################################
*/

/* While in sport mode do this once per second */
prefix  = "";
RESULT  = myResultVar;
postfix = "";


/***********
 * WARM UP *
 **********/
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
			targetPace = targetPacePerKmMinutes + (targetPacePerKmSeconds / 60);
			paceAlertTooFast = targetPace * (100 - paceMarginPercent) / 100;	/* these are minutes/km, so the lower the value, the faster you run */
			paceAlertTooSlow = targetPace * (100 + paceMarginPercent) / 100;	/* ...and vice-versa ;-) */

			myDistanceKm = SUUNTO_DISTANCE;	/* do this as late as possible for better accuracy */
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
 ******/
else if (step>=1 && step<=stepOfLastRun && mod(step,2)==1) {

	endOfStepKm = myDistanceKm + runLengthMeters / 1000;

	/* IS THIS RUN OVER ? */
	if (SUUNTO_DISTANCE > endOfStepKm) {
		/* YES : RUN IS OVER */
		Suunto.alarmBeep();
		step = step + 1;
		runId = runId + 1;
		myDurationSeconds = SUUNTO_DURATION;
		/*
		SUUNTO_LAP_NUMBER = SUUNTO_LAP_NUMBER + 1;
		This would be great but is not supported so far :-(
		*/
		}
	else {
		/* NOT YET */
		prefix = "RUN";
		myResultVar = runId;

		/* PACE MONITORING */
		postfix = "";
		if (SUUNTO_PACE > paceAlertTooSlow) { postfix = "++"; }
		if (SUUNTO_PACE < paceAlertTooFast) { postfix = "--"; }
		}
	}


/********
 * REST *
 *******/
else if (step>=2 && step<=(stepOfLastRun - 1) && mod(step,2)==0) {

	endOfStepSeconds = myDurationSeconds + restBetweenRunsSeconds;

	/* IS THIS REST OVER ? */
	if (SUUNTO_DURATION > endOfStepSeconds) {
		/* YES : REST IS OVER */
		Suunto.alarmBeep();
		step = step + 1;
		myDistanceKm = SUUNTO_DISTANCE;
		/*
		SUUNTO_LAP_NUMBER = SUUNTO_LAP_NUMBER + 1;
		This would be great but is not supported so far :-(
		*/
		}
	else {
		/* NOT YET */
		secondsLeft = endOfStepSeconds - SUUNTO_DURATION;
		prefix = "RST";
		myResultVar = secondsLeft;
		postfix = "S";
		}
	}


/*************
 * CALM DOWN *
 *************/
else if (step > stepOfLastRun) {
	prefix = "CALM";
	}

/* THE END */
