/*
######################################### Pilates ###################################################
# version : 20190711
#
# "Five minute plank", source :
#	https://www.darebee.com/workouts/five-minute-plank-workout.html
#	via : http://barbichette.fr/gainage-abdos-programme-dexercices/
#
#	Full plank :				60 sec
#	Elbow plank :				30 sec
#	Raised leg elbow plank :	30 sec each leg
#	Side elbow plank :			30 sec each side
#	Full plank :				30 sec
#	Elbow plank :				60 sec
#
#	NB:	this Suunto program has a 'difficultyPercent' setting (see below) that allows extending / shortening
#		the exercices duration. The durations above are applied when set to 100%.
#
#	Transitions between exercises : none (see https://www.darebee.com/manual.html)
#
#
# Step	| Duration [s]	| Action
# ------+---------------+-----------------------------------
#	0	|	-			| get ready ('readyCountdownSeconds' seconds countdown)
#	1	|	60			| full plank 1
#	2	|		n		| rest during 'restBetweenExercicesSeconds' seconds
#	3	|	30			| elbow plank 2
#	4	|		n		| rest during 'restBetweenExercicesSeconds' seconds
#	5	|	30			| raised leg elbow plank
#	6	|		n		| rest during 'restBetweenExercicesSeconds' seconds
#	7	|	30			| raised leg (other leg) elbow plank
#	8	|		n		| rest during 'restBetweenExercicesSeconds' seconds
#	9	|	30			| side elbow plank
#	10	|		n		| rest during 'restBetweenExercicesSeconds' seconds
#	11	|	30			| side elbow plank (other side)
#	12	|		n		| rest during 'restBetweenExercicesSeconds' seconds
#	13	|	30			| full plank 2
#	14	|		n		| rest during 'restBetweenExercicesSeconds' seconds
#	15	|	60			| elbow plank 2
#	16	|	-			| end
#
#
# VARIABLES :
#
# difficultyPercent					= 100	CAN BE EDITED
# readyCountdownSeconds				= 10	CAN BE EDITED
# restBetweenExercicesSeconds		= 20	CAN BE EDITED
#
# fullDurationSeconds				= 60	DON'T EDIT
# halfDurationSeconds				= 30	DON'T EDIT
# endOfStepSeconds					= 0		DON'T EDIT
# step								= 0		DON'T EDIT
#
#	==> Don't forget to set the result format to 0 decimal.
#
#
# SUGGESTED WATCH SCREEN CONFIGURATION :
# - this app (large screen zone using top + middle blocks)
# - HR
########################################## ##########################################################
*/

/***********************
 * "Ready ?" countdown *
 **********************/
if (step < 1) {

	/* compute durations "with difficulty" */
	fullDurationSeconds_difficult			= round(fullDurationSeconds * difficultyPercent / 100);
	halfDurationSeconds_difficult			= round(halfDurationSeconds * difficultyPercent / 100);
	restBetweenExercicesSeconds_difficult	= round(restBetweenExercicesSeconds * difficultyPercent / 100);

	endOfStepSeconds = readyCountdownSeconds;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "RDY?"; }
	}


/****************
 * Full plank 1 *
 ***************/
else if (step == 1) {
	endOfStepSeconds = myDurationSeconds + fullDurationSeconds_difficult;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "FULL"; }
	}


/********
 * REST *
 *******/
else if (mod(step,2)==0 && step>=2 && step<15) {
	endOfStepSeconds = myDurationSeconds + restBetweenExercicesSeconds_difficult;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "RST"; }
	}


/*****************
 * Elbow plank 1 *
 ****************/
else if (step == 3) {
	endOfStepSeconds = myDurationSeconds + halfDurationSeconds_difficult;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "ELBOW"; }
	}


/*********************************
 * Raised leg elbow plank (leg1) *
 ********************************/
else if (step == 5) {
	endOfStepSeconds = myDurationSeconds + halfDurationSeconds_difficult;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "LEG1"; }
	}


/*********************************
 * Raised leg elbow plank (leg2) *
 ********************************/
else if (step == 7) {
	endOfStepSeconds = myDurationSeconds + halfDurationSeconds_difficult;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "LEG2"; }
	}


/****************************
 * Side elbow plank (side1) *
 ***************************/
else if (step == 9) {
	endOfStepSeconds = myDurationSeconds + halfDurationSeconds_difficult;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "SIDE1"; }
	}


/****************************
 * Side elbow plank (side2) *
 ***************************/
else if (step == 11) {
	endOfStepSeconds = myDurationSeconds + halfDurationSeconds_difficult;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "SIDE2"; }
	}


/****************
 * Full plank 2 *
 ***************/
else if (step == 13) {
	endOfStepSeconds = myDurationSeconds + halfDurationSeconds_difficult;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "FULL"; }
	}


/*****************
 * Elbow plank 2 *
 ****************/
else if (step == 15) {
	endOfStepSeconds = myDurationSeconds + fullDurationSeconds_difficult;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "ELBOW"; }
	}


/*************
 * THE END ! *
 ************/
else if (step == 16) { prefix = "END"; }


RESULT = endOfStepSeconds - SUUNTO_DURATION;
postfix = "S";
