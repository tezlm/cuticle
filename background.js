console.log("hi");

chrome.commands.onCommand.addListener((command) => {
	switch(command) {
		case "pip":
			run("pip.js");
			break;
	}
});

async function run(file) {
	const queryOptions = { active: true, currentWindow: true };
  	const [tab] = await chrome.tabs.query(queryOptions);
	if(!tab) return;
    chrome.scripting.executeScript({
		target: { tabId: tab.id},
		files: [file],
	});
}

