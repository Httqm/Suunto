/*
######################################### Pilates ###################################################
# version : 20190325
#
# Source of program exercies : http://barbichette.fr/gainage-abdos-programme-dexercices/
#	Gainage bras tendus : 60 sec
#	Gainage coudes : 30 sec
#	Gainage jambe levée : 30 sec / jambe
#	Gainage latéral : 30 sec par côté
#	Gainage bras tendus : 30 sec
#	Gainage coudes : 60 sec
#
# Step	| Duration [s]	| Action
# ------+---------------+-----------------------------------
#	0	|	-			| get ready
#	1	|	60			| full plank 1
#	2	|		20		| rest
#	3	|	30			| elbow plank 2
#	4	|		20		| rest
#	5	|	30			| raised leg elbow plank
#	6	|		20		| rest
#	7	|	30			| raised leg (other leg) elbow plank
#	8	|		20		| rest
#	9	|	30			| side elbow plank
#	10	|		20		| rest
#	11	|	30			| side elbow plank (other side)
#	12	|		20		| rest
#	13	|	30			| full plank 2
#	14	|		20		| rest
#	15	|	60			| elbow plank 2
#	16	|	-			| end
#
#
# VARIABLES :
#
# difficultyPercent					= 100	CAN BE EDITED
# fullDurationSeconds				= 60	DON'T EDIT
# halfDurationSeconds				= 30	DON'T EDIT
# restBetweenExercicesSeconds		= 20	DON'T EDIT
#
# readyCountdownSeconds				= 10	DON'T EDIT
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
	endOfStepSeconds = myDurationSeconds + fullDurationSeconds;
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
	endOfStepSeconds = myDurationSeconds + restBetweenExercicesSeconds;
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
	endOfStepSeconds = myDurationSeconds + halfDurationSeconds;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "ELBO"; }
	}


/***************************
 * Raised leg plank (leg1) *
 **************************/
else if (step == 5) {
	endOfStepSeconds = myDurationSeconds + halfDurationSeconds;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "LG1"; }
	}


/***************************
 * Raised leg plank (leg2) *
 **************************/
else if (step == 7) {
	endOfStepSeconds = myDurationSeconds + halfDurationSeconds;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "LG2"; }
	}


/**********************
 * Side plank (side1) *
 *********************/
else if (step == 9) {
	endOfStepSeconds = myDurationSeconds + halfDurationSeconds;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "SD1"; }
	}


/**********************
 * Side plank (side2) *
 *********************/
else if (step == 11) {
	endOfStepSeconds = myDurationSeconds + halfDurationSeconds;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "SD2"; }
	}


/****************
 * Full plank 2 *
 ***************/
else if (step == 13) {
	endOfStepSeconds = myDurationSeconds + halfDurationSeconds;
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
	endOfStepSeconds = myDurationSeconds + fullDurationSeconds;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "ELBO"; }
	}


/*************
 * THE END ! *
 ************/
else if (step == 16) { prefix = "END"; }


RESULT = endOfStepSeconds - SUUNTO_DURATION;
postfix = "S";
