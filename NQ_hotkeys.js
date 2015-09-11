window.addEventListener('keydown', keyDownMonitorFunction, false);
window.addEventListener('keyup', keyUpMonitorFunction, false);

var VELM_HEAL_THRESHOLD = 78;

var currentTabIndexToFocus = 1;
function actOnHotKeys() {
	if(isAnyKeyPressed(tabIndexIncrementKeys) && document.activeElement!= document.body){
		currentTabIndexToFocus++;
		document.querySelector("[tabindex='" + currentTabIndexToFocus + "']").focus();
	} else if(isAnyKeyPressed(tabIndexDecrementKeys) && document.activeElement!= document.body){
		currentTabIndexToFocus--;
		document.querySelector("[tabindex='" + currentTabIndexToFocus + "']").focus();
	}
	else if(isKeyPressed(escapeKey)) {
		document.activeElement.blur();
	}
	if(isInBattle() || isBattleOver()){
		if(isAnyKeyPressed(keysToUse.progressKeys)){
			proceedInBattle();
		} else if( isAnyKeyPressed(keysToUse.keyReference.leftKeys) 
				|| isAnyKeyPressed(keysToUse.keyReference.rightKeys)){
			var isLeftKeyDown = isAnyKeyPressed(keysToUse.keyReference.leftKeys);
			selectEnemies(isLeftKeyDown);
		} else if (isAnyKeyPressed(potionShortcutKeys)){
			if(whoseTurn() === "Velm"){
				document.querySelector('a[onclick="setaction(9402); document.ff.submit(); return false;"]').click();
			} else {
				document.querySelector('a[onclick*="setaction(5); setitem(30"]').click();
			}
		} else if (isAnyKeyPressed(fleeShortcutKeys)){
			document.querySelector('a[onclick="setaction(4); document.ff.submit(); return false;;"]').click();
		}
	} else if (isOnMapScreen()){
		if(isAnyKeyPressed(keysToUse.navigationKeys)){
			navigateMap();
		} else if (isAnyKeyPressed(keysToUse.progressKeys)){
			if(document.activeElement!= document.body){
				document.activeElement.click();
				pageChangeSubmitted = true;
			} else { 
				document.querySelector("[tabindex='1']").focus();
			}
		}
	} else {
		return false;
	}
}

function proceedInBattle(){
	var beginButton = document.querySelector('img[src="http://images.neopets.com/nq2/x/com_begin.gif"]');
	var nextButton = document.querySelector('img[src="http://images.neopets.com/nq2/x/com_next.gif"]');
	var endButton = document.querySelector('img[src="http://images.neopets.com/nq2/x/com_end.gif"]');
	var returnToMapButton = document.querySelector('img[src="http://images.neopets.com/nq2/x/tomap.gif"]');
	if(nextButton != undefined){
		nextButton.parentNode.click();
	} else if(beginButton != undefined){
		beginButton.parentNode.click();
	} else if(endButton != undefined){
		endButton.parentNode.click();
	} else if(returnToMapButton != undefined){
		returnToMapButton.parentNode.click();
	}
	else {
		clickAttack();
	}
}



function clickAttack(){
	var highlightedLink = document.activeElement;
	var isNothingElseSelected = (highlightedLink === document.body);

	var isBossFight = isBossBattle();
	// console.log("isBossFight? " + isBossFight + "!");
	var numEnemies = document.querySelectorAll(".pa:not([src*='x_'])").length;

	if(isNothingElseSelected){
		switch(whoseTurn()){
			case "Rohane":
				document.querySelector('img[src="http://images.neopets.com/nq2/x/com_atk.gif"]').click();
			break;
			case "Mipsy":
				if($('font[color="red"]:contains(Damage Shield)').length === 0 &&
					(isBossFight || numEnemies > 2)){
					document.querySelector('a[onclick="setaction(9205); document.ff.submit(); return false;"]').click();
				} else {
					document.querySelector('a[onclick="' + mipsyAttackJS + '"]').click();
				}
			break;
			case "Talinia":
				var multipleTargetAttack = document.querySelector('a[onclick="setaction(9302); document.ff.submit(); return false;"]');
				if(multipleTargetAttack != undefined){
					multipleTargetAttack.click();
				} else {
					document.querySelector('img[src="http://images.neopets.com/nq2/x/com_atk.gif"]').parentNode.click();
				}
			break;
			case "Velm":
				var hpDown = mostDamageToMember;
				if(hpDown >= VELM_HEAL_THRESHOLD) {
				// if((isBossFight && hpDown >= 50) || hpDown >= VELM_HEAL_THRESHOLD) {
					//Group Heal
					document.querySelector('a[onclick="setaction(9402); document.ff.submit(); return false;"]').click();
				} else if((isBossFight || numEnemies > 1) && $("font[color='green']:contains('MR')").length !== 4){
					//Put up shields
					document.querySelector('a[onclick="setaction(9403); document.ff.submit(); return false;"]').click();
				} else { //Attack ...
					document.querySelector('img[src="http://images.neopets.com/nq2/x/com_atk.gif"]').click();
				}
			break;
		}
	} else {
		highlightedLink.click();
	}
}


function selectEnemies(isLeftKeyDown){
	var allEnemies = document.querySelectorAll(".pa");
	var allLivingEnemies = document.querySelectorAll(".pa:not([src*='x_'])");
	var lastEnemyIndex = allLivingEnemies.length - 1;
	var enemySelectionButtons =  $('img[src="http://images.neopets.com/nq2/x/ch_red.gif"]');
	var currentSelectedEnemyIndex = enemySelectionButtons.index(enemySelectionButtons.filter("[style*=visible]"));
	if(currentSelectedEnemyIndex === -1){ //First instance of enemy selection this battle.
		if(isLeftKeyDown){
			currentSelectedEnemyIndex = 0;
			allLivingEnemies[currentSelectedEnemyIndex].click();
		} else { //Right key is down.
			currentSelectedEnemyIndex = lastEnemyIndex;
			allLivingEnemies[currentSelectedEnemyIndex].click();
		}
	} else { //We've already selected an enemy; now we're selecting another.
		if(isLeftKeyDown){
			if(currentSelectedEnemyIndex <= 0){
				currentSelectedEnemyIndex = 0;
			} else {
				currentSelectedEnemyIndex--;
				allLivingEnemies[currentSelectedEnemyIndex].click();
			}
		} else {//Right key is down.
			if(currentSelectedEnemyIndex >= lastEnemyIndex){
				currentSelectedEnemyIndex = lastEnemyIndex;
			} else {
				currentSelectedEnemyIndex++;
				allLivingEnemies[currentSelectedEnemyIndex].click();
			}
		}
	}
}

function navigateMap(){
	var N = document.querySelector('area[alt="North"]');
	var NE = document.querySelector('area[alt="Northeast"]');
	var NW = document.querySelector('area[alt="Northwest"]');

	var S = document.querySelector('area[alt="South"]');
	var SE = document.querySelector('area[alt="Southeast"]');
	var SW = document.querySelector('area[alt="Southwest"]');

	var W = document.querySelector('area[alt="West"]');
	var E = document.querySelector('area[alt="East"]');

	var whereToGo = (dualKeyNavigation)? dualKeyMapNavigation() : singleKeyMapNavigation();

	switch(whereToGo){
		case "north":
			N.click();
			break;
		case "northeast":
			NE.click();
			break;
		case "northwest":
			NW.click();
			break;
		case "south":
			S.click();
			break;
		case "southeast":
			SE.click();
			break;
		case "southwest":
			SW.click();
			break;
		case "east":
			E.click();
			break;
		case "west":
			W.click();
			break;
		}
	pageChangeSubmitted = true;
}

function dualKeyMapNavigation(){
	if(areAllKeysPressed([northKeys_DK])){
		return "north";
	}else if(areAllKeysPressed([northKeys_DK, eastKeys_DK])){
		return "northeast";
	} else if(areAllKeysPressed([northKeys_DK, westKeys_DK])){
		return "northwest";
	}else if(areAllKeysPressed([southKeys_DK])){
		return "south";
	}else if(areAllKeysPressed([southKeys_DK, eastKeys_DK])){
		return "southeast";
	} else if(areAllKeysPressed([southKeys_DK, westKeys_DK])){
		return "southwest";
	} else if(areAllKeysPressed([westKeys_DK])){
		return "west";
	} else if(areAllKeysPressed([eastKeys_DK])){
		return "east";
	}
}

//Note-- use of (or, at least, name of) areAllKeysPressed rather unclear. Maybe refactor later. 
//(areAllKeysPressed is meant to take an flat array of keys that are all supposed to be pressed,
// OR a deeper array where each sub-array has a set of OPTIONS of keys to be pressed-- below, 
// arrays of multiple OPTIONS of keys are passed in-- only one of each subarray has to be pressed.)
function singleKeyMapNavigation(){
	if(areAllKeysPressed([northKeys_SK])){
		return "north";
	}else if(areAllKeysPressed([northEastKeys_SK])){
		return "northeast";
	} else if(areAllKeysPressed([northWestKeys_SK])){
		return "northwest";
	}else if(areAllKeysPressed([southKeys_SK])){
		return "south";
	}else if(areAllKeysPressed([southEastKeys_SK])){
		return "southeast";
	} else if(areAllKeysPressed([southWestKeys_SK])){
		return "southwest";
	} else if(areAllKeysPressed([westKeys_SK])){
		return "west";
	} else if(areAllKeysPressed([eastKeys_SK])){
		return "east";
	}
}

function beforeloadHotKeyModifications(){
	var tabIndex = 1;
	if(isOnMapScreen()){
		var specialOptions = document.querySelectorAll('a[href="nq2.phtml?continue=1"]');
		for (var i = 0; i < specialOptions.length; i++, tabIndex++) {
			specialOptions[i].setAttribute("tabindex", tabIndex.toString());
		}
		var merchOptions = document.querySelectorAll('a[href*="nq2.phtml?act=merch"]');
		for (var i = 0; i < merchOptions.length; i++, tabIndex++) {
			merchOptions[i].setAttribute("tabindex", tabIndex.toString());
		}
		var talkOptions = document.querySelectorAll('a[href*="nq2.phtml?act=talk"]');
		for (var i = 0; i < talkOptions.length; i++, tabIndex++) {
			talkOptions[i].setAttribute("tabindex", tabIndex.toString());
		}
		var normalModeLink = document.querySelector('a[href="nq2.phtml?act=travel&mode=1"]');
		var huntingModeLink = document.querySelector('a[href="nq2.phtml?act=travel&mode=2"]');
		if(huntingModeLink != undefined){
			huntingModeLink.setAttribute("tabindex", tabIndex.toString());
		} else {
			normalModeLink.setAttribute("tabindex", tabIndex.toString());
		}
		tabIndex++;

		document.querySelector('a[href="nq2.phtml?act=inv"]').setAttribute("tabindex", tabIndex.toString());
		tabIndex++;

		var skillsMenus = document.querySelectorAll('a[href*="nq2.phtml?act=skills"]');
		for (var i = 0; i < skillsMenus.length; i++, tabIndex++) {
			skillsMenus[i].setAttribute("tabindex", tabIndex.toString());
		}
	} else if (isMidBattle()){
		if(whoseTurn() === "Mipsy"){
			var mipsyAttacks = document.querySelectorAll('a[onclick="' + mipsyAttackJS + '"]');
			mipsyAttacks[mipsyAttacks.length - 1].setAttribute("tabindex", tabIndex.toString());
			tabIndex++;
			document.querySelector('a[onclick="setaction(9205); document.ff.submit(); return false;"]').setAttribute("tabindex", tabIndex.toString());
			tabIndex++;
		}

		var potionOptions = document.querySelectorAll('a[onclick*="setitem"]');
		for (var i = 0; i < potionOptions.length; i++, tabIndex++) {
			potionOptions[i].setAttribute("tabindex", tabIndex.toString());
		}
	}
}

//Non-NQ-Specific Helper Functions
var keysDown = [];

function keyDownMonitorFunction(e){
	if(keysDown.indexOf(e.which) === -1){
		keysDown.push(e.which);
	}
}

function keyUpMonitorFunction(e){
	if(!pageChangeSubmitted){
		actOnHotKeys();
	}

	while(keysDown.indexOf(e.which) !== -1){ //Should only be in there once, 
											//but there's no efficiency loss in being extra cautious here.
		keysDown.splice(keysDown.indexOf(e.which), 1);
	}
}

function isKeyPressed(key){
	return (keysDown.indexOf(key) !== -1);
}

function isAnyKeyPressed(arrayOfKeys){
	var isAnyPressed = false;

	if(arrayOfKeys[0].constructor === Array){
		for (var i = 0; i < arrayOfKeys.length; i++) {
			if(isAnyKeyPressed(arrayOfKeys[i])) isAnyPressed = true;
		}
	} else {
		for (var i = 0; i < arrayOfKeys.length; i++) {
		if(isKeyPressed(arrayOfKeys[i])) isAnyPressed = true;
		}
	}
	return isAnyPressed;
}


function areAllKeysPressed(arrayOfKeys){

	if(arrayOfKeys.length !== keysDown.length) return false;

	if(arrayOfKeys[0].constructor === Array){
		for (var i = 0; i < arrayOfKeys.length; i++) {
			if(!isAnyKeyPressed(arrayOfKeys[i])) return false;
		}
		return true;
	}

	for (var i = 0; i < arrayOfKeys.length; i++) {
		if(!isKeyPressed(arrayOfKeys[i])) return false;
	}
	return true;
}