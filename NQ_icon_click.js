chrome.browserAction.onClicked.addListener(function(activeTab) {
		var currentURL = "";
		chrome.tabs.query({'active': true}, function(tabs){

			var isNQURL = /neopets.com\/games\/nq2\/nq2/;

			var newURL = "http://www.neopets.com/games/nq2/nq2.phtml";
			for (var i = 0; i < tabs.length; i++) {
				if (isNQURL.test(tabs[i].url)){
					newURL = "http://www.idnq-guide.com/index.php?page=maps";
				}
			}
			
			chrome.tabs.create({ url: newURL });
		});
}, false);