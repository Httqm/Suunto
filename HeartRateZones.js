/*
######################################### Heart Rate Zones ##########################################
# version : 20160423
#
# DESCRIPTION :
#	Compute heart rate in % of maximum heart rate and display the corresonding HR zone :
#
#	0                                                                65        75   80   85             100
#	|----------------------------------------------------------------|---------|----|----|--------------|
#	                              WUP                                    EF      -    THR       MAX
#	Zones :
#		WUP	: warm up
#		EF	:
#		'3'	: noname or 'zone 3'
#		THR	: threshold (let's call 80-85% 'threshold low', and 85-90% 'threshold high')
#		MAX	: maximum
#
#
# SUUNTO VARIABLES :
#	SUUNTO_USER_MAX_HR	: User's max heart rate
#	SUUNTO_HR			: User's current heart rate
#
#
# VARIABLES :
#	percentOfMaximumHeartRate = 0		Don't edit
#	upperPercentWup = 65				can be edited (but is it wise?)
#	upperPercentEf = 75					can be edited (but is it wise?)
#	upperPercentZone3 = 80				can be edited (but is it wise?)
#	upperPercentThresholdLow = 85		can be edited (but is it wise?)
#	upperPercentThresholdHigh = 90		can be edited (but is it wise?)
#
#
#	==> Don't forget to set the result format to 0 decimal.
#
# SUGGESTED WATCH SCREEN CONFIGURATION :
#	-
#	- this app
#	-
########################################## ##########################################################
*/

/* While in sport mode do this once per second */
prefix  = "";

percentOfMaximumHeartRate = SUUNTO_HR * 100 / SUUNTO_USER_MAX_HR;

if(percentOfMaximumHeartRate > upperPercentZone3) {
	/* n > 80% */
	if(percentOfMaximumHeartRate > upperPercentThresholdHigh) {
		/* n > 90% */
		postfix = "MAX";
		}
	else {
		/* 80% < n < 90% */
		if(percentOfMaximumHeartRate > upperPercentThresholdLow) {
			/* 85% < n < 90% */
			postfix = "THR+";
			}
		else {
			/* 80% < n < 85% */
			postfix = "THR-";
			}
		}
	}
else {
	/* n < 80% */
	if(percentOfMaximumHeartRate > upperPercentWup) {
		/* 65% < n < 80% */
		if(percentOfMaximumHeartRate > upperPercentEf) {
			/* 75% < n < 80% */
			postfix = "Z3";
			}
		else {
			/* 65% < n < 75% */
			postfix = "EF";
			}
		}
	else {
		/* n < 65% */
		postfix = "WUP";
		}
	}

RESULT = percentOfMaximumHeartRate;

/* THE END */
