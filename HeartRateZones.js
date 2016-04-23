/*
######################################### Heart Rate Zones ##########################################
# version : 20160423
#
# DESCRIPTION :
#
# VARIABLES :
#	User max heart rate SUUNTO_USER_MAX_HR
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

/*
percentOfMaximumHeartRate = SUUNTO_HR * 100 / SUUNTO_USER_MAX_HR;
*/
RESULT = SUUNTO_HR * 100 / SUUNTO_USER_MAX_HR;

/* THE END */
