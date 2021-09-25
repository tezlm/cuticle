# chromiutil

utility scripts for chromium. current features:

- <key>alt-p</key> to put videos in pip (picture in picture)
	- if multiple videos are found, you can pick which one to put in pip - press again to unpip
- hold alt to temporarily speed up videos 5x
- automatic tab group collapsing (read note below)

to make automatic tab group collapsing work, you need to hijack ctrl{-shift}-tab.
you can do so by running the code on `chrome://extensions`

```js
chrome.developerPrivate.updateExtensionCommand({
    extensionId: "<whatever id chrome chooses>", commandName: "nextTab",
    keybinding: "Ctrl+Tab"
});

chrome.developerPrivate.updateExtensionCommand({
    extensionId: "<the same id again>", commandName: "prevTab",
    keybinding: "Ctrl+Shift+Tab"
});
```

