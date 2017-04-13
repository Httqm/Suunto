/*
######################################### virtualPartner_competition.js #############################
# version : 20180830
#
# DESCRIPTION : this app is dedicated to running competitions. It assumes you are running with a
#	virtual partner who's running ALWAYS EXACTLY at your specified pace. This application computes
#	your relative position towards this partner and tells you whether you're ahead or running late.
#
#	There is NO 'warm up' mode : upon starting, the application assumes the race begins. The virtual
#	partner instantly starts running at the specified pace, and keeps running until the exercice is stopped.
#
# VARIABLES :
#
#	targetPacePerKmMinutes = 4		can be edited	==> declares the target run pace
#	targetPacePerKmSeconds = 45		can be edited	==> as 4:45 min/km
#	targetPaceMinutesPerKm = 0		don't edit
#
# 	==> Don't forget to set the result format to 0 decimal.
#
# SUGGESTED WATCH SCREEN CONFIGURATION :
#	- heart rate
#	- this app
#	- distance (competition) OR lap distance / lap duration (training)
########################################## ##########################################################
*/

/* While in sport mode do this once per second */


/* The virtual partner is running free. Let's compute its position and compare it to mine !

The distance run by my Virtual Partner since the start of the race is :
	kmRunByVirtualPartner = (SUUNTO_DURATION / 60) / targetPaceMinutesPerKm

My current position is : SUUNTO_DISTANCE

So :
	RESULT (in meters) = (SUUNTO_DISTANCE - kmRunByVirtualPartner) * 1000;

	RESULT < 0 : VP is ahead of me
	RESULT > 0 : I am ahead of VP
*/

targetPaceMinutesPerKm = targetPacePerKmMinutes + (targetPacePerKmSeconds / 60);

prefix = "VP0";
RESULT = (SUUNTO_DISTANCE - ((SUUNTO_DURATION / 60) / targetPaceMinutesPerKm)) * 1000;
postfix = "m";

/***********
 * THE END *
 **********/
