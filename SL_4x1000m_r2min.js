/*
DESCRIPTION :
	long training (no duration/distance specified)
	including 4x1000m fast runs (no pace specified)
	with 2 minutes rest between fast runs.


	Upon starting exercice, the app is in "Warmup" mode, until the 'LAP' button is pressed for the 1st 1000m fast run.
	The watch displays "1 RUN" during the 1st fast run, "2 RUN" during the 2nd fast run, and so on.
	During rests, the watch displays the number of remaining seconds : " R n s".
	After the last run, the watch displays "CALM".

VARIABLES :
	fastRunLengthMeters = 1000
	restBetweenRunsSeconds = 120
	step = 0
	myDurationSeconds = 0
	myDistanceKm = 0
	restTimeLeft = 0
	myResultVar = 0
	runId = 1
*/


/* While in sport mode do this once per second */
prefix="";
RESULT=myResultVar;
postfix="";

if (step<1) {
	/* WARM UP */
	prefix="W";
	myResultVar=0;
	postfix="UP";
	/* Simulate pressing the "LAP" watch button */
	if (SUUNTO_LAP_NUMBER > 1) {
		Suunto.alarmBeep();
		step=step+1;
		myDurationSeconds=SUUNTO_DURATION;
		myDistanceKm=SUUNTO_DISTANCE;
		}
	}

else if (step==1 || step==3 || step==5 || step==7) {
	/* RUN */

	/* IS THIS RUN OVER ? */
	if (SUUNTO_DISTANCE - myDistanceKm < fastRunLengthMeters/1000) {
		/* NOT YET */
		prefix="";
		myResultVar=runId;
		postfix="RUN";
		}
	else {
		/* YES : RUN IS OVER */
		Suunto.alarmBeep();
		step=step+1;
		runId=runId+1;
		myDurationSeconds=SUUNTO_DURATION;
		myDistanceKm=SUUNTO_DISTANCE;
		}
	}

else if (step==2 || step==4 || step==6) {
	/* REST */

	/* IS THIS REST OVER ? */
	if (SUUNTO_DURATION - myDurationSeconds < restBetweenRunsSeconds) {
		/* NOT YET */
		restTimeLeft=restBetweenRunsSeconds-SUUNTO_DURATION+myDurationSeconds;
		prefix="R";
		myResultVar=restTimeLeft;
		postfix="s";
		}
	else {
		/* YES : REST IS OVER */
		myResultVar=step;
		Suunto.alarmBeep();
		step=step+1;
		myDurationSeconds=SUUNTO_DURATION;
		myDistanceKm=SUUNTO_DISTANCE;
		}
	}

else if (step>7) {
	/* CALM DOWN */
	prefix="";
	myResultVar=step;
	postfix="CALM";
	}

/* THE END */

