/*
######################################### VMA 2xNx30-30 R3min #######################################
# version : 20191117
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
#		The watch is in 'Virtual Partner' mode during fast runs : considering a virtual partner running at the target pace,
#		the watch will display the distance between you and the virtual partner :
#			d < 0 : you're running slower than the virtual partner
#			d = 0 : you're running EXACTLY at the target pace
#			d > 0 : you're running faster than the virtual partner
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
#	PACE MONITORING
#	==> this declares the target run pace as 3:48 min/km
#	targetPacePerKm_minutes = 3			can be edited
#	targetPacePerKm_seconds = 48		can be edited
#
#	currentFastRun_startPointKm = 0			don't edit
#	currentFastRun_startPointSeconds = 0	don't edit
#	==> these are meant "since the start of the exercice"
#
#	endOfStepSeconds = 0				don't edit
#	myDurationSeconds = 0				don't edit
#	restDurationSeconds = 0				don't edit
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
			step = 1;
			stepOfLastRun = (4 * reps) - 1;

			currentFastRun_startPointKm = SUUNTO_DISTANCE;
			currentFastRun_startPointSeconds = SUUNTO_DURATION;
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
else if (step>0 && step<=stepOfLastRun && mod(step,2)==1) {

	endOfStepSeconds = myDurationSeconds + runDurationSeconds;

	/* IS THIS RUN OVER ? */
	if (SUUNTO_DURATION > endOfStepSeconds) {
		/* YES : RUN IS OVER */
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else {
		/* NOT YET */

		/* "Virtual Partner" MODE

			VP	|	me	|	display
			----+-------+----------
			10	|	 9	|	-1
			10	|	10	|	 0
			10	|	11	|	 1

			myResultVar = distanceMetersInThisRun_me - distanceMetersInThisRun_virtualPartner


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
				= distanceMetersInThisRun_me - distanceMetersInThisRun_virtualPartner
				= ((SUUNTO_DISTANCE - currentFastRun_startPointKm) * 1000) - ((SUUNTO_DURATION - currentFastRun_startPointSeconds) * 1000 / (60 * targetPacePerKm_minutes + targetPacePerKm_seconds))
				= 1000 * (SUUNTO_DISTANCE - currentFastRun_startPointKm - ((SUUNTO_DURATION - currentFastRun_startPointSeconds) / (60 * targetPacePerKm_minutes + targetPacePerKm_seconds)))

		*/
		prefix = "VP0";
		myResultVar = 1000 * (SUUNTO_DISTANCE - currentFastRun_startPointKm - ((SUUNTO_DURATION - currentFastRun_startPointSeconds) / (60 * targetPacePerKm_minutes + targetPacePerKm_seconds)));
		postfix = "m";
		}

	}


/**********************
 * SHORT + LONG RESTS *
 *********************/
else if (step>1 && step<=(stepOfLastRun - 1) && mod(step,2)==0) {

	restDurationSeconds = restBetweenRepsSeconds;
	/* IS THIS THE LONG REST ? */
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
