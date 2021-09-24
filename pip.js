(() => {
	// exit pip if already in it
	if(document.pictureInPictureElement) {
		document.exitPictureInPicture();
		return;
	}

	const px = x => `${Math.floor(x)}px`;
	const vids = document.querySelectorAll("video");

	// enter pip automatically if there's only one video
	if(vids.length === 1) {
		try { vids[0].requestPictureInPicture(); } catch {}
		return;
	}

	// video chooser
	const boxes = [];
	for(let vid of vids) {
		const rect = vid.getBoundingClientRect();
		const box = document.createElement("div");
		Object.assign(box.style, {
			position: "absolute",
			background: "#88eabece",
			zIndex: 9999,
			width: px(rect.width),
			height: px(rect.height),
			top: px(rect.top + document.body.scrollTop),
			left: px(rect.left + document.body.scrollLeft),
		});
		
		box.addEventListener("click", () => {
			vid.requestPictureInPicture();
			clear();
		});
		
		boxes.push(box);
		document.body.append(box);
	}

	setTimeout(clear, 1000);

	function clear() {
		while(boxes.length) boxes.pop().remove();
	}
})();

