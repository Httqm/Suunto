/*
######################################### virtualPartner_slowStart.js ###############################
# version : 20200214
#
# DESCRIPTION : see "virtualPartner_README.txt"
#
# The "slow pace" is the pace used to start a race. This is slower than the "race pace" so that you won't "hit the wall" later.
# The "slow pace" can be 15/20/30 seconds/km slower than the "race pace". You'll have to compute a corrected value of your "race pace"
# so that you respect your "race pace" on the whole race.
# As you'll see, the "slow start" actually has a minor impact on the "race pace" :
#
# For example :
#	- marathon
#	- race pace : 5min/km
#	- slow start pace : 5:20min/km, on the first 3km
# which gives :
#	3km * 20s/km = 60s "late" on the race pace
#	60s / 39km = 1.54s/km
# So the race pace (i.e. after the 3rd km) becomes :
#	5:00min/km - 1.54s/km = 4:58min/km

# VARIABLES :
#
#	slowPacePerKmMinutes = 5	can be edited	==> declares the pace
#	slowPacePerKmSeconds = 20	can be edited	==> as 5:20min/km
#
#	racePacePerKmMinutes = 4	can be edited	==> declares the pace
#	racePacePerKmSeconds = 58	can be edited	==> as 4:58 min/km
#
#	targetPaceSecondsPerKm = 0	don't edit
#
# 	==> Don't forget to set the result format to 0 decimal.
#
# SUGGESTED WATCH SCREEN CONFIGURATION :
#	- heart rate
#	- this app
#	- distance (competition) OR lap distance / lap duration (training)
########################################## ##########################################################

While in sport mode do this once per second */

/*
SUUNTO_DURATION (s)
SUUNTO_LAP_DURATION (s)
SUUNTO_DISTANCE (km)
SUUNTO_LAP_DISTANCE (km)

my distance :	SUUNTO_LAP_DISTANCE
vpDistance :	distance run by the Virtual Partner

	s	| targetPaceSecondsPerKm	| SUUNTO_LAP_DURATION
	----+---------------------------+--------------------
	km	| 1							| vpDistance

	vpDistance[km] = SUUNTO_LAP_DURATION / targetPaceSecondsPerKm


d : distance between my Virtual Partner and me

	d[km]	= myDistance - vpDistance
			=  SUUNTO_LAP_DISTANCE - (SUUNTO_LAP_DURATION / targetPaceSecondsPerKm)
	d[m]	= (SUUNTO_LAP_DISTANCE - (SUUNTO_LAP_DURATION / targetPaceSecondsPerKm)) * 1000

RESULT < 0 : VP is ahead of me
RESULT > 0 : I am ahead of VP
*/


/**************
 * SLOW START *
 *************/
if (SUUNTO_LAP_NUMBER == 1) {
	targetPaceSecondsPerKm = (60 * slowPacePerKmMinutes) + slowPacePerKmSeconds;
	}


/*************
 * RACE PACE *
 ************/
else if (SUUNTO_LAP_NUMBER > 1) {
	targetPaceSecondsPerKm = (60 * racePacePerKmMinutes) + racePacePerKmSeconds;
	}


/***************************************
 * COMPUTE DISTANCE TO VIRTUAL PARTNER *
 **************************************/
prefix = "VP0";
RESULT = (SUUNTO_LAP_DISTANCE - (SUUNTO_LAP_DURATION / targetPaceSecondsPerKm)) * 1000;
postfix = "m";


/***********
 * THE END *
 **********/
