console.log("hi");

// ran on keyboard shortcut
// configure your own in manifest.json
// dont forget to hijack for {next,prev}Tab!
chrome.commands.onCommand.addListener(async (command) => {
	switch(command) {
		case "pip": {
			run(await getTab(), "pip.js");
			break;
		}
		case "nextTab":
		case "prevTab": {
			const tab = await getTab();
			const tabs = await chrome.tabs.query({ currentWindow: true });
			const index = tabs.findIndex(i => i.id === tab);
			const groups = await chrome.tabGroups.query({ windowId: tab.windowId });
			const next = (index + (command === "prevTab" ? -1 : 1) + tabs.length) % tabs.length;
			chrome.tabs.update(tabs[next].id, { active: true });
			for(let group of groups) {
				if(group.id === tabs[next].groupId) continue;
				chrome.tabGroups.update(group.id, { collapsed: true });
			}
			break;
		}
	}
});

// ran on every tab
chrome.tabs.onUpdated.addListener((tab, { status }) => {
	if(status !== "complete") return;
	run(tab, "altspeed.js");
});

// auto hide shelf
let downloads = 0;
chrome.downloads.onCreated.addListener(() => {
	downloads++;
	chrome.downloads.setShelfEnabled(true);
});

chrome.downloads.onChanged.addListener(async (item) => {
	if(!item.state) return;
	if(["complete", "interrupted"].includes(item.state.current)) downloads--;
	if(downloads === 0)
		chrome.downloads.setShelfEnabled(false);
});

// clean up downloads occasionally
// setInterval(async () => {
// 	const dl = chrome.downloads;
// 	const query = { startedAfter: Date.now() - 1000 * 60 * 10 };
// 	const items = await dl.search(query);
// 	for(let item of items) dl.removeFile(item.id);
// }, 1000 * 60 * 5);

// get the current tab id
async function getTab() {
	const queryOptions = { active: true, currentWindow: true };
	const [tab] = await chrome.tabs.query(queryOptions);
	if(!tab) return;
	return tab.id;
}

// run a script on a tab
async function run(tabId, file) {
	chrome.scripting.executeScript({
		target: { tabId },
		files: [file],
	});
}

