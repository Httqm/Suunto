About the 'Virtual Partner' programs


The concept of my 'Virtual Partner' programs is to imagine you are running with your 'virtual partner'. This partner :
 - is able to run EXACTLY at the specified pace (your "race pace")
 - can reach this pace INSTANTLY
 - is never tired and stops when you stop

Then, once both you and your virtual partner are running, these 'Virtual Partner' programs just compute the distance 'd' between you and your virtual partner :
 - if d = 0, both are running at the same pace (your "race pace")
 - if d < 0, you are SLOWER than your virtual partner
 - if d > 0, you are FASTER than your virtual partner


The main difference between the 'Virtual Partner' programs is the moment when the 'virtual partner' starts running :

 - virtualPartner_competition.js :	as soon as you press the 'START' watch button, the virtual partner starts running at your "race pace",
									and the program computes the distance between you and your virtual partner.

 - virtualPartner_training.js : 	when you press the 'LAP' watch button, the virtual partner starts running at your "race pace",
									and the program computes the distance between you and your virtual partner.
									This lets you warm up as long / as slow as you like until you are ready to reach your "race pace".

 - virtualPartner_slowStart.js :	this is a combination of both previous programs. The purpose is still to control the running pace,
									still with your "race pace", but adding a "slow start pace" for the first kilometers / minutes (whatever you like,
									and actually until you press the 'LAP' button).
									- when the program starts ('START' button) : your partner runs at your "slow start pace"
									- when you press 'LAP' : your partner accelerates to your "race pace"
									And you always know how far you are ahead / behind your partner.
										==> This is actually to avoid starting a race too fast.
