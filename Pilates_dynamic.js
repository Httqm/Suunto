/*
######################################### Pilates dynamic ###########################################
# version : 20200423
#
# Step	| Duration [s]	| Action
# ------+---------------+-----------------------------------
#	0	|	-			| get ready ('readyCountdownSeconds' seconds countdown)
#	1	|	60			| Push-up plank
#	2	|	30			| Ankles & elbows plank
#	3	|	60			| Touch other shoulder plank
#	4	|	60			| Back plank
#	5	|	30			| Push-up plank
#	6	|	60			| Touch knee plank
#	7	|	-			| end
#
#
#	NB:	this Suunto program has a 'difficultyPercent' setting (see below) that allows extending / shortening
#		the exercices duration. The durations above are applied when set to 100%.
#
#
# VARIABLES :
#
# difficultyPercent					= 100	CAN BE EDITED
# readyCountdownSeconds				= 10	CAN BE EDITED
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

	endOfStepSeconds = readyCountdownSeconds;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "RDY?"; }
	}


/*******************
 * Push-up plank 1 *
 ******************/
else if (step == 1) {
	endOfStepSeconds = myDurationSeconds + fullDurationSeconds_difficult;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "P-UPS"; }
	}


/*************************
 * Ankles & elbows plank *
 ************************/
else if (step == 2) {
	endOfStepSeconds = myDurationSeconds + halfDurationSeconds_difficult;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "ANKL"; }
	}


/******************************
 * Touch other shoulder plank *
 *****************************/
else if (step == 3) {
	endOfStepSeconds = myDurationSeconds + fullDurationSeconds_difficult;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "SHULD"; }
	}


/**************
 * Back plank *
 *************/
else if (step == 4) {
	endOfStepSeconds = myDurationSeconds + fullDurationSeconds_difficult;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "BACK"; }
	}


/*******************
 * Push-up plank 2 *
 ******************/
else if (step == 5) {
	endOfStepSeconds = myDurationSeconds + halfDurationSeconds_difficult;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "P-UPS"; }
	}


/********************
 * Touch knee plank *
 *******************/
else if (step == 6) {
	endOfStepSeconds = myDurationSeconds + fullDurationSeconds_difficult;
	if (SUUNTO_DURATION > endOfStepSeconds) {
		Suunto.alarmBeep();
		step = step + 1;
		myDurationSeconds = SUUNTO_DURATION;
		}
	else { prefix = "KNEE"; }
	}


/*************
 * THE END ! *
 ************/
else if (step > 6) { prefix = "END"; }


RESULT = endOfStepSeconds - SUUNTO_DURATION;
postfix = "S";
