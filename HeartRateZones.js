/*
######################################### Heart Rate Zones ##########################################
# version : 20160423
#
# DESCRIPTION :
#
#
#
#	0                                                                65        75   80   85             100
#	|----------------------------------------------------------------|---------|----|----|--------------|
#	                              WUP                                    EF      -    THR       MAX
#	Zones :
#		WUP	: warm up
#		EF	:
#		'3'	: noname or 'zone 3'
#		THR	: threshold (sometimes 80-90%)
#		MAX	: maximum
#
#
# VARIABLES :
#	User max heart rate SUUNTO_USER_MAX_HR


	percentOfMaximumHeartRate = 0
	percentWup = 65
	percentEf = 75
	percentZone3 = 80
	percentThresholdLow = 85
	percentThresholdHigh = 90



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
/*
RESULT  = myResultVar;
*/
postfix = "";





percentOfMaximumHeartRate = SUUNTO_HR * 100 / SUUNTO_USER_MAX_HR;

if(percentOfMaximumHeartRate > percentZone3) {
	/* n > 80% */


	if(percentOfMaximumHeartRate > percentThresholdHigh) {
		/* n > 90% */
		postfix = "MAX";
		}
	else {
		/* 80% < n < 90% */


		if(percentOfMaximumHeartRate > percentThresholdLow) {
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


	if(percentOfMaximumHeartRate > percentWup) {
		/* 65% < n < 80% */

		if(percentOfMaximumHeartRate > percentEf) {
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
