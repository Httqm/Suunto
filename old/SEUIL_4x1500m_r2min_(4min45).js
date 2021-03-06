/*
######################################### SEUIL 4x1500m r2min ########################################
# version : 20150809
#
# DESCRIPTION :
#	long training (no duration/distance/pace specified)
#	Includes 4 fast runs in which :
#		- length
#		- pace
#		- rest between runs
#		are specified by init. variables.
#		The number of fast runs can not configured.
#
#	WARM UP :
#		Upon starting exercice, the app is in "warm up" mode for at least 'warmUpMinimumDurationMinutes'
#		minutes and until the 'LAP' button is pressed for the 1st fast run.
#		During these 'warmUpMinimumDurationMinutes' minutes, the watch displays the number
#		of remaining seconds : "W n S".
# 		When the warm-up is over, the watch displays 'H 0 T'.
#
#	RUNS :
#		The watch displays "1 RUN" during the 1st fast run, "2 RUN" during the 2nd fast run, and so on.
#
#	PACE CONTROL :
#		If running too fast (target pace - margin%), the display will be " n Run--".
#		If running too slow, the display will be " n Run++".
#
#	RESTS :
#		During rests, the watch displays the number of remaining seconds : " R n s".
#
#	CALM DOWN :
#		After the last run, the watch displays "CALM".
#
#
# VARIABLES :
#	warmUpMinimumDurationMinutes = 15	can be edited
#	fastRunLengthMeters = 1500			can be edited
#	restBetweenRunsSeconds = 120		can be edited
#
#	==> this declares the target run pace as 4:45 min/km (=4.75min/km)
#	targetPacePerKmMinutes = 4			can be edited
#	targetPacePerKmSeconds = 45			can be edited
#	paceMarginPercent = 8				can be edited. Means "OK if running within +/-8% of target pace".
#										With margin = 8% and target pace = 4:45min/km, fastest = 4:24, slowest = 5:11
#
#	step = 0							don't edit
#	endOfStepSeconds = 0				don't edit
#	targetPace = 0						don't edit
#	paceAlertTooFast = 0				don't edit
#	paceAlertTooSlow = 0				don't edit
#	myDurationSeconds = 0				don't edit
#	myDistanceKm = 0					don't edit
#	timeLeft = 0						don't edit
#	myResultVar = 0						don't edit
#	runId = 1							don't edit
#
#	==> Don't forget to set the result format to 0 decimal.
#
# SUGGESTED WATCH SCREEN CONFIGURATION :
#	- pace
#	- this app
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

			/* initialize values for pace monitoring */
			targetPace = targetPacePerKmMinutes + (targetPacePerKmSeconds / 60);
			paceAlertTooFast = targetPace * (100 - paceMarginPercent) / 100;	/* these are minutes/km, so the lower the value, the faster you run */
			paceAlertTooSlow = targetPace * (100 + paceMarginPercent) / 100;	/* ...and vice-versa ;-) */

			myDurationSeconds = SUUNTO_DURATION;
			myDistanceKm = SUUNTO_DISTANCE;
			}
		}
	else {
		/* NOT YET */
		timeLeft = endOfStepSeconds - SUUNTO_DURATION;
		prefix = "W";	/* 'Warm up' */
		myResultVar = timeLeft;
		postfix = "S";	/* 'seconds' */
		}
	}


/******
* RUN *
******/
else if (step==1 || step==3 || step==5 || step==7) {
	/* IS THIS RUN OVER ? */
	if ((SUUNTO_DISTANCE - myDistanceKm) < (fastRunLengthMeters / 1000)) {
		/* NOT YET */
		prefix = "";
		myResultVar = runId;

		/* PACE MONITORING */
		postfix = "RUN";
		if (SUUNTO_PACE > paceAlertTooSlow) { postfix = "RUN++"; }
		if (SUUNTO_PACE < paceAlertTooFast) { postfix = "RUN--"; }
		}
	else {
		/* YES : RUN IS OVER */
		Suunto.alarmBeep();
		step = step + 1;
		runId = runId + 1;
		/*
		SUUNTO_LAP_NUMBER = SUUNTO_LAP_NUMBER + 1;
		This would be great but is not supported so far :-(
		*/
		myDurationSeconds = SUUNTO_DURATION;
		myDistanceKm = SUUNTO_DISTANCE;
		}
	}


/*******
* REST *
*******/
else if (step==2 || step==4 || step==6) {
	/* IS THIS REST OVER ? */
	if ((SUUNTO_DURATION - myDurationSeconds) < restBetweenRunsSeconds) {
		/* NOT YET */
		timeLeft = restBetweenRunsSeconds - SUUNTO_DURATION + myDurationSeconds;
		prefix = "R";
		myResultVar = timeLeft;
		postfix = "s";
		}
	else {
		/* YES : REST IS OVER */
		myResultVar = step;
		Suunto.alarmBeep();
		step = step + 1;
		/*
		SUUNTO_LAP_NUMBER = SUUNTO_LAP_NUMBER + 1;
		This would be great but is not supported so far :-(
		*/
		myDurationSeconds = SUUNTO_DURATION;
		myDistanceKm = SUUNTO_DISTANCE;
		}
	}


/************
* CALM DOWN *
************/
else if (step > 7) {
	prefix = "";
	myResultVar = step;
	postfix = "CALM";
	}


/************
* THE END ! *
************/
