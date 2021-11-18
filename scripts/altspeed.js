let target = null;

window.addEventListener("keydown", e => {
	if(e.key !== "Alt") return;
	const active = document.activeFocus ?? document.activeElement;
	const vid = active?.querySelector("video");
	if(!vid) return;
	vid.playbackRate = 2.5; // change to whatever you like
	target = vid;
});

window.addEventListener("keyup", e => {
	if(e.key !== "Alt") return;
	if(!target) return;
	target.playbackRate = 1;
	target = null;
});

