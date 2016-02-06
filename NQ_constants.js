var pageChangeSubmitted = false;
// var dualKeyNavigation = true;
var dualKeyNavigation = false;


//Key Event Codes
var leftArrow = 37, upArrow = 38, rightArrow = 39, downArrow = 40;
var qKey = 81,  wKey = 87, eKey = 69,
	aKey = 65,  sKey = 83, dKey = 68, 
	zKey = 90,  xKey = 88, cKey = 67;
var numpadSlash = 111, numpadPlus = 107, numpadMinus = 109,
	numpad7 = 103, numpad8 = 104, numpad9 = 105, 
	numpad4 = 100, numpad5 = 101, numpad6 = 102,
	numpad1 = 97,  numpad2 = 98,  numpad3 = 99,
	numpad0 = 96;
var spaceKey = 32, backTickKey = 192;
var enterKey = 13;
var escapeKey = 27;
var pKey = 80, fKey = 70;

//Key Configuration

var progressKeys_DK = [spaceKey, backTickKey, eKey, numpad1];

var southKeys_DK = [downArrow, sKey], northKeys_DK = [upArrow, wKey], 
	eastKeys_DK = [rightArrow, dKey], westKeys_DK = [leftArrow, aKey];
var navigationKeys_DK = [westKeys_DK, northKeys_DK, 
						 eastKeys_DK, southKeys_DK];


var progressKeys_SK = [spaceKey, backTickKey, numpad5, enterKey, sKey, downArrow];
var northWestKeys_SK = [qKey, numpad7], northKeys_SK = [wKey, numpad8], northEastKeys_SK = [eKey, numpad9],
	westKeys_SK =	   [aKey, numpad4, leftArrow],				 eastKeys_SK = [dKey, numpad6, rightArrow],
	southWestKeys_SK = [zKey, numpad1], southKeys_SK = [xKey, numpad2], southEastKeys_SK = [cKey, numpad3];

var navigationKeys_SK = [northWestKeys_SK, northKeys_SK, northEastKeys_SK, 
						 westKeys_SK, 					 	  eastKeys_SK, 
						 southWestKeys_SK, southKeys_SK, southEastKeys_SK];

var tabIndexIncrementKeys = [numpadPlus];
var tabIndexDecrementKeys = [numpadMinus];
var potionShortcutKeys = [[pKey], northEastKeys_SK];
var fleeShortcutKeys = [fKey, numpadSlash];

var keysToUse = {};
keysToUse.progressKeys = (dualKeyNavigation)? progressKeys_DK : progressKeys_SK;
keysToUse.navigationKeys = (dualKeyNavigation)? navigationKeys_DK : navigationKeys_SK;
keysToUse.keyReference = {};
keysToUse.keyReference.leftKeys = (dualKeyNavigation)? westKeys_DK : westKeys_SK;
keysToUse.keyReference.rightKeys = (dualKeyNavigation)? eastKeys_DK : eastKeys_SK;


var bossImgUrls = [
	//The Miner Foreman
	"http://images.neopets.com/nq2/m/m1008_4f897.gif",
	//Zombom
	"http://images.neopets.com/nq2/m/m1015_242a2.gif",
	//Sand Grundo
	"http://images.neopets.com/nq2/m/m1025_e4a7b.gif",
	//Ramtor
	"http://images.neopets.com/nq2/m/m1035_3e255.gif",
	//Leximp
	"http://images.neopets.com/nq2/m/m2015_bade1.gif",
	//Kolvars
	"http://images.neopets.com/nq2/m/m2050_c2406.gif",
	//Scuzzy
	"http://images.neopets.com/nq2/m/m2110_582d7.gif",
	//Siliclast
	"http://images.neopets.com/nq2/m/m3025_6e4b4.gif",
	//Gebarn II
	"http://images.neopets.com/nq2/m/m3040_0f9ec.gif",
	//Revenant
	"http://images.neopets.com/nq2/m/m3080_10cae.gif",
	//Coltzan's ghost
	"http://images.neopets.com/nq2/m/m3120_e3008.gif",
	//Anubits
	"http://images.neopets.com/nq2/m/m3140_8a979.gif",
	//Meuka
	"http://images.neopets.com/nq2/m/m4025_e5111.gif",
	//Spider Grundo
	"http://images.neopets.com/nq2/m/m4045_92d47.gif",
	//Hubrid Nox
	"http://images.neopets.com/nq2/m/m4100_993cd.gif",
	//Dark Faerie
	"http://images.neopets.com/nq2/m/m4070_7a6d7.gif",
	//Fire Faerie
	"http://images.neopets.com/nq2/m/m4071_e05d3.gif",
	//Water Faerie
	"http://images.neopets.com/nq2/m/m4072_890f3.gif",
	//Earth Faerie
	"http://images.neopets.com/nq2/m/m4073_65b18.gif",
	//The Esophagor
	"http://images.neopets.com/nq2/m/m4125_edaf6.gif",
	//Fallen Angel
	"http://images.neopets.com/nq2/m/m5025_e3489.gif",
	//Devilpuss
	"http://images.neopets.com/nq2/m/m5070_f6d11.gif",
	//The Faerie Thief
	"http://images.neopets.com/nq2/m/m5105_fefbf.gif",
	//Pant Devil
	"http://images.neopets.com/nq2/m/m5115_30b8e.gif",
	//King Terask
	"http://images.neopets.com/nq2/m/m5155_6dfec.gif",
	//King Terask  (Mk. II)
	"http://images.neopets.com/nq2/m/m5160_081ff.gif"]

