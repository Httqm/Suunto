/*
DESCRIPTION :
	long training (no duration/distance specified)
	Includes 3 fast runs in which :
		- length
		- pace
		- rest between runs
		are specified by init. variables.
		The number of fast runs can not configured.

	WARM UP :
		Upon starting exercice, the app is in "Warmup" mode, until the 'LAP' button is pressed for the 1st fast run.

	RUNS :
		The watch displays "1 RUN" during the 1st fast run, "2 RUN" during the 2nd fast run, and so on.

	PACE CONTROL :
		If running too fast (target pace + margin%), the display will be " n Run-".
		If running too slow, the display will be " n Run+".

	RESTS :
		During rests, the watch displays the number of remaining seconds : " R n s".

	CALM DOWN :
		After the last run, the watch displays "CALM".

VARIABLES :
	fastRunLengthMeters = 2000		can be edited
	restBetweenRunsSeconds = 120	can be edited

	==> this declares the target run pace as 5:15 min/km (=5.25min/km)
	targetPacePerKmMinutes = 5		can be edited
	targetPacePerKmSeconds = 15		can be edited
	targetPace = 0					don't edit
	paceAlertTooFast = 0			don't edit
	paceAlertTooSlow = 0			don't edit

	paceMarginPercent = 8			can be edited. Means "OK if running within +/-8% of target pace".
									With margin = 8% and target pace = 5:15min/km, fastest = 4:49, slowest = 5:40

	step = 0						don't edit
	myDurationSeconds = 0			don't edit
	myDistanceKm = 0				don't edit
	restTimeLeft = 0				don't edit
	myResultVar = 0					don't edit
	runId = 1						don't edit

	==> Don't forget to set the result format to 0 decimal.
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
		step=1;

		/* initialize values for pace monitoring */
		targetPace=targetPacePerKmMinutes+(targetPacePerKmSeconds/60);
		paceAlertTooFast=targetPace*(100-paceMarginPercent)/100;	/* these are minutes/km, so the lower the value, the faster you run */
		paceAlertTooSlow=targetPace*(100+paceMarginPercent)/100;	/* ...and vice-versa ;-) */

		myDurationSeconds=SUUNTO_DURATION;
		myDistanceKm=SUUNTO_DISTANCE;
		}
	}

else if (step==1 || step==3 || step==5) {
	/* RUN */

	/* IS THIS RUN OVER ? */
	if (SUUNTO_DISTANCE - myDistanceKm < fastRunLengthMeters/1000) {
		/* NOT YET */
		prefix="";
		myResultVar=runId;

		/* PACE MONITORING */
		postfix="RUN";
		if (SUUNTO_PACE>paceAlertTooSlow) { postfix="RUN+"; }
		if (SUUNTO_PACE<paceAlertTooFast) { postfix="RUN-"; }
		}
	else {
		/* YES : RUN IS OVER */
		Suunto.alarmBeep();
		step=step+1;
		runId=runId+1;
		/*
		SUUNTO_LAP_NUMBER=SUUNTO_LAP_NUMBER+1;
		This would be great but is not supported so far :-(
		*/
		myDurationSeconds=SUUNTO_DURATION;
		myDistanceKm=SUUNTO_DISTANCE;
		}
	}

else if (step==2 || step==4) {
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
		/*
		SUUNTO_LAP_NUMBER=SUUNTO_LAP_NUMBER+1;
		This would be great but is not supported so far :-(
		*/
		myDurationSeconds=SUUNTO_DURATION;
		myDistanceKm=SUUNTO_DISTANCE;
		}
	}

else if (step>5) {
	/* CALM DOWN */
	prefix="";
	myResultVar=step;
	postfix="CALM";
	}

/* THE END */
