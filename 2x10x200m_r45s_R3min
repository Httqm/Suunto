
	++==========================++
	||	2*10*200m, r=45", R=3'	||
	++==========================++

"	<== For syntax highlighting in Emacs ;-)

==========================================8<=========================================================
VARIABLES :
step = 0
myDurationSeconds = 0
myDistanceKm = 0
segmentLengthMeters = 200
restBetweenRepsSeconds = 45
restBetweenSeriesSeconds = 180
calmDownDurationSeconds = 600

==========================================8<=========================================================
RESULT=step;
/*
TODO : force minimum duration for warm-up (countdown?)
15 min
20 min, if cold weather
Don't forget to do some progressive speed-ups before starting the real work !
*/
if (step==0) {
	postfix="WarmUp";
	/* Simulate pressing the "LAP" watch button */
	if (SUUNTO_LAP_NUMBER > 1) {
		Suunto.alarmBeep();
		step=step+1;
		myDurationSeconds=SUUNTO_DURATION;
		myDistanceKm=SUUNTO_DISTANCE;
		}
	}

else if (step==1 || step==3 || step==5 || step==7 || step==9 || step==11 || step==13 || step==15 || step==17 || step==19 || step==21 || step==23 || step==25 || step==27 || step==29 || step==31 || step==33 || step==35 || step==37 || step==39) {
	postfix="RUN !";
	if (SUUNTO_DISTANCE - myDistanceKm >= segmentLengthMeters/1000) {
		Suunto.alarmBeep();
		step=step+1;
		myDurationSeconds=SUUNTO_DURATION;
		myDistanceKm=SUUNTO_DISTANCE;
		}
	}

else if (step==2 || step==4 || step==6 || step==8 || step==10 || step==12 || step==14 || step==16 || step==18 || step==22 || step==24 || step==26 || step==28 || step==30 || step==32 || step==34 || step==36 || step==38) {
	postfix="S.Rest";
	if (SUUNTO_DURATION - myDurationSeconds >= restBetweenRepsSeconds) {
		Suunto.alarmBeep();
		step=step+1;
		myDurationSeconds=SUUNTO_DURATION;
		myDistanceKm=SUUNTO_DISTANCE;
		}
	}
else if (step==20) {
	postfix="L.Rest";
	if (SUUNTO_DURATION - myDurationSeconds >= restBetweenSeriesSeconds) {
		Suunto.alarmBeep();
		step=step+1;
		myDurationSeconds=SUUNTO_DURATION;
		myDistanceKm=SUUNTO_DISTANCE;
		}
	}
else if (step==41) {
	postfix="Calm";
	if (SUUNTO_DURATION - myDurationSeconds >= calmDownDurationSeconds) {
		Suunto.alarmBeep();
		step=step+1;
		myDurationSeconds=SUUNTO_DURATION;
		myDistanceKm=SUUNTO_DISTANCE;
		}
	}
