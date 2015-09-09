/*
######################################### VMA 2x8x30-30 R3min #######################################
# version : 20150909
#
# DESCRIPTION :
# 	Training :
# 		- type :		VMA
# 		- duration : 	free
# 		- distance : 	free
# 		- HR :			free
# 		- pace :		free
# 		- fast runs :
# 			- reps :		2x8
# 			- duration :	30s
# 			- distance :	free
# 			- HR :			free
# 			- pace :		VMA 100 (4:00 min/km)
# 			- short rest : 	30s
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
# 	runDurationSeconds = 30				can be edited
# 	restBetweenRepsSeconds = 30			can be edited
# 	restBetweenSeriesMinutes = 3		can be edited
#
#	==> this declares the target run pace as 4:00 min/km
#	targetPacePerKmMinutes = 4			can be edited
#	targetPacePerKmSeconds = 0			can be edited
#	paceMarginPercent = 8				can be edited. Means "OK if running within +/-8% of target pace".
#										With margin = 8% and target pace = 4:45min/km, fastest = 3:40, slowest = 4:19
#
# 	step = 0						don't edit
# 	myDurationSeconds = 0			don't edit
# 	timeLeft = 0					don't edit
# 	endOfStepSeconds = 0			don't edit
# 	myResultVar = 0					don't edit
# 	runId = 1						don't edit
# 	restDurationSeconds = 0			don't edit
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

		/* This is triggered by pressing the "LAP" watch button */
		if (SUUNTO_LAP_NUMBER > 1) {
			Suunto.alarmBeep();
			step = 1;
			myDurationSeconds = SUUNTO_DURATION;

			/* initialize values for pace monitoring */
			targetPace = targetPacePerKmMinutes + (targetPacePerKmSeconds / 60);
			paceAlertTooFast = targetPace * (100 - paceMarginPercent) / 100;	/* these are minutes/km, so the lower the value, the faster you run */
			paceAlertTooSlow = targetPace * (100 + paceMarginPercent) / 100;	/* ...and vice-versa ;-) */
			}
		}
	else {
		/* NOT YET */
		timeLeft = endOfStepSeconds - SUUNTO_DURATION;
		prefix = "WUP";	/* 'Warm up' */
		myResultVar = timeLeft;
		postfix = "S";	/* 'seconds' */
		}
	}


/*******
 * RUN *
 *******/
else if (step==1 || step==3 || step==5 || step==7 || step==9 || step==11 || step==13 || step==15 || step==17 || step==19 || step==21 || step==23 || step==25 || step==27 || step==29 || step==31) {

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
		myResultVar = runId;

		/* PACE MONITORING */
		postfix = "";
		if (SUUNTO_PACE > paceAlertTooSlow) { postfix = "++"; }
		if (SUUNTO_PACE < paceAlertTooFast) { postfix = "--"; }
		}
	}


/**********************
 * SHORT + LONG RESTS *
 *********************/
else if (step==2 || step==4 || step==6 || step==8 || step==10 || step==12 || step==14 || step==16 || step==18 || step==20 || step==22 || step==24 || step==26 || step==28 || step==30) {

	restDurationSeconds = restBetweenRepsSeconds;
	if (step == 16) {
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
		timeLeft = endOfStepSeconds - SUUNTO_DURATION;
		prefix = "RST";	/* 'Rest' */
		myResultVar = timeLeft;
		postfix = "S";	/* 'seconds' */
		}
	}


/*************
 * CALM DOWN *
 *************/
else if (step > 31) {
	prefix = "CALM";
	}


/* THE END */
