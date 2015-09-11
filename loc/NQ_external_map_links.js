// For development use only; collection of data while playing for sake of future map feature. Uncommenting file will re-enable logging and alerts of new location data.

// if(isOnMapScreen()){

// var locationText = document.querySelector('map[name="navmap"]').nextSibling.nextSibling.nextSibling.nodeValue, mainTable = document.querySelector('div[align="center"][style="padding:7px;"]');
// var gotIt = "location text recorded: \n";
// /*

// From now on, cataloging the text and what map to display with it. you dont even have to record the numbers yet, 
// just get/record all the possible text 
// */

// var textCollectedSoFar = {
// 	"You are in the Lost Desert.":gotIt,//[143],
// 	"You are in the Palace of Ancient Kings.":gotIt,//[55,56],
// 	"You are in Waset Village.":gotIt,
// 	"You are in the ruined city of Akhten-Ka.":gotIt,
// 	"You are in Zakharukh's Pyramid.":gotIt,
// 	"You are in the Haunted Woods.":gotIt,
// 	"You are in Shadow Gulch.":gotIt,
// 	"You are in the Castle of Count von Roo.":gotIt,
// 	"You are in the Stenchful Swamp.":gotIt,
// 	"You are in the Cave of Dark Things.":gotIt,
// 	"You are in Balthazar's Grove.":gotIt,
// 	"You are in the Happy Fun Non-Haunted House.":gotIt,
// 	"You are in the Mountains of Terror.":gotIt,

// };


// //CODE FOR NOTIFYING ME I HAVENT RECORDED LOCATION TEXT:
	// if(textCollectedSoFar[locationText] == undefined){
		// $(mainTable).css("backgroundColor", "red"); 
		// console.log('%c please add this location text to loc/displayIDNGMapLinks.js:', 'background: #222; color: #F00; font-size: 2em');
		// console.log('%c"' + locationText + '"\n', 'background: #a5d6ff; color: #1400a7; font-size: 2em; font-style: italic;');


// 	} else {
// 		console.log('%c ' + textCollectedSoFar[locationText] + locationText, 'background: #0084ff; color: #FFF; font-size: 2em');
// 	}
// //END OF NOTIFICATION CODE

// //END OF IF(ONMAPSCREEN)
// }









// /*
//    	Scratch the previous plan.
// 			Right now, I am in the Valley of Kings. The location text is "You are in the Lost Desert."
// 			There is no way to distinguish between:
// 					- the Valley of Kings
// 					- NW Desert
// 					- Etc...


// 	It may just be better to link to the bird's eye view of the Lost Desert, without trying anything.
// 			- You don't really gain anything by looking at eg the Valley of Kings map specifically anyway.
// 			- We shouldn't waste coding power on solving useless/irrelevant problems.

// 		+?+ You could just have a list of the links to immediate sub-maps of the lost desert underneath that but
// 			- maybe its just not worth the effort

// 	In caves, should just provide links to all the levels of the cave in a list
// 			- without trying to determine which one the user is currently on


// 	basically, JUST use the location text to present the user with a list of possibilities, 
// 			not an overthought specific calculated-attempt-at-a guess

// 			none of this overall map, submap stuff, just
// 	"You are in the Lost Desert.":[143]
// 	"You are in the Palace of Ancient Kings.":[55,56]

// 	just keep them all in arrays no matter what and the display function will push links to all of the
// 	numbers given

// 	>> the display function will just be like:
// 	 >> var idnqURL = "http://www.idnq-guide.com/index.php?page=maps&map="
// 	 >> for each (number given me in this array) x make and display a link that is 
// 	 >> var newURL = idnqURL + x



//    	*/

// //The below was easily created with the power of regex on the HTML of IDNQ's index page. 
// //Most densely productive five seconds of my life.
// //Probably won't use all of these.
// /*
// var mapNumToName = {
// 	1: "​Meridell Overall Map​",​
// 	2: "​Trestin Village​",​
// 	3: "​Western Plains​",​
// 	4: "​Dark Cave / Gold Mine​",​
// 	5: "​Northern Marches​",​
// 	6: "​White River City​",​
// 	7: "​Undeground Cave​",​
// 	8: "​Lost Island​",​
// 	9: "​Mysterious Tower, Level 1​",​
// 	10: "​Mysterious Tower, Level 2​",​
// 	11: "​Mysterious Tower, Level 3​",​
// 	12: "​Mysterious Tower, Level 4​",​
// 	13: "​Southern Meridell​",​
// 	14: "​Town of Lakeside​",​
// 	15: "​Lost City of Phorofor​",​
// 	16: "​Tower on The Hill (Level 2)​",​
// 	17: "​Tower on The Hill (Level 1)​",​
// 	18: "​South East Meridell​",​
// 	99: "​Village of Seaside​",​
// 	19: "​Plains of Retreat + Castle of Meridell​",​
// 	20: "​Meridell Castle​",​
// 	21: "​Ramtor's Tower: Base Level​",​
// 	22: "​Ramtor's Tower: Dungeon 1​",​
// 	23: "​Ramtor's Tower: Dungeon 2​",​
// 	24: "​Ramtor's Tower: Tower​",​

// 	25: "​Terror Mountain - South Pass​",​
// 	26: "​Chia Oscuro​",​
// 	27: "​Damp Smelly Cave​",​
// 	28: "​Caves of Terror​",​
// 	29: "​Eastern Pass - Overall​",​
// 	30: "​Eastern Pass - Sector 1​",​
// 	31: "​Mountainside Inn (Level 1)​",​
// 	32: "​Mountainside Inn (Level 2)​",​
// 	34: "​Happy Valley​",​
// 	35: "​Eastern Pass - Sector 2​",​
// 	37: "​Eastern Pass - Sector 3​",​
// 	38: "​Eastern Pass - Sector 4​",​
// 	41: "​Adventurers' Camp​",​
// 	42: "​Lost Caves (level 1)​",​
// 	43: "​Lost Caves (level 2)​",​
// 	44: "​Lost Caves (level 3)​",​
// 	45: "​Lost Caves (level 4)​",​
// 	46: "​Mountain Top​",​

// 	143: "​Lost Desert (overall)​",​
// 	103: "​Sakhmet City​",​
// 	49: "​Lost Desert, South​",​
// 	101: "​The huts​",​
// 	47: "​Temple of the Sky, Level 1​",​
// 	48: "​Temple of the Sky, Level 2​",​
// 	50: "​Ruined Temple, Level 1​",​
// 	51: "​Ruined Temple, Level 2​",​
// 	52: "​Ruined Temple, Level 3​",​
// 	53: "​Ruined Temple, Level 4​",​
// 	57: "​Lost Desert, North West​",​
// 	102: "​Waset Village​",​
// 	54: "​Valley of Kings​",​
// 	55: "​Palace of Ancient Kings, Level 1​",​
// 	56: "​Palace of Ancient Kings, Level 2​",​
// 	58: "​Lost Desert, East​",​
// 	59: "​Akhten-Ka​",​
// 	60: "​Zakharukh's Pyramid, Level 1​",​
// 	61: "​Zakharukh's Pyramid, Level 2​",​
// 	62: "​Zakharukh's Pyramid, Level 3​",​

// 	63: "​Haunted Woods, West​",​
// 	66: "​Shadow Gulch​",​
// 	64: "​Von Roo's Castle, Entrance​",​
// 	65: "​Von Roo's Castle, Dungeon​",​
// 	68: "​Haunted Woods, East​",​
// 	69: "​Cave of Dark Things​",​
// 	83: "​Balthazar's Grove​",​
// 	70: "​Happy Fun Non-Haunted House, Level 1​",​
// 	72: "​Happy Fun Non-Haunted House, Level 2​",​
// 	74: "​Nox's Fortress, Level 1​",​
// 	75: "​Nox's Fortress, Level 2​",​
// 	76: "​Nox's Fortress, Level 3​",​
// 	77: "​Nox's Fortress, Level 4​",​
// 	78: "​Nox's Fortress, Level 5​",​
// 	79: "​Nox's Fortress, Level 6​",​
// 	80: "​Nox's Fortress, Level 7​",​
// 	81: "​Nox's Fortress, Level 8​",​
// 	82: "​Nox's Fortress, Level 9​",​
// 	84: "​Hubrid's Moutain Range​",​
// 	85: "​Esophagor's Swamp​",​

// 	86: "​Faerieland, Map 1​",​
// 	87: "​Northern Watchtower, Level 1​",​
// 	88: "​Northern Watchtower, Level 2​",​
// 	89: "​Faerieland, Map 2​",​
// 	90: "​The Underclouds​",​
// 	91: "​Cumulonimbus​",​
// 	92: "​Village of Cirrus​",​
// 	93: "​Faerieland (road to City)​",​
// 	94: "​Faerie City​",​
// 	95: "​Faerie City, Inn (Level 1)​",​
// 	96: "​Faerie City, Basement​",​
// 	97: "​Faerie Palace, Level 1​",​
// 	98: "​Faerie Palace, Level 2​",​
// 	100: "​Faerie Palace, Level 3​",​
// 	104: "​Faerie Palace, Level 4​",​
// 	105: "​Faerie Palace, Level 5​"
// };
// */