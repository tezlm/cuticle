const redirects = new Map();
const instance = "yewtu.be";
// redirects.set("m.youtube.com", instance);
// redirects.set("www.youtube.com", instance);
// redirects.set("youtube.com", instance);
redirects.set("crates.io", "lib.rs");

const host = location.hostname;
if(redirects.has(host))
	location.hostname = redirects.get(host);

