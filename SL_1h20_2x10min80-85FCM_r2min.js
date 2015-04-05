/*
DESCRIPTION :
	Training :
		- duration : 	1h20
		- distance : 	free
		- HR :			free (<75% max. HR)
		- pace :		free
		- fast runs :
			- reps :		2
			- duration :	10min
			- distance :	free
			- HR :			80-85% of max. HR
			- pace :		free
			- rest : 		2min

	WARM UP :
		Upon starting exercice, the app is in "Warmup" mode, until the 'LAP' button is pressed for the 1st fast run.
		After the 'warmUpMinimumDurationMinutes' is over, the watch displays 'H 0 T'

	RUNS :
		The watch displays "1 RUN" during the 1st fast run, "2 RUN" during the 2nd fast run, and so on.

	RESTS :
		During rests, the watch displays the number of remaining seconds : " R n s".

	CALM DOWN :
		After the last run, the watch displays "CALM".

VARIABLES :
	totalTrainingDurationMinutes = 80	can be edited
	fastRunDurationMinutes = 10			can be edited
	restBetweenRunsSeconds = 120		can be edited
	warmUpMinimumDurationMinutes = 15	can be edited
	calmDownDurationMinutes = 10

	heartRatePercentLow = 80			can be edited
	heartRatePercentHigh = 85			can be edited


	step = 0						don't edit
	myDurationSeconds = 0			don't edit
	timeLeft = 0					don't edit
	endOfStepSeconds = 0			don't edit
	myResultVar = 0					don't edit

	==> Don't forget to set the result format to 0 decimal.

SUGGESTED WATCH SCREEN CONFIGURATION :
	- HR
	- APP
	- TIME

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

		/* Simulate pressing the "STEP" watch button */
		if (SUUNTO_LAP_NUMBER > 1) {
			Suunto.alarmBeep();
			step = 1;
			myDurationSeconds = SUUNTO_DURATION;
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
else if (step == 1 || step == 3) {
	endOfStepSeconds = myDurationSeconds + fastRunDurationMinutes * 60;

	/* IS THIS RUN OVER ? */
	if (SUUNTO_DURATION > endOfStepSeconds) {
		/* YES : RUN IS OVER */
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else {
		/* NOT YET */
		timeLeft = endOfStepSeconds - SUUNTO_DURATION;
		prefix = "RUN";
		myResultVar = timeLeft;

		/* HEART RATE CONTROL */
		if (SUUNTO_HR < (SUUNTO_USER_MAX_HR * heartRatePercentLow / 100 )) {
			postfix = "S++";	/* 'seconds', and speed up */
			}
		if (SUUNTO_HR > (SUUNTO_USER_MAX_HR * heartRatePercentHigh / 100 )) {
			postfix = "S--";	/* 'seconds', and slow down */
			}
		}
	}


/********
 * REST *
 ********/
else if (step == 2) {
	endOfStepSeconds = myDurationSeconds + restBetweenRunsSeconds;

	/* IS THIS REST OVER ? */
	if (SUUNTO_DURATION > endOfStepSeconds) {
		/* YES : REST IS OVER */
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else {
		/* NOT YET */
		timeLeft = restBetweenRunsSeconds - SUUNTO_DURATION + myDurationSeconds;
		prefix = "RST";	/* 'Rest' */
		myResultVar = timeLeft;
		postfix = "S";	/* 'seconds' */
		}
	}


/************
 * CONTINUE *
 ************/
else if (step == 4) {
	endOfStepSeconds = (totalTrainingDurationMinutes - calmDownDurationMinutes) * 60;

	/* IS THE 'CONTINUE' OVER ? */
	if (SUUNTO_DURATION > endOfStepSeconds) {
		/* YES : THE 'CONTINUE' IS OVER */
		Suunto.alarmBeep();
		step = step + 1;
		}
	else {
		/* NOT YET */
		timeLeft = endOfStepSeconds - SUUNTO_DURATION;
		prefix = "CON";	/* 'Continue' */
		myResultVar = timeLeft;
		postfix = "S";	/* 'seconds' */
		}
	}


/*************
 * CALM DOWN *
 *************/
else if (step == 5) {
	endOfStepSeconds = totalTrainingDurationMinutes * 60;

	/* IS THE 'CALM DOWN' OVER ? */
	if (SUUNTO_DURATION > endOfStepSeconds) {
		/* YES : THE 'CONTINUE' IS OVER */
		Suunto.alarmBeep();
		step = step + 1;
		}
	else {
		/* NOT YET */
		timeLeft = endOfStepSeconds - SUUNTO_DURATION;
		prefix = "CAL";	/* ' Calm' */
		myResultVar = timeLeft;
		postfix = "S";	/* 'seconds' */
		}
	}


/****************************
 * END OF TRAINING DURATION *
 ****************************/
else if (step > 5) {
	prefix = "THE";
	myResultVar = 0;
	postfix = "END";
	}

/* THE END */
