// achievement/big-trouble.js by qxxst
/** @param {NS} ns */
/* Used for the "Big trouble" achievement */
/* Run after installing augmentations */
export async function main(ns) {
	const target = 'n00dles'
	const minSecurityLevel = await ns.getServerMinSecurityLevel(target)
	while (true) {
		await ns.hack(target);
		// Checks if the security level is greater than the minimum before running weaken
		var securityLevel = await ns.getServerSecurityLevel(target);
		if (securityLevel > minSecurityLevel) {
			await ns.weaken(target);
		}
	}
}