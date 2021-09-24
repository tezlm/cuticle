console.log("hi");

chrome.commands.onCommand.addListener(async (command) => {
	switch(command) {
		case "pip":
			run(await getTab(), "pip.js");
			break;
	}
});

chrome.tabs.onUpdated.addListener((tab, { status }) => {
	if(status !== "complete") return;
    run(tab, "altspeed.js");
});

async function getTab() {
	const queryOptions = { active: true, currentWindow: true };
  	const [tab] = await chrome.tabs.query(queryOptions);
	if(!tab) return;
	return tab.id;
}

async function run(tabId, file) {
	console.log(tabId);
    chrome.scripting.executeScript({
		target: { tabId },
		files: [file],
	});
}

