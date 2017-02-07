/*
######################################### VMA 2xNx200m r30s R3min ###################################
# version : 20170130
#
# DESCRIPTION :
# 	Training :
# 		- type :		VMA
# 		- duration : 	free
# 		- distance : 	free
# 		- HR :			free
# 		- pace :		free
# 		- fast runs :
# 			- reps :		2x10
# 			- duration :	free
# 			- distance :	200m
# 			- HR :			free
# 			- pace :		VMA 105
# 			- short rest : 	30s
# 			- long rest : 	3min
#
#	WARM UP :
#		Upon starting exercice, the app is in "warm up" mode for at least 'warmUpMinimumDurationMinutes'
#		minutes and until the 'LAP' button is pressed for the 1st fast run.
#		During these 'warmUpMinimumDurationMinutes' minutes, the watch displays the number
#		of remaining seconds : "W n S".
# 		When the warm up is over, the watch displays 'H 0 T'.
#
# 	RUNS :
# 		The watch displays "RUN 1" during the 1st fast run, "RUN 2" during the 2nd fast run, and so on.
#
#	PACE CONTROL :
#		If running too fast (target pace - margin%), the display will be "Run n --".
#		If running too slow, the display will be "Run n ++".

# 	RESTS :
# 		During rests, the watch displays the number of remaining seconds : "RST n S".
#
# 	CALM DOWN :
# 		After the last run, the watch displays "CALM".
#
# VARIABLES :
# 	warmUpMinimumDurationMinutes = 20	can be edited
#	reps = 10							can be edited, 2x reps x runLengthMeters
# 	runLengthMeters = 200				can be edited
# 	restBetweenRepsSeconds = 30			can be edited
# 	restBetweenSeriesMinutes = 3		can be edited
#
#
#	==> this declares the target run pace as 3:30 min/km
#	targetPacePerKmMinutes = 3			can be edited
#	targetPacePerKmSeconds = 30			can be edited
#	paceMarginPercent = 8				can be edited. Means "OK if running within +/-8% of target pace".
#										With margin = 8% and target pace = 3:30min/km, fastest = 3:13, slowest = 3:46
#
#
# 	endOfStepKm = 0					don't edit
# 	endOfStepSeconds = 0			don't edit
# 	myDistanceKm = 0				don't edit
# 	myDurationSeconds = 0			don't edit
# 	myResultVar = 0					don't edit
# 	restDurationSeconds = 0			don't edit
# 	runId = 0						don't edit
# 	step = 0						don't edit
#	stepOfLastRun = 0				don't edit
# 	secondsLeft = 0					don't edit
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
			stepOfLastRun = (4 * reps) - 1;


			/* initialize values for pace monitoring */
			targetPace = targetPacePerKmMinutes + (targetPacePerKmSeconds / 60);
			paceAlertTooFast = targetPace * (100 - paceMarginPercent) / 100;	/* these are minutes/km, so the lower the value, the faster you run */
			paceAlertTooSlow = targetPace * (100 + paceMarginPercent) / 100;	/* ...and vice-versa ;-) */

			myDistanceKm = SUUNTO_DISTANCE;		/* do this as late as possible for better accuracy */
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
else if (step>=1 && step<=stepOfLastRun && mod(step,2)==1) {

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

		/* PACE MONITORING */
		postfix = "";
/*
		if (SUUNTO_PACE > paceAlertTooSlow) { postfix = "++"; }
		if (SUUNTO_PACE < paceAlertTooFast) { postfix = "--"; }
*/
		}
	}


/**********************
 * SHORT + LONG RESTS *
 *********************/
else if (step>=2 && step<=(stepOfLastRun - 1) && mod(step,2)==0) {

	restDurationSeconds = restBetweenRepsSeconds;
	if (step == 20) {
		restDurationSeconds = restBetweenSeriesMinutes * 60;
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
else if (step > stepOfLastRun) {
	prefix = "CALM";
	}

/* THE END */
