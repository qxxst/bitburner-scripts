// achievement/big-trouble.js by qxxst
/** @param {NS} ns */
/* Used for the "Big trouble" achievement */
/* Run after installing augmentations */
export async function main(ns: any) {
	const target: string = 'n00dles';
	const minSecurityLevel: number = await ns.getServerMinSecurityLevel(target);
	while (true) {
		await ns.hack(target);
		// Checks if the security level is greater than the minimum before running weaken
		var securityLevel: number = await ns.getServerSecurityLevel(target);
		if (securityLevel > minSecurityLevel) {
			await ns.weaken(target);
		}
	}
}