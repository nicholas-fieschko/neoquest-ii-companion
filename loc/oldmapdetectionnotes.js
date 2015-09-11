// For development use only; ideas and personal notes for future map feature. 

// // on each page, scan for stairs/caveentrance/etc
// // if in a hut, use hut closest to last remembered map? or maybe all huts have an identifying image

// // chrome.storage.sync.set({'lastMapNum': keyCode}, function() {

// //   });
// var locationText = document.querySelector('map[name="navmap"]').nextSibling.nextSibling.nextSibling.nodeValue;
// //An object where you can reference it like locationReference[locationText] to get the possibilities of where you are.
// //If there are multiple possibilities, then you have to do some smart stuff...
// //No matter the case, make sure you have the map number you come up with stored in the localstorage!
// var locationReference = {
// 	"You are in the Palace of Ancient Kings.":{ //Maybe initialize this as an empty object so we can list all the possible location texts
// 												//neatly in the locationReference before defining the gritty details later
// 			overallMapCameFrom: overallMapComesFrom(this.overallMap), 
// 			//^^^^North-west Lost Desert, should be overallMapCameFrom: 57
// 			overallMap: subMapIsInWhatOverallMap(this.subMaps.arr[0]), //Valley of Kings, which you get to from the NW Lost Desert
// 			subMaps: { //Palace of Ancient Kings Level 1 and 2 respectively, 
// 				//it's our .which function that will have to pick which to return. In fact, there may be no reason to store it here other than
// 				//for clean visual reference and maybe retrieving names...
// 				arr: [55,56]
// 				//,names: ["Palace of Ancient Kings, Level 1", "Palace of Ancient Kings, Level 2"]
// 				//or name = function(subMapPicked) { if(1) return "Palace of Ancient Kings, Level 1" else if (2) .... }
// 				// Could set that at our luxury at the end if we wanted, no real need for names, but doesn't really req much work
// 			}//, 
// 			//which = function(storedMapNumsArray) { defined elsewhere}
// 		}
// 	"You are in the Lost Desert.":{
// 		//In valley of kings....
// 		possibleSubMaps: [valley of kings, NWLostDesert....]

// 	}
// }

// function overallMapComesFrom(overallMapNumArrivedAt){
// 	//return overAllMapComesFrom
// 	var mapThatLeadsTo = {
// 		54:57//,
// 		//Valley of Kings(54) comes from NW Lost Desert(57). we should name these numbers hahaha..
// 					//but be careful, if you pass in a var name VallKings as overallMapNumArrivedAt with val 54
// 					//That will check dict for key-pair 54:"x", not VallKings:"x" (aka you cant set things as dict.VallKings, you need to
// 					//do dict.54, so all your declarations like the 
// 					//54:57 here should be 
// 					//54:NWLostDesert (NWLostDesert defined as constant at top of file))
// 		//X:Y,
// 		//X:Y
// 	};
// 	return mapThatLeadsTo.overallMapNumArrivedAt;
// }

// function subMapIsInWhatOverallMap(subMap){

// 	var overallMapOf = {
// 		55:54//,
// 		// See above. should be 55:ValleyOfKings. set constants later
// 	}
// 	return overallMapOf.subMap;
// }

// function displayFinalAnswer(overallMapNumChosen, specificMapNumChosen){
// 	/*
// 		Actually, scratch the following. Or not. It may just be another set of cases, but...
// 			Right now, I am in the Valley of Kings. The location text is "You are in the Lost Desert."
// 			There is no way to distinguish between:
// 					- the Valley of Kings
// 					- NW Desert
// 					- Etc...
// 			It may just be better to link to the bird's eye view of the Lost Desert, without trying anything.
// 			http://www.idnq-guide.com/index.php?page=maps&map=143 
// 			You don't really gain anything by looking at eg the Valley of Kings map specifically anyway.
// 			We shouldn't waste coding power on solving useless/irrelevant problems.

// 			You could just have a list of the links to immediate sub-maps of the lost desert underneath that but
// 			maybe its just not worth the effort

// 			In caves, maybe you should just provide links to all the levels of the cave in a list
// 			without trying to determine which one the user is currently on


// 			basically, JUST use the location text to present the user with a list of possibilities, 
// 			not an overthought specific calculated-attempt-at-a guess

// 			none of this overall map, submap stuff, just
// 			"You are in the Lost Desert.":[143]
// 			"You are in the Palace of Ancient Kings.":[55,56]

// 			just keep them all in arrays no matter what and the display function will push links to all of the
// 			numbers given





// 	   	I think we should have a div box under the nav controls that is in the following format:
// 	   		Best Guess For Overall Map: 33 [link] (if outdoors like whole of southern lost desert, west of meridell, etc)
// 	   		Best Guess For Specific Location: 56 [link]
// 			Option to show a input field to manually correct the numbers (obviously that field should have a button that triggers
// 				a function to validate(!! will need to write conditions for that later) and store the new numbers)

// 				//Early thoughts on validating the user input correction-- make sure its a valid pair, eg keep a reference of what
// 				range of numbers for specificMapNumChosen are possible for each given overallMapNumChosen
// 	   	*/
// }



// //Even if there is only one possibility for a certain location text, you should still define a .which function that returns the right number.

 
// 	.which(storedMapNum) functions should return:
// 		+ an array in the format [overallMapNum, specificMapNum]
// 			- example [Western-Meridell, DankCavesLevel1] (as numbers)

// 	The cases to handle in .which(storedMapNum) functions:
// 	   	+ storedMapNum is null/nonexistant because there was nothing in storage -- you have the locationText, but otherwise you're on your own
// 	   			- try to use identifying map tiles etc, but if there aren't unique ones to each potential map matching this locationText,
// 	   			- maybe use first floor/area with that locationText and have a button to hide/show an input area where the user can correct it 
// 	   																								^^^(this is a good idea regardless)
// 	   	+ storedMapNum is neither of/none of the numbers that match your locationText -- meaning you came from a different area
// 	   	+ storedMapNum is one of the numbers appropriate to your locationText-- you need to determine which it should be, using map images or etc.
   	
// locationReference["You are in the Palace of Ancient Kings."].which = function(storedMapNumsArray){
	
// 	var storedOverallMapNum = storedMapNumsArray[0]
// 	var storedSpecificMapNum = storedMapNumsArray[1]

// 	//[55,56]
// 	var tile = document.querySelector('img[src="http://images.neopets.com/nq2/t/sfb.gif"][class="z1"]');
// 	var dirt = document.querySelector('img[src="http://images.neopets.com/nq2/t/cv.gif"][class="z1"]');
// 	var rockWall = document.querySelector('img[src="http://images.neopets.com/nq2/t/rck.gif"][class="z0"]');
// 	var stairsUp = document.querySelector('img[src="http://images.neopets.com/nq2/t/sf_str_up.gif"][class="z2"]');
// 	var bed = document.querySelector('img[src="http://images.neopets.com/nq2/t/sf_bed.gif"][class="z2"]');
// 	if (stairsUp || (tile && (dirt || rockWall))){
// 		console.log("level two (underground)");
// 		return 56;
// 	} else if (storedMapNum !== 56 || bed){
// 		console.log("lvl one (above ground)");
// 		return 55;
// 	}
// }

// //You are in the Lost Caves.

// // var mapNum = determined up there somewhere
// // var idnqURL = "http://www.idnq-guide.com/index.php?page=maps&map=" + mapNum;



// //determine location function!
// /*	location should locally store:
// 		+ an array in the format [overallMapNum, specificMapNum]
// 			- example [Western-Meridell, DankCavesLevel1] (as numbers)
// 				======>[33,34]
//    	*/
//     chrome.storage.sync.get('lastMapNums', function(result) {
//     	// var lastMapNum = parseInt(result.lastMapNum);
//     	var storedMapNumsArray = result.lastMapNum;

//     	var attemptToLookupNumInArray = locationReference[locationText].which(storedMapNumsArray);

//     	var successfulLocationTextLookupNum = undefined;

//     	if(attemptToLookupNumInArray == "error" or null?){ 
//     			//the location text couldn't be found in our reference... so we should try to just use the last thing in storage...
//     			//maybe should wrap the previous in a try/catch thing instead? if the locationText doesn't exist, trying to get its .which 
//     			//function might throw an error instead of silently returning null, let alone returning "error", unless we can set an object
//     			//to return a default value if the attribute/variable attempted to access didn't exist. we'd have to see.

//     			//we should handle this and abort.. don't try to store this null/error in the localstorage!! 
//     			//i think the solution should be to to try to use what's in storage, in the next block
//     			//the last case will be if we cant find it in our reference AND we don't have anything stored

//     			/*
//     			   	So basically, the cases are:
//     			   		- nothing stored and location text could not be found in reference
//     			   			+ worst case, will have to come up with answer of how to handle this
//     			   		- location text could not be found in reference BUT we DO have a number in localstorage
//     			   			+use that number, but try to verify that the map has at least something that map should have (same tiles/rocks/w/e)
//     			   		- location text WAS found in reference
//     			   			+ best case! 
//     			   			+ note that the which() method that set attemptToLookupNumInArray will have hopefully already determined which case of that
//     			   				particular location text we are in (it should have it display the number used, under the nav controls, in a div box, and
//     			   				hopefully we can keep an eye on it to see if it is accurate)
//     			   				- determining/watching whether the number should have changed while the location text didnt (floors of a cave etc) is a 
//     			   					problem that should be handled in the which() functions
//     			   			+ use the number and store the number in localstorage


//     			   	*/


//     			return; //until we've implemented a better code solution, just don't proceed
//     	} else {
//     		successfulLocationTextLookupNum = attemptToLookupNumInArray;
//     	}

//     	if(!lastMapNum && successfulLocationTextLookupNum){
//     		console.log("woops, nothing was found in storage, but we did find the thing in our reference");

// 			chrome.storage.sync.set({'lastMapNum': successfulLocationTextLookupNum}, function() {
// 				//test to see that it stored a valid value?
// 				console.log("success.. stored as " + successfulLocationTextLookupNum);
// 			});
//     		//try to detect and store value! then put a link to the right map on the page!
//     		return;
//     	}
//     		//great, you have a starting point! 
//     		//now determine if the current location could have changed!
//     		console.log("Oh!... I see we had " + lastMapNum + " stored. We should check to see if it's changed...");

//     		console.log("locationReference[locationText].which() === lastMapNum? ... " + (locationReference[locationText].which() === lastMapNum) + "!");
//     		if(locationReference[locationText].which() !== lastMapNum){
//     			console.log("let's change that...");
// 				chrome.storage.sync.set({'lastMapNum': locationReference[locationText].which()}, function() {
// 				//test to see that it stored a valid value?
// 				console.log("success.. stored as " + locationReference[locationText].which());
// 				});
//     		} else {
//     			console.log("no need to change.");
//     		}

//  	});