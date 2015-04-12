/*
######################################### virtualPartner.js #########################################
# version : 20150412
#
# DESCRIPTION : this app is dedicated to running competitions. It assumes you are running with a
#	virtual partner who's running ALWAYS EXACTLY at your specified pace. This application computes
#	your relative position towards this partner and tells you whether you're in advance or running late.
#
#	Upon starting, the application is in 'Warm Up' mode, and goes into 'Run' mode after pressing
#	the 'LAP' watch button.
#	Your virtual partner is kind enough to respect your warm up pace, then starts running at the
#	specified pace once in 'Run' mode.
#	The watch will beep at the end of the specified distance, because there is no 'FINISH' line during trainings.
#
# VARIABLES :
#
#	runningLengthKm = 5							can be edited
#	targetPacePerKmMinutes = 5					can be edited	==> declares the target run pace
#	targetPacePerKmSeconds = 15					can be edited	==> as 5:15 min/km (=5.25min/km)
#	targetPaceMinutesPerKm = 0					don't edit
#
# 	step = 0									don't edit
#	warmUpLengthKm = 0							don't edit
#	warmUpDurationSeconds = 0					don't edit
#	elapsedTimeSinceStartRunningMinutes = 0		don't edit
#
#
# 	==> Don't forget to set the result format to 0 decimal.
#
# SUGGESTED WATCH SCREEN CONFIGURATION :
#	- pace
#	- Virtual Partner
#	- distance
#
########################################## ##########################################################
*/


/* While in sport mode do this once per second */


/***********
 * WARM UP *
 ***********/
if (step < 1) {

	/* End the 'warm-up' and enter the 'Running' mode by pressing the 'LAP' watch button. */
	if (SUUNTO_LAP_NUMBER > 1) {
		warmUpLengthKm = SUUNTO_DISTANCE;
		warmUpDurationSeconds = SUUNTO_DURATION;
		Suunto.alarmBeep();
		step = 1;
		targetPaceMinutesPerKm = targetPacePerKmMinutes + (targetPacePerKmSeconds / 60);
		}
	else {
		/* No button pressed, still warming up */
		prefix = "WARM";
		RESULT = 0;
		postfix = "UP";
		}
	}


/*******
 * RUN *
 *******/
else if (step == 1) {

	/* IS THIS RUN OVER ? */
	if(SUUNTO_DISTANCE > (warmUpLengthKm + runningLengthKm)) {
		/* YES : RUN IS OVER */
		Suunto.alarmBeep();
		step = step + 1;
		}
	else {
		/* NOT YET */

		/* The virtual partner is running free now. Let's compute its position and compare it to mine !

		The distance run by my Virtual Partner since we entered the 'Run' mode is :
			kmRunByVirtualPartnerInRunMode = elapsedTimeSinceStartRunningMinutes / targetPaceMinutesPerKm;

		My current position is : SUUNTO_DISTANCE;
		==> This includes the distance covered during warm up.

		My Virtual Partner position is :
			virtualPartnerPositionKm = warmUpLengthKm + (elapsedTimeSinceStartRunningMinutes / targetPaceMinutesPerKm);
		And :
			RESULT = (SUUNTO_DISTANCE - virtualPartnerPositionKm) * 1000;

			RESULT < 0 : VP is ahead of me
			RESULT > 0 : I am ahead of VP
		*/
		elapsedTimeSinceStartRunningMinutes = (SUUNTO_DURATION - warmUpDurationSeconds) / 60;

		prefix = "VP0";
		RESULT = (SUUNTO_DISTANCE - (warmUpLengthKm + (elapsedTimeSinceStartRunningMinutes / targetPaceMinutesPerKm))) * 1000;
		postfix = "m";
		}
	}


/*************
 * CALM DOWN *
 ************/
else if (step > 1) {
	prefix = "CALM";
	}


/***********
 * THE END *
 **********/

