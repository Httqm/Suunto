/*
######################################### Pilates ###################################################
# version : 20171113
#
# Source of program exercies : http://barbichette.fr/gainage-abdos-programme-dexercices/
#	Gainage bras tendus : 60 sec
#	Gainage coudes : 30 sec
#	Gainage jambe levée : 30 sec / jambe
#	Gainage latéral : 30 sec par côté
#	Gainage bras tendus : 30 sec
#	Gainage coudes : 60 sec
#
# Steps :
#	0	ready
#	1	full plank 60s
#	2	rest
#	3	elbow plank 30s
#	4	rest
#	5	raised leg elbow plank 30s
#	6	rest
#	7	raised leg (other leg) elbow plank 30s
#	8	rest
#	9	side elbow plank 30s
#	10	rest
#	11	side elbow plank (other side) 30s
#	12	rest
#	13	full plank 30s
#	14	rest
#	15	elbow plank 60s
#	16	end
#
#
# VARIABLES :
#
# fullPlankSeconds1					= 60	CAN BE EDITED
# elbowPlankSeconds1				= 30	CAN BE EDITED
# raisedLegElbowPlankPerLegSeconds	= 30	CAN BE EDITED
# sideElbowPlankPerSideSeconds		= 30	CAN BE EDITED
# fullPlankSeconds2					= 30	CAN BE EDITED
# elbowPlankSeconds2				= 60	CAN BE EDITED
#
# difficultyPercent					= 100	CAN BE EDITED (will be used in a future version)
#
# restBetweenExercicesSeconds		= 20	DON'T EDIT
# readyCountdownSeconds				= 10	DON'T EDIT
# endOfStepSeconds					= 0		DON'T EDIT
# step								= 0		DON'T EDIT
#
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
	endOfStepSeconds = myDurationSeconds + fullPlankSeconds1;
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
	endOfStepSeconds = myDurationSeconds + elbowPlankSeconds1;
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
	endOfStepSeconds = myDurationSeconds + raisedLegElbowPlankPerLegSeconds;
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
	endOfStepSeconds = myDurationSeconds + raisedLegElbowPlankPerLegSeconds;
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
	endOfStepSeconds = myDurationSeconds + sideElbowPlankPerSideSeconds;
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
	endOfStepSeconds = myDurationSeconds + sideElbowPlankPerSideSeconds;
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
	endOfStepSeconds = myDurationSeconds + fullPlankSeconds2;
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
	endOfStepSeconds = myDurationSeconds + elbowPlankSeconds2;
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
