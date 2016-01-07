
//Action determination for each page.
function mainscriptThingsToDo(){
	if(isInBattle()){
		if(isMidBattle()){
			displayHealthNotice();
			if(!isEnemyTurn()){
				removeMipsyAttack();
				moveFleeButton();
			}
		}
		replaceCaveOgre();
	}
	if(isOnMapScreen()){
		removeOptionsAndMainPageLinks();
		displayExperienceToNextLevel();
	}
}

function displayHealthNotice(){
	var spellBox = document.querySelector('td[align="center"][valign="top"]>table[width="100%"][cellspacing="0"][cellpadding="2"]>tbody>tr>td:last-child');
	$(spellBox).css({
			position: "relative",
			width: "269px"});

	var healthAlertBox = document.createElement("div");
	$(healthAlertBox).css({
		width: "148px",
		position: "absolute",
		right: "0px",
		bottom: "0px",
		textAlign:"center"
		});

	spellBox.appendChild(healthAlertBox);

	if(mostDamageToMember > 0){
		var title = document.createElement("span");
		title.appendChild(document.createTextNode("Worst Health in Party:"));
		$(title).css({
			color: "grey",
			fontWeight: "bold",
			display:"block"
			})
	
		healthAlertBox.appendChild(title);
	
		var dmgMsgSpan = document.createElement("span");
		var dmgNum = document.createElement("span");
			dmgNum.appendChild(document.createTextNode(mostDamageToMember))
		
		$(dmgNum).css("color", "red");
	
		var dmgMsh = document.createTextNode(" damage to " + mostDamagedMember + ".");
		dmgMsgSpan.appendChild(dmgNum); dmgMsgSpan.appendChild(dmgMsh);
		
		$(dmgMsgSpan).css({
			color: "grey",
			fontStyle: "italic"
		});
	
		healthAlertBox.appendChild(dmgMsgSpan);
	} else {
		$(healthAlertBox).css("width", "200px");
		var dmgMsgSpan = document.createElement("span");
		var dmgMsh = document.createTextNode("All party members at full health.");
		dmgMsgSpan.appendChild(dmgMsh);
		$(dmgMsgSpan).css({
			color: "grey",
			fontStyle: "italic"
		});
		healthAlertBox.appendChild(dmgMsgSpan);
	}
}

function isOnMapScreen(){
	return (document.querySelector("img[src='http://images.neopets.com/nq2/x/nav.gif']") != undefined);
}

function displayExperienceToNextLevel(){
	var expBars = document.querySelectorAll('img[src="http://images.neopets.com/nq2/x/exp_gold.gif"]');
	var labelRow = expBars[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.previousSibling;

	for (var i = 0; i < expBars.length; i++) {
		expBar = expBars[i];
		expBar.height = 11;
		var charInfoRow = expBar.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	
		var charNextLevel = parseInt(charInfoRow.childNodes[1].firstChild.nodeValue) + 1;

		var charExpCell = charInfoRow.childNodes[charInfoRow.childElementCount - 1];
		var charExpString = charInfoRow.childNodes[charInfoRow.childElementCount - 1].firstChild.nodeValue;
		var charExp = parseInt(charExpString.replace(",",""));
		var totalExpNeededForNextLevel = (50 * (charNextLevel * charNextLevel)) + (850 * charNextLevel) - 900;

		var expUntilNextLevel = totalExpNeededForNextLevel - charExp;

		var expBarWrapper = document.createElement("div");
		var expBarParent = expBar.parentNode;
		expBarWrapper.appendChild(expBar);
		expBarParent.appendChild(expBarWrapper);
		expBarWrapper.style.position = "relative";

		var expUntilSpan = document.createElement("span");
		expUntilSpan.appendChild(document.createTextNode(expUntilNextLevel));
		expUntilSpan.style.position = "absolute";
		expUntilSpan.style.float = "right";
		expUntilSpan.style.fontSize = "8px";
		expUntilSpan.style.color = "#464747";
		expUntilSpan.style.right = "0px"
		expBarWrapper.appendChild(expUntilSpan);

		var currentExpSpan = document.createElement("span");
		currentExpSpan.appendChild(document.createTextNode(charExpString));
		var toNextLevelExpSpan = document.createElement("span");

		var totalExpNeededForNextLevelString = totalExpNeededForNextLevel;		
		while (/(\d+)(\d{3})/.test(totalExpNeededForNextLevelString.toString())){
      		totalExpNeededForNextLevelString = totalExpNeededForNextLevelString.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
   		}
		toNextLevelExpSpan.appendChild(document.createTextNode(" / " + totalExpNeededForNextLevelString));
		toNextLevelExpSpan.style.float = "right";
		toNextLevelExpSpan.style.color = "#7e7a7a";
		
		toNextLevelExpSpan.style.position = "absolute";
		toNextLevelExpSpan.style.marginLeft = "4px";
		charExpCell.textAlign = "center";

		charExpCell.appendChild(currentExpSpan);
		charExpCell.appendChild(toNextLevelExpSpan);
		charExpCell.removeChild(charExpCell.firstChild);
	}
}

function isInBattle(){
	return (document.querySelectorAll(".pa") != undefined &&
		document.querySelector("img[src*='http://images.neopets.com/nq2/m/']") != undefined); //Enemy images are in image folder 'm'. Any present?
}

function isBattleBeginning(){
	return (document.querySelector('img[src="http://images.neopets.com/nq2/x/com_begin.gif"]') != undefined);
}

function isBattleOver(){ //Note: also fires true on inventory screen... Just looks for "return to map" button...
	return (document.querySelector('img[src="http://images.neopets.com/nq2/x/tomap.gif"]') != undefined);
}

function isEnemyTurn(){
	return ((whoseTurn() !== "Rohane") &&
			(whoseTurn() !== "Mipsy") &&
			(whoseTurn() !== "Talinia") &&
			(whoseTurn() !== "Velm"));
}

function isMidBattle(){
	var beginButton = document.querySelector('img[src="http://images.neopets.com/nq2/x/com_begin.gif"]');
	var endButton = document.querySelector('img[src="http://images.neopets.com/nq2/x/com_end.gif"]');
	return (isInBattle() && beginButton == undefined && endButton == undefined);
}

function removeMipsyAttack(){
	if(whoseTurn() === "Mipsy"){
		var attackBox = document.querySelector("a[onclick='setaction(3); document.ff.submit(); return false;;']");
		attackBox.setAttribute("onclick", mipsyAttackJS);
		attackBox.style.opacity = .2;
	}
}

function moveFleeButton(){
		var originalFleeButton = document.querySelector("a[onclick='setaction(4); document.ff.submit(); return false;;']");
		originalFleeButton.parentNode.removeChild(originalFleeButton);

		var fleeButton = originalFleeButton;
		var fleeButtonContainer =  fleeButton;
		fleeButtonContainer.style.display = "none";


		var placeToAppend = $("b:contains('Elapsed Time:')").parent();

		var toggleFleeButtonText = $("<a>").text("Flee");
		var fleeButtonTextContainer = $("<span>").append($("<br>"), toggleFleeButtonText);
		var placeToAttachText = placeToAppend;
		placeToAppend.append(fleeButtonTextContainer);


		placeToAppend.append($(fleeButtonContainer));
		
		toggleFleeButtonText.click(function(){
			switch(fleeButtonContainer.style.display){
				case "none":
					fleeButtonContainer.style.display = "block";
					break;
				case "block":
					fleeButtonContainer.style.display = "none";
					break;
			}
		});
}

function removeOptionsAndMainPageLinks(){ //And cutscene link.
	var navigationContainer = document.querySelector('img[src="http://images.neopets.com/nq2/x/nav.gif"]').parentNode;
	var navigationContainerChildren = navigationContainer.childNodes;

	var cutsceneLink = document.querySelector('a[href="nq2.phtml?act=cut"]');
	if(cutsceneLink != undefined){
		navigationContainer.removeChild(cutsceneLink);
	}

	var optionsLink = navigationContainerChildren.item(8);
	var verticalBar = navigationContainerChildren.item(9);
	var mainPageLink = navigationContainerChildren.item(10);
	navigationContainer.removeChild(optionsLink);
	navigationContainer.removeChild(verticalBar);
	navigationContainer.removeChild(mainPageLink);
}

function whoseTurn(){
	var redText = document.querySelectorAll("font[color='red']>b");
	var actingCharacter = redText[redText.length - 1].firstChild.nodeValue;
	return actingCharacter;
}

//Returns array with [highest level of injury (diff between curr and max HP), "Name of Party Member"]
function partyHealthDown(){ 
	var charHealthPointsArray = $('td[align="center"]:contains("Rohane"):contains("Mipsy"):contains("Talinia"):contains("Velm") td>font:contains("/")');
		charHealthPointsArray = $.map(charHealthPointsArray, function(n){
		var hp = n.firstChild.nodeValue;
		hp = hp.split('/');
		var damage = parseInt(hp[1]) - parseInt(hp[0]);
		return damage;});
	var largestDamageSuffered = Math.max.apply(Math, charHealthPointsArray);
	var charName;
	switch (charHealthPointsArray.indexOf(largestDamageSuffered))
	{
		case 0:
			charName = "Rohane";
			break;
		case 1:
			charName = "Mipsy";
			break;
		case 2:
			charName = "Talinia";
			break;
		case 3:
			charName = "Velm";
			break;
	}
	return [largestDamageSuffered, charName];
}

function isBossBattle(){
	var enemyArray = document.querySelectorAll(".pa");
	for (var i = 0; i < enemyArray.length; i++) {
		if(bossImgUrls.indexOf(enemyArray[i].src) !== -1) {
			return true;
		}
	}
	return false;
}

function replaceCaveOgre() {
	var caveOgre = document.querySelector("img[src='http://images.neopets.com/nq2/m/m1011_e49d8.gif']");
	if(caveOgre != undefined){
		var replacementURL = "http://images.neopets.com/pets/angry/lupe_tyrannian_baby.gif";
		caveOgre.src = replacementURL;
	}
}